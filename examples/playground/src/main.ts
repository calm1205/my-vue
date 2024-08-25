import { createApp, h } from "my-vue"

const app = createApp({
  render() {
    return h(
      "div",
      {
        id: "my-app",
      },
      [
        h(
          "p",
          {
            style: "color: red; font-weight: bold;",
          },
          ["Hello world."],
        ),
        h(
          "button",
          {
            onClick() {
              alert("hello world!")
            },
          },
          ["click me!"],
        ),
      ],
    )
  },
})

app.mount("#app")
