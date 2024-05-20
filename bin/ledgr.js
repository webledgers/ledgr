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
  .command('deposit <public_key> <amount>')
  .description('Deposit an amount into a public key')
  .action((public_key, amount) => {
    ledger.deposit(public_key, parseFloat(amount))
    console.log(`Deposited ${amount} into ${public_key}.`)
  })

program
  .command('withdraw <public_key> <amount>')
  .description('Withdraw an amount from a public key')
  .action((public_key, amount) => {
    ledger.withdraw(public_key, parseFloat(amount))
    console.log(`Withdrew ${amount} from ${public_key}.`)
  })

program
  .command('transfer <from_public_key> <to_public_key> <amount>')
  .description('Transfer an amount from one public key to another')
  .action((from_public_key, to_public_key, amount) => {
    ledger.transfer(from_public_key, to_public_key, parseFloat(amount))
    console.log(`Transferred ${amount} from ${from_public_key} to ${to_public_key}.`)
  })

program.parse(process.argv)
