// 列表子项
export interface ListItem {
  id?: string | number,
  // 头像
  avatar?: string,
  // 标题
  title?: string,
  // 内容
  desc?: string,
  // 时间
  time?: string,
  // 标签
  tag?: string,
  // 标签类型
  tagType?: '' | 'success' | 'info' | 'warning' | 'danger'
}

// 列表
export interface ListOptions {
  id: string | number,
  title: string,
  content: ListItem[]
  
}

// 操作选项
export interface ActionOptions {
  id: string | number,
  text: string,
  icon?: string
}
