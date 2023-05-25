export class DepositBalance {
  constructor(public readonly uuid: string, public readonly amount: string) {}
  toString() {
    return JSON.stringify({
      uuid: this.uuid,
      amount: this.amount,
    });
  }
}
