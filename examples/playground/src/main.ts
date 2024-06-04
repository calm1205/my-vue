import { createApp, h } from "my-vue"

const app = createApp({
  render() {
    return h("div", {}, ["Hello, World!"])
  },
})

app.mount("#app")
