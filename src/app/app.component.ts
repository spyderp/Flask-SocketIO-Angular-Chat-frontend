import { Component,  OnInit  } from '@angular/core';
import { SocketService } from './socket.service';
import {Message, Event} from './shared/models'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent  implements OnInit {
  loading:boolean = false
  username: string;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  constructor(private socketService: SocketService) { }

   ngOnInit(): void {
   	this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });
    this.socketService.onEvent(Event.LOGIN)
      .subscribe((data) => {
        this.messages.push({
        	username:this.username,
        	message:'Acceso concedido'
        });
    });
    this.socketService.onEvent(Event.JOINED)
      .subscribe((data) => {
      	console.log(data)
        this.messages.push({
        	username:data.username,
        	message:'<<-Se ha conectado el usuario'
        });
    });
    this.socketService.onEvent(Event.TYPING)
      .subscribe(() => {
    });

    this.ioConnection = this.socketService.onMessage()
    		.subscribe((message: Message) => {
      		this.messages.push(message);
		});
   }

   public onRegister(){
   	this.loading = true
   	console.log(this.username)
   	this.socketService.addUser(this.username);

   }

	 public onSend(){
	 	console.log(this.username, this.messageContent)
 		this.socketService.send({
      username: this.username,
      message: this.messageContent
    });
     this.messageContent = ''
	 }
}
