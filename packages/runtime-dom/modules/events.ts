interface Invoker extends EventListener {
  value: EventValue
}

type EventValue = Function

export function addEventListener(
  el: Element,
  event: string,
  handler: EventListener,
) {
  el.addEventListener(event, handler)
}

export function removeEventListener(
  el: Element,
  event: string,
  handler: EventListener,
) {
  el.removeEventListener(event, handler)
}

export function patchEvent(
  /** イベントが着脱される対象のElement */
  el: Element & { _vei?: Record<string, Invoker | undefined> },
  /** イベント名 e.g. onClick */
  eventRawName: string,
  value: EventValue | null,
) {
  // vei = vue event invokers
  const invokers = el._vei || (el._vei = {})
  const existingInvoker = invokers[eventRawName]

  // 既にイベントが登録されている場合
  if (value && existingInvoker) {
    // patch
    existingInvoker.value = value
  } else {
    const eventName = parseName(eventRawName)
    if (value) {
      // add
      const invoker = (invokers[eventRawName] = createInvoker(value))
      addEventListener(el, eventName, invoker)
    } else if (existingInvoker) {
      // remove
      removeEventListener(el, eventName, existingInvoker)
      invokers[eventRawName] = undefined
    }
  }
}

/**
 * 最初の2文字を削除して小文字に変換
 * e.g. onClick -> click
 */
function parseName(eventRawName: string): string {
  return eventRawName.slice(2).toLocaleLowerCase()
}

function createInvoker(initialValue: EventValue) {
  const invoker: Invoker = (e: Event) => {
    invoker.value(e)
  }
  invoker.value = initialValue
  return invoker
}
