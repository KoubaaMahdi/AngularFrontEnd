import { Component} from '@angular/core';
import AppComponent from 'src/app/app.component';
import { ChatService } from 'src/app/chat.service';
import { WebsocketService } from 'src/app/websocket.service';
@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.css']
})
export class SendComponent {
  sendMessage() {
    const appComponent = new AppComponent(new ChatService(new WebsocketService));
    appComponent.sendMessage();
  }

}

