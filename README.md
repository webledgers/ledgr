<div align="center">
  <h1>ledgr</h1>
</div>

<div align="center">  
Simple Nostr Ledgers
</div>

---

<div align="center">
<h4>Getting Started</h4>
</div>
  
---
  

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![npm](https://img.shields.io/npm/v/ledgr)](https://npmjs.com/package/ledgr)
[![npm](https://img.shields.io/npm/dw/ledgr.svg)](https://npmjs.com/package/ledgr)
[![Github Stars](https://img.shields.io/github/stars/webledgers/ledgr.svg)](https://github.com/webledgers/ledgr/)




## Ledgr

Ledgr is a simple account management system that keeps track of balances for individual nostr public keys.

## Specification

### Data

Ledgr is stored in a single JSON file that contains public keys and their balances:

```json
{
   "npub1": 1,
   "npub2": 2,
   "npub3": 3
}
```

### Functions

Ledger offers the following functions for working with balances of public keys:

- deposit: Deposits satoshis to a public key.
- withdraw: Withdraws satoshis from a public key.
- transfer: Transfers satoshis from one public key to another.

## Guide

### Deposit

To deposit satoshis to a public key, use the deposit function.

```JavaScript
deposit(npub, amount)
```

- npub: The public key to which the satoshis should be deposited.
- amount: The number of satoshis you want to deposit.

### Withdraw

To withdraw satoshis from a public key, use the withdraw function.

```Javascript
withdraw(npub, amount)
```

- npub: The public key from which the satoshis should be withdrawn.
- amount: The number of satoshis you want to withdraw.

### Transfer

To transfer satoshis from one public key to another, use the transfer function.

```JavaScript
transfer(from_npub, to_npub, amount)
```

- from_npub: The public key from which the satoshis should be transferred.
- to_npub: The public key to which the satoshis should be transferred.
- amount: The number of satoshis you want to transfer.

## Usage Example

JavaScript

```JavaScript
import { Ledger } from './ledger.js';

// Create a new Ledger instance
const ledger = new Ledger();

// Deposit 100 satoshis to the public key 'npub1'
ledger.deposit('npub1', 100);

// Withdraw 50 satoshis from the public key 'npub1'
ledger.withdraw('npub1', 50);

// Transfer 25 satoshis from the public key 'npub1' to the public key 'npub2'
ledger.transfer('npub1', 'npub2', 25);

// Print the current balances
console.log(ledger.balances);
```

This way, you can use Ledgr to manage the balances of individual public keys and perform various operations such as deposits, withdrawals, and transfers of satoshis.



















