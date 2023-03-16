// ledger.js
import fs from 'fs';

export default class Ledgr {
  constructor() {
    this.filename = 'ledgr.json';
    this.balances = this.loadBalances();
  }

  loadBalances() {
    try {
      const data = fs.readFileSync(this.filename, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // If the file doesn't exist or is empty, return an empty object.
      return {};
    }
  }

  saveBalances() {
    const data = JSON.stringify(this.balances, null, 2);
    fs.writeFileSync(this.filename, data, 'utf-8');
  }

  deposit(public_key, amount) {
    if (this.balances[public_key]) {
      this.balances[public_key] += amount;
    } else {
      this.balances[public_key] = amount;
    }
    this.saveBalances();
  }

  withdraw(public_key, amount) {
    if (this.balances[public_key] && this.balances[public_key] >= amount) {
      this.balances[public_key] -= amount;
      this.saveBalances();
    } else {
      console.error("Insufficient balance or invalid public key.");
    }
  }

  transfer(from_public_key, to_public_key, amount) {
    if (this.balances[from_public_key] && this.balances[from_public_key] >= amount) {
      this.withdraw(from_public_key, amount);
      this.deposit(to_public_key, amount);
    } else {
      console.error("Insufficient balance or invalid public key.");
    }
  }
}
