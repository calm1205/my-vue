export interface VNode {
  /**
   * HTMLのtag名
   */
  type: string
  /**
   * HTML要素の属性 e.g. {class: 'container'}
   */
  props: VNodeProps
  /**
   * 子要素
   */
  children: (VNode | string)[]
}

export interface VNodeProps {
  [key: string]: any
}
