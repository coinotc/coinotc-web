export interface Advertisement {
  owner: string,
  visible: Boolean,
  crypto: string,
  country: string,
  fiat: string,
  price: number,
  min_price: number,
  max_price: number,
  payment: string[],
  limit: number,
  message: string,
  type: number
  //sell=0   buy=1   
}
export class advertisement implements Advertisement{
  constructor(
    public owner: string,
    public visible: Boolean,
    public crypto: string,
    public country: string,
    public fiat: string,
    public price: number,
    public min_price: number,
    public max_price: number,
    public payment: string[],
    public limit: number,
    public message: string,
    public type: number
  ){
  }
}