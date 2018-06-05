import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdvDetailService } from '../core/services/adv-detail.service'
import { Advertisement } from '../core/models/advertisment.model'
import { OrderInformation } from '../core/models/orderinfo.model'
import { OrderService } from '../core/services/order.service'
import { UserService } from '../core/services/user.service'
import * as firebase from 'firebase'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  Order:OrderInformation;
  theId;
  data = { type: '', name: '', message: '', roomname: '' };
  message = { content: '', date: null, role: '' };
  chats = [];
  roomkey:any;
  
  constructor(private advDetailService: AdvDetailService,private orderService:OrderService,private userService:UserService){
   this.advDetailService.castId.subscribe(result=>{
     if(result){
       console.log(result)
       this.theId = result
       this.orderService.getByID(this.theId).subscribe(result=>{
        this.Order = result
        console.log(result)
        this.data.roomname = result._id;
        this.data.type = "message";
        this.data.name = this.userService.getCurrentUser().username
        this.roomkey = result.roomkey;
        var start = new Date().getTime();
        firebase.database().ref('chatrooms/' + result.roomkey + '/chats')
        //.limitToLast(10)
        .on('value', resp => {
          this.chats = [];
          this.chats = snapshotToArray(resp);
          console.log(this.chats);
          var end = new Date().getTime();
          console.log(end - start);         
        });
      })
     }
   })
  
 
  }

  sendMessage() {
    //this.data.message = this.leaveMess;
    if (this.data.message.trim() != '') {
      let newData = firebase
        .database()
        .ref('chatrooms/' + this.roomkey + '/chats')
        .push()
      newData.set({
        type: this.data.type,
        user: this.userService.getCurrentUser().username,
        message: this.data.message,
        sendDate: Date()
      })
      this.data.message = '';
      //this.scrollToBottom();
    }
  }

  ngOnInit() {
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
