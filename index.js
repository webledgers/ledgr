export default class Ledgr {
  constructor() {
    this.balances = {};
  }

  deposit(public_key, amount) {
    if (this.balances[public_key]) {
      this.balances[public_key] += amount;
    } else {
      this.balances[public_key] = amount;
    }
  }

  withdraw(public_key, amount) {
    if (this.balances[public_key] && this.balances[public_key] >= amount) {
      this.balances[public_key] -= amount;
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
