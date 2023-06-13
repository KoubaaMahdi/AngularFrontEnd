import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ 
  providedIn: 'root'
})
export class WebsocketService {
  private socket:any;
  constructor() { this.socket = io("http://localhost:3000");}
  connect(): Rx.Subject<MessageEvent> {
    // If you aren't familiar with environment variables then
    // you can hard code `environment.ws_url` as `http://localhost:5000`
    

    // We define our observable which will observe any incoming messages
    // from our socket.io server.
    let observable = new Observable(observer => {
        this.socket.on('chat message', (data:any) => {
          console.log("Received message from Websocket Server")
          
          const para = document.createElement("app-chat");
          const list =document.getElementById("msgs");
          para.setAttribute("message",data);
          para.setAttribute("date","15 April")
          list?.appendChild(para);
        })
        return () => {
          this.socket.disconnect();
        }
    });

    // We define our Observer which will listen to messages
    // from our other components and send messages back to our
    // socket server whenever the `next()` method is called.
    let observer = {
        next: (data: any) => {
            this.socket.emit('chat message', JSON.stringify(data));
            
        },
    };

    // we return our Rx.Subject which is a combination
    // of both an observer and observable.
    return Rx.Subject.create(observer, observable);
  }


}
