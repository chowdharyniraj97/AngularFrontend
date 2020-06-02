import { Injectable } from '@angular/core';
import {TokenPayload} from './token-payload';

@Injectable({
  providedIn: 'root'
})
export class DummyserverService {

  constructor() { }

  isCorrectCredentia(user:TokenPayload){

      const message= this.sendRequesttoServer(user);
      if(message.data== 'success') {
        localStorage.setItem('usertoken','12345');
      }

  }

  sendRequesttoServer(user){
    if(user.email=== 'chowdharyniraj97@gmail.com' && user.password=== '123456')
      return {'data':'success'}
  }

    isLoggedOn(){
      if(localStorage.getItem('usertoken'))
        return true;
      return true;
    }

}
