import { parser } from '@datql/protobuf-parser'

export const datql = (): void => {
  console.log('datql loaded')
  parser()
}

export default datql
