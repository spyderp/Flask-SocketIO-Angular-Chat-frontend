import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { environment} from '../environments/environment';
import  {Message, Event}  from './shared/models'

import * as socketIo from 'socket.io-client';
@Injectable()
export class SocketService {
	private socket;
  constructor() { 
  	 this.socket = socketIo(environment.socketUrl);
  }

  public addUser(username:string):void{
  	console.log('ennviado')
  	this.socket.emit('add_user', username);
  }
  public send(message:any): void {
		this.socket.emit('message', message);
  }

  public onMessage(): Observable<Message> {
  	return new Observable<Message>(observer => {
  		this.socket.on('message', (data: Message) => observer.next(data));
  	});
  }

 
  public onEvent(event: Event): Observable<any> {
  	return new Observable<Event>(observer => {
  		this.socket.on(event, (data:any) => observer.next(data));
  	});
  }
}
