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

rendererを生成するファクトリ関数

<br/><br/>

## runtime-dom

vue.jsのランタイム機能の内DOMに依存したもの。<br/>
querySelectorやcreateElementなどのDOM APIを利用している。

### index.ts

renderにnodeOpesを注入してrendererを生成

### nodeOps.ts

documentを操作するDOMのAPI。<br/>
rendererのRendererOptionsに依存
