import * as React from 'react'
import ReactDOM from 'react-dom'

import { dql } from '@datql/datql'

console.log('Hello from react playground!')

const DOG_SCHEMA = dql`
  type Dog {
    name: String
    breed: String
  }
  type Query {
    dogs: [Dog]
  }
`
console.log({ DOG_SCHEMA })

const ADD_DOG = dql`
  mutation AddDog($name: String, $breed: String) {
    addDog(name: $name, breed: $breed) {
      id
    }
  }
`
console.log({ ADD_DOG })

const GET_DOGS = dql`
  query {
    dogs(breed: "good dog") {
      breed
    }
  }
`
console.log({ GET_DOGS })

ReactDOM.render(
  <p>Hello</p>,
  document.getElementById('root')
)
