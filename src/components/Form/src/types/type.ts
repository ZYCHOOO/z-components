import { RuleItem } from './ruleType'
import { CSSProperties  } from 'vue'
// 可配置的表单

// 表单每一项的配置选项
export interface FormOptions {
  // 表单项显示的元素
  type: 'cascader' | 'checkbox' | 'checkbox-group' | 'checkbox-button' |
  'color-picker' | 'date-picker' | 'input' | 'input-number' | 'radio' | 
  'radio-group' | 'radio-button' | 'rate' | 'select' | 'option' | 'slider' | 
  'switch' | 'time-picker' | 'time-select' | 'transfer' | 'upload',
  // 表单项的值
  value?: any,
  // 表单 label
  label?: string,
  // 表单标识
  prop?: string,
  // 表单验证规则
  rules?: RuleItem[],
  // 表单占位符
  placeholder?: string,
  // 表单元素特有的属性
  attrs?: {
    // css 样式
    style?: CSSProperties,
    clearable?: boolean,
    showPassword?: boolean,
    disabled?: boolean,
  },
  // 表单项的子元素
  children?: FormOptions[],
  // 处理上传组件的属性和方法
  uploadAttrs?: {
    action: string,
    headers?: object,
    method?: 'post' | 'put' | 'patch',
    multiple?: boolean,
    data?: any,
    name?: string,
    widthCredentials?: boolean,
    showFileList?: boolean,
    drag?: boolean,
    accept?: string,
    thumbnailMode?: boolean,
    fileList?: any[],
    listType?: 'text' | 'picture' | 'picture-card',
    autoUpload?: boolean,
    disabled?: boolean,
    limit?: number
  }
}