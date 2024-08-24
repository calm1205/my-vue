```
- runtime-core
  - renderer.ts
- runtime-dom
  - index.ts
  - nodeOps.ts
```

<br/><br/>

## runtime-core

vue.jsのランタイム機能の最も低級な部分。<br/>
virtual DOMの実装、コンポーネントに関する実装。

### renderer.ts

rendererを生成するファクトリ関数。<br/>
RendererOptions（DOM操作）を引数として受け取る。<br/>
RendererOptionsを外部から受け取ることでrenderer内で直接DOM操作に依存することを避けている。

```ts
// renderer.ts
interface RendererOptions
renderer(options: RendererOptions): Renderer

// nodeOps.ts
nodeOptions: RendererOptions
```

DIPを用いたDI。

rendererにRendererOptions引数として渡している。（依存性の注入,DI）<br/>
つまりrendererはRendererOptionsに依存している。<br/>
が依存しているのはRendererOptionsというインターフェースのみ。<br/>
rendererはRendererOptionsがどのように実装されているか知る必要はない。

注入されるnodeOptions視点では、rendererに依存されている。<br/>
しかし、依存されている側のnodeOptionsはRendererOptionsというインターフェースに依存している。(依存性逆転の法則,DIP)

<br/><br/>

## runtime-dom

vue.jsのランタイム機能の内DOMに依存したもの。<br/>
querySelectorやcreateElementなどのDOM APIを利用している。

### index.ts

renderにnodeOpesを注入してrendererを生成

### nodeOps.ts

documentを操作するDOMのAPI。<br/>
rendererのRendererOptionsに依存。
