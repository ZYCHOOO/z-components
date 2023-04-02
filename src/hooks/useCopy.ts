import { ElMessage } from "element-plus"

// 选中复制功能
export const useCopy = (value: string) => {
  const input = document.createElement('input')
  input.value = value
  document.body.appendChild(input)
  input.select()
  document.execCommand('Copy')
  ElMessage.success('复制成功！')
  document.body.removeChild(input)
}