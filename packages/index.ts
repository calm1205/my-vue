export type Options = {
  render: () => string
}

export type App = {
  mount: (selector: string) => void
}

export const createApp = (options: Options): App => ({
  mount: (selector) => {
    const root = document.querySelector(selector)
    if (!root) return

    root.innerHTML = options.render()
  },
})
