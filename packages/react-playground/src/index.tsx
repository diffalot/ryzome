import * as React from 'react'
import ReactDOM from 'react-dom'

import { datql } from '@datql/datql'

console.log('Hello from react playground!')

datql()

ReactDOM.render(
  <p>Hello</p>,
  document.getElementById('root')
)
