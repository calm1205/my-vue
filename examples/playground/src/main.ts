import { createApp, h } from "my-vue"

const app = createApp({
  render() {
    return h("div", {}, [
      h("p", {}, ["Hello world."]),
      h("button", {}, ["click me!"]),
    ])
  },
})

app.mount("#app")
