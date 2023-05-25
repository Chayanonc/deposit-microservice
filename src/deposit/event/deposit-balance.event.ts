export class DepositBalance {
  constructor(public readonly userId: string, public readonly amount: string) {}
  toString() {
    return JSON.stringify({
      userId: this.userId,
      amount: this.amount,
    });
  }
}
