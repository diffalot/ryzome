import tap from 'tap'

import Ryzome from './Ryzome'

const PASSPHRASE = 'a passphrase'
const SALT = 'some salt'

tap.test('has a ready property that resolves', async (t) => {
  const ryzome = new Ryzome(PASSPHRASE)
  t.equal(await ryzome.ready, true)
  ryzome.close()
})
