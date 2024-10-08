import { VNode } from "./vnode"

/**
 * DOMに依存する操作のインターフェース
 */
export interface RendererOptions<
  HostNode = RendererNode,
  HostElement = RendererElement,
> {
  createElement(type: string): HostNode

  createText(text: string): HostNode

  setElementText(node: HostNode, text: string): void

  insert(child: HostNode, parent: HostNode, anchor?: HostNode | null): void

  patchProp(el: HostElement, key: string, value: any): void

  patchAttr(el: HostElement, key: string, value: any): void
}

export interface RendererNode {
  [key: string]: any
}

export interface RendererElement extends RendererNode {}

export type RootRenderFunction<HostElement = RendererElement> = (
  message: string,
  container: HostElement,
) => void

/**
 * renderを生成するファクトリ関数
 */
export function createRenderer(options: RendererOptions) {
  const {
    createElement: hostCreateElement,
    createText: hostCreateText,
    insert: hostInsert,
    patchProp: hostPatchProp,
    patchAttr: hostPatchAttr,
  } = options

  function renderVNode(vnode: VNode | string) {
    if (typeof vnode === "string") return hostCreateText(vnode)
    const el = hostCreateElement(vnode.type)

    // propsのeventを登録
    Object.entries(vnode.props).forEach(([key, value]) => {
      hostPatchProp(el, key, value)
      hostPatchAttr(el, key, value)
    })

    for (const child of vnode.children) {
      const childEl = renderVNode(child)
      hostInsert(childEl, el)
    }

    return el
  }

  const render: RootRenderFunction = (vnode, container) => {
    const el = renderVNode(vnode)
    hostInsert(el, container)
  }

  return { render }
}
