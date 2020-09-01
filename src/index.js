import Ryzome from './Ryzome'
;(async () => {
  const client = new Ryzome('testing')
  await client.ready
  console.log({ client })
})()
