import tap from 'tap'

const { test } = tap

import Terminal from './Terminal'

const PASSPHRASE = 'a passphrase'
const SALT = 'e2d65e0282ce2ebf064e0d649d1a690d'

let terminal

test('requires a passphrase', async (t) => {
  try {
    new Terminal()
  } catch (error) {
    t.equal(error.message, 'passphrase required', 'received the error we want')
  }
})

terminal = new Terminal(PASSPHRASE)

test('successfully opens', async (t) => {
  t.equal(await terminal.ready, true, 'ready resolves with true')
})

test('has a salt string', (t) => {
  t.plan(1)
  t.equal(typeof terminal.salt, 'string', 'salt is a string')
})

test('successfully closes', (t) => {
  t.plan(2)

  t.equal(typeof terminal.close, 'function', 'close is a function')
  terminal.close(() => {
    t.pass('terminal closed')
  })
})

test('can be opened with passphrase and salt', async (t) => {
  t.plan(3)

  const anotherTerminal = new Terminal(PASSPHRASE, SALT)
  await anotherTerminal.ready

  t.equal(anotherTerminal.salt, SALT, 'salt is equal')

  debugger
  const publicKeyString = anotherTerminal.core.inner.opts.publicKey.toString(
    'hex'
  )

  t.equal(
    publicKeyString,
    '9b5493b24709cd3c4fb5129bd64b2f014f698f8105290000549b6515f16d872d',
    'public key is the same'
  )

  const secretKeyString = anotherTerminal.core.inner.opts.secretKey.toString(
    'hex'
  )

  t.equal(
    secretKeyString,
    '5a3f899c603f4135f531e629f91af4afdf59d36bcd7f6084a1d0c3f18d7ef054',
    'secret key is the same'
  )

  anotherTerminal.close()
})
