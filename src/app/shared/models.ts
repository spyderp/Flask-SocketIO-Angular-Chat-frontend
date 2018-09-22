export class Message {
	username:string
	message:string
}

export enum Event {
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
    LOGIN = 'login',
    JOINED = 'user_joined',
    TYPING = 'typing'
}

