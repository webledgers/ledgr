<div align="center">
  <h1>ledgr</h1>
</div>

<div align="center">  
Simple Nostr Ledgers using Decentralized Identifiers (DIDs)
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

Ledgr is a simple account management system that keeps track of balances for individual nostr public keys using Decentralized Identifiers (DIDs) in the format `did:nostr:<pubkey>`.

## Specification

### Data Model

Ledgr uses a structured JSON format that contains an array of entries, where each entry represents a balance for a specific DID:

```json
{
  "entries": [
    {
      "type": "Entry",
      "url": "did:nostr:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456",
      "amount": "100000"
    },
    {
      "type": "Entry",
      "url": "did:nostr:b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678",
      "amount": "120000"
    }
  ]
}
```

**Note:** By default, the ledgr is stored in a file called _webledger.json_.

#### Entry Structure

Each entry in the ledger contains:

- **type**: Always set to "Entry" to identify the record type
- **url**: The DID identifier in the format `did:nostr:<pubkey>` (where pubkey is 64-character lowercase hex)
- **amount**: The balance amount as a string (in satoshis)

### Functions

Ledger offers the following functions for working with balances of DIDs:

- **deposit**: Deposits satoshis to a DID.
- **withdraw**: Withdraws satoshis from a DID.
- **transfer**: Transfers satoshis from one DID to another.

## Guide

### Deposit

To deposit satoshis to a DID, use the deposit function.

```JavaScript
deposit(did, amount)
```

- did: The DID identifier to which the satoshis should be deposited (format: `did:nostr:<pubkey>`).
- amount: The number of satoshis you want to deposit.

### Withdraw

To withdraw satoshis from a DID, use the withdraw function.

```Javascript
withdraw(did, amount)
```

- did: The DID identifier from which the satoshis should be withdrawn (format: `did:nostr:<pubkey>`).
- amount: The number of satoshis you want to withdraw.

### Transfer

To transfer satoshis from one DID to another, use the transfer function.

```JavaScript
transfer(from_did, to_did, amount)
```

- from_did: The DID identifier from which the satoshis should be transferred (format: `did:nostr:<pubkey>`).
- to_did: The DID identifier to which the satoshis should be transferred (format: `did:nostr:<pubkey>`).
- amount: The number of satoshis you want to transfer.

## Usage Example

JavaScript

```JavaScript
import Ledgr from 'ledgr';

// Create a new Ledgr instance (uses default webledger.json)
const ledgr = new Ledgr();

// Or specify a custom file path
const customLedgr = new Ledgr('/path/to/my-ledger.json');

// Deposit 100 satoshis to a DID
ledgr.deposit('did:nostr:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456', 100);

// Withdraw 50 satoshis from a DID
ledgr.withdraw('did:nostr:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456', 50);

// Transfer 25 satoshis from one DID to another
ledgr.transfer('did:nostr:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456', 'did:nostr:b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678', 25);

// Get balance for a specific DID
const balance = ledgr.getBalance('did:nostr:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456');
console.log(`Balance: ${balance}`);

// Print all balances (backward compatibility)
console.log(ledgr.balances);
```

## CLI Usage

The CLI tool provides convenient commands for managing the ledger:

```bash
# Basic usage (uses default webledger.json)
ledgr deposit did:nostr:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456 100
ledgr withdraw did:nostr:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456 50
ledgr transfer did:nostr:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456 did:nostr:b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef12345678 25
ledgr balance did:nostr:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456
ledgr list
ledgr clean

# Using a custom file path
ledgr -f /path/to/my-ledger.json deposit did:nostr:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456 100
ledgr --file ./ledgers/company.json list
ledgr -f ~/documents/personal-ledger.json balance did:nostr:a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456

# All commands support the file option
ledgr -f custom.json clean
```

This way, you can use Ledgr to manage the balances of individual DIDs and perform various operations such as deposits, withdrawals, and transfers of satoshis using the decentralized identifier format.
