// ledger.js
import fs from 'fs'

export default class Ledgr {
  constructor (filename = 'webledger.json') {
    this.filename = filename
    this.data = this.loadData()
  }

  loadData () {
    try {
      const data = fs.readFileSync(this.filename, 'utf-8')
      const parsed = JSON.parse(data)
      // Ensure the data has the correct structure
      if (!parsed.entries || !Array.isArray(parsed.entries)) {
        return { entries: [] }
      }
      return parsed
    } catch (error) {
      // If the file doesn't exist or is empty, return the default structure
      return { entries: [] }
    }
  }

  saveData () {
    const data = JSON.stringify(this.data, null, 2)
    fs.writeFileSync(this.filename, data, 'utf-8')
  }

  clean () {
    this.data = { entries: [] }
    this.saveData()
  }

  // Helper method to find an entry by DID
  findEntry (did) {
    return this.data.entries.find(entry => entry.url === did)
  }

  // Helper method to get balance for a DID
  getBalance (did) {
    const entry = this.findEntry(did)
    return entry ? parseInt(entry.amount) : 0
  }

  // Helper method to validate DID format
  validateDID (did) {
    return typeof did === 'string' && did.startsWith('did:nostr:')
  }

  deposit (did, amount) {
    if (!this.validateDID(did)) {
      console.error('Invalid DID format. Expected: did:nostr:<pubkey>')
      return
    }

    const existingEntry = this.findEntry(did)
    if (existingEntry) {
      existingEntry.amount = String(parseInt(existingEntry.amount) + amount)
    } else {
      this.data.entries.push({
        type: "Entry",
        url: did,
        amount: String(amount)
      })
    }
    this.saveData()
  }

  withdraw (did, amount) {
    if (!this.validateDID(did)) {
      console.error('Invalid DID format. Expected: did:nostr:<pubkey>')
      return
    }

    const entry = this.findEntry(did)
    const currentBalance = entry ? parseInt(entry.amount) : 0

    if (currentBalance >= amount) {
      if (entry) {
        entry.amount = String(currentBalance - amount)
        this.saveData()
      }
    } else {
      console.error('Insufficient balance or invalid DID.')
    }
  }

  transfer (from_did, to_did, amount) {
    if (!this.validateDID(from_did) || !this.validateDID(to_did)) {
      console.error('Invalid DID format. Expected: did:nostr:<pubkey>')
      return
    }

    const fromBalance = this.getBalance(from_did)
    if (fromBalance >= amount) {
      this.withdraw(from_did, amount)
      this.deposit(to_did, amount)
    } else {
      console.error('Insufficient balance or invalid DID.')
    }
  }

  // Getter for backward compatibility and easy access to balances
  get balances () {
    const result = {}
    this.data.entries.forEach(entry => {
      result[entry.url] = parseInt(entry.amount)
    })
    return result
  }
}

