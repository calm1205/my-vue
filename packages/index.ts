export type Options = {
  render: () => string
}

export type App = {
  mount: (selector: string) => void
}

export const createApp = (options: Options): App => ({
  mount: (selector) => {
    const dom = document.querySelector(selector)
    if (!dom) return

    dom.innerHTML = options.render()
  },
})
