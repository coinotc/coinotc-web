export interface Kyc {
    username: string;
    verifyStatus:number,
    passport:string,
    firstName:string,
    lastName:string,
    gender:boolean,
    country:string,
    kycImg:Array<any>
}
