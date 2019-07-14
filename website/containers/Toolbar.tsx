import React, { ReactElement } from 'react'

import { Link } from '../components/Link'

export const Toolbar = (): ReactElement => {
  return (
    <ul>
      <li>
        <Link href={'/api'} text={'api docs'} />
      </li>
    </ul>
  )
}
