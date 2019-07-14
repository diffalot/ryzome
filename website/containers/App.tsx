import React, { useState, useEffect, ReactElement } from 'react'

import { root } from '@ryzome/root'

import { Toolbar } from './Toolbar'

export const App = (): ReactElement => {
  const [message, setMessage] = useState('welcome')

  useEffect((): void => {
    root().then((rootMessage): void => {
      setMessage(rootMessage)
    })
  })

  return (
    <div>
      <Toolbar />
      <p>{message}</p>
    </div>
  )
}
