export class Chat { 
    constructor(
        public message:string,
        public orderId:string,
        public type:number,
        public status:string,
        public date:Date,
        public roomkey:string
    ){}
}