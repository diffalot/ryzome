import React, { ReactElement } from 'react'

interface props {
  href: string
  text: string
}

export const Link = ({ href, text }: props): ReactElement => <a href={href}>{text}</a>
