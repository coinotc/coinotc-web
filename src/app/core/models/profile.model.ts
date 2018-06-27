export interface Profile {
  username: string;
  orderCount:number;
  ratings:number;
  following:Array<string>;
  followers:Array<string>;
}
