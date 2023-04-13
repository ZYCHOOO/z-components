import { FormOption } from './types/type'

interface Props {
  options: FormOption[],
  httpReqest?: Function
}

export const upload = (props: Props, emits: any, model: any) => {
  // 上传组件的所有方法
  const onPreview = (file: File) => {
    emits('onPreview', file)
  }
  const onRemove = (file: File, fileList: FileList) => {
    emits('onRemove', { file, fileList })
  }
  const onSuccess = (response: any, file: File, fileList: FileList) => {
    const uploadItem = props.options.find(item => item.type === 'upload')!
    model.value[uploadItem.prop!] = { response, file, fileList }
    emits('onSuccess', { response, file, fileList })
  }
  const onError = (err: any, file: File, fileList: FileList) => {
    emits('onError', { err, file, fileList })
  }
  const onProgress = (event: any, file: File, fileList: FileList) => {
    emits('onProgress', { event, file, fileList })
  }
  const onChange = (file: File, fileList: FileList) => {
    emits('onChange', { file, fileList })
  }
  const beforeUpload = (file: File) => {
    emits('beforeUpload', file)
  }
  const beforeRemove = (file: File, fileList: FileList) => {
    emits('beforeRemove', { file, fileList })
  }
  const onExceed = (files: File, fileList: FileList) => {
    emits('onExceed', { files, fileList })
  }
  return {
    onPreview,
    onRemove,
    onSuccess,
    onError,
    onProgress,
    onChange,
    beforeUpload,
    beforeRemove,
    onExceed
  }
}