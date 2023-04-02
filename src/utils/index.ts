// 把驼峰转换成横杠连接
export const camelCase2Line = (value: string) => {
  return value.replace(/([A-Z])/g,"-$1").toLowerCase()
}
