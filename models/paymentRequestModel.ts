export default class PaymentRequestModel {
  constructor(
    public amount: string,
    public documentID: string,
    public transactionID: string,
    public merchantProfilePhoto: string,
    public merchantName: string
  ) {}
}
