export interface Advertisement {
  owner: string,
  visible: Boolean,
  crypto: string,
  country: string,
  fiat: string,
  price: number,
  min_price: number,
  max_price: number,
  payment: string,
  limit: number,
  message: string,
  type: number
}
