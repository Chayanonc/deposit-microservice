export class DepositBalance {
  constructor(public readonly uuid: string, public readonly amount: number) {}
  toString() {
    return JSON.stringify({
      uuid: this.uuid,
      amount: this.amount,
    });
  }
}
