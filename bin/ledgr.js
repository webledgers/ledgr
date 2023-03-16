#!/usr/bin/env node

// main.js
import Ledgr from '../index.js';

// Create a new Ledgr instance
const ledgr = new Ledgr();

// Deposit 100 satoshis to the public key 'pubkey1'
ledgr.deposit('pubkey1', 100);

// Withdraw 50 satoshis from the public key 'pubkey1'
ledgr.withdraw('pubkey1', 50);

// Transfer 25 satoshis from the public key 'pubkey1' to the public key 'pubkey2'
ledgr.transfer('pubkey1', 'pubkey2', 25);

// Print the current balances
console.log(ledgr.balances);
