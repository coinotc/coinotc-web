export interface User {
  email: string,
  token: string,
  username: string,
  bio: string,
  image: string,
  orderCount: number,
  idCard: string,
  verifyName: string,
  phone: number,
  tradePrd: number,
  following: Array<string>,
  block: Array<string>,
  nativeCurrency: string,
  deviceToken: string,
  followers: Array<string>,
  ratings: Array<number>,
  active : boolean,
  createdAt:Date
}
