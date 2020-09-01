import { promisify } from 'util'

import SDK from 'dat-sdk'
import Corestore from 'corestore'
import Hypercore from 'hypercore'
import RAM from 'random-access-memory'
import RAA from 'random-access-application'
import protobuf from 'protobufjs'
import schema from 'protocol-buffers-schema'
import sodium from 'sodium-universal'
const _sodium = require('libsodium-wrappers')

//const Buffer = require('buffer/').Buffer

const protobufLoadPromise = promisify(protobuf.load)

const defaultOptions = {
  dat: {
    applicationName: 'ryzome',
    coreOpts: {
      valueEncoding: 'binary'
    }
  }
}

function storage(data) {
  return RAA()
}

async function generateTerminalCore(passphrase, datOptions) {
  await _sodium.ready
  const NaCl = _sodium

  const salt = NaCl.randombytes_buf(NaCl.crypto_pwhash_SALTBYTES)

  return openTerminalCore(passphrase, NaCl.to_hex(salt), datOptions)
}

async function openTerminalCore(passphrase, saltString, datOptions) {
  await _sodium.ready
  const NaCl = _sodium

  // const { Hypercore, close } = await SDK(datOptions)

  const salt = NaCl.from_hex(saltString)

  const keySeed = NaCl.crypto_pwhash(
    NaCl.crypto_box_SEEDBYTES,
    passphrase,
    salt,
    NaCl.crypto_pwhash_OPSLIMIT_INTERACTIVE,
    NaCl.crypto_pwhash_MEMLIMIT_INTERACTIVE,
    NaCl.crypto_pwhash_ALG_DEFAULT
  )

  let { publicKey, privateKey: secretKey } = NaCl.crypto_box_seed_keypair(
    keySeed
  )
  publicKey = Buffer.from(publicKey)
  secretKey = Buffer.from(secretKey)

  const core = new Corestore(RAM, { publicKey, secretKey })
  await core.ready()
  debugger
  const coreAndId = {
    core,
    //core: new Hypercore(saltString),
    //core: new Hypercore('a core', { secretKey }),
    salt: saltString,
    close: core.close
  }
  debugger

  /*
  await coreAndId.core.append(
    JSON.stringify({
      name: 'Alice'
    })
  )
  */

  debugger
  return coreAndId
}

export default class Terminal {
  constructor(passphrase, salt) {
    if (!passphrase) throw new Error('passphrase required')

    this.options = { ...defaultOptions, salt }

    this.schema = schema.parse(`
      message Terminal {
        required string salt = 1;
      }
    `)

    this.ready = this.init(passphrase, salt)

    return this
  }
  async init(passphrase, salt) {
    this.root = await protobufLoadPromise(this.schema)

    let coreAndId
    if (!salt) {
      coreAndId = await generateTerminalCore(passphrase, this.options.dat)
    } else {
      coreAndId = await openTerminalCore(passphrase, salt, this.options.dat)
    }

    this.core = coreAndId.core
    this.close = coreAndId.close
    this.salt = coreAndId.salt

    return true
  }
}
