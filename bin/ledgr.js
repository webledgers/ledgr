#!/usr/bin/env node
import { Command } from 'commander'
import Ledgr from '../index.js'

const program = new Command()
const ledger = new Ledgr()

program
  .name('ledgr')
  .description('CLI tool for Ledgr operations')
  .version('1.0.0')

program
  .command('clean')
  .description('Clean the ledger')
  .action(() => {
    ledger.clean()
    console.log('Ledger cleaned.')
  })

program
  .command('deposit <did> <amount>')
  .description('Deposit an amount into a DID (format: did:nostr:<pubkey>)')
  .action((did, amount) => {
    ledger.deposit(did, parseFloat(amount))
    console.log(`Deposited ${amount} into ${did}.`)
  })

program
  .command('withdraw <did> <amount>')
  .description('Withdraw an amount from a DID (format: did:nostr:<pubkey>)')
  .action((did, amount) => {
    ledger.withdraw(did, parseFloat(amount))
    console.log(`Withdrew ${amount} from ${did}.`)
  })

program
  .command('transfer <from_did> <to_did> <amount>')
  .description('Transfer an amount from one DID to another (format: did:nostr:<pubkey>)')
  .action((from_did, to_did, amount) => {
    ledger.transfer(from_did, to_did, parseFloat(amount))
    console.log(`Transferred ${amount} from ${from_did} to ${to_did}.`)
  })

program
  .command('balance <did>')
  .description('Get the balance for a DID (format: did:nostr:<pubkey>)')
  .action((did) => {
    const balance = ledger.getBalance(did)
    console.log(`Balance for ${did}: ${balance}`)
  })

program
  .command('list')
  .description('List all entries in the ledger')
  .action(() => {
    if (ledger.data.entries.length === 0) {
      console.log('No entries in the ledger.')
    } else {
      console.log('Ledger entries:')
      ledger.data.entries.forEach(entry => {
        console.log(`  ${entry.url}: ${entry.amount}`)
      })
    }
  })

program.parse(process.argv)
