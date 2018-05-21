import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as socketIo from 'socket.io-client';


const SERVER_URL = 'http://localhost:3000';


@Injectable()
export class SocketService {
    isSocket = false;


  constructor() { }

  public socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
    this.isSocket = true;
}

  public send(message: string): void {
    this.socket.emit('message', message);
}

public getRomms(username: string): void {
    console.log("socket서비스 onConnect 하는 시점");
    console.log(username);
    this.socket.emit('getrooms', username);
}

public disConnect(): void {
    console.log("소켓 끈어라.");
    //this.socket.emit('disconnect');
    this.socket.disconnect();
}



public onMessage(): Observable<any> {
    return new Observable(observer => {
        this.socket.on('message', (data) => {
            console.log(data);
            observer.next(data);
        });
    });
}

public onLeaveRoom(): Observable<any> {
    //this.io.sockets.in(data.roomId).emit('leaveroom'); // room에 속한 놈한테만 보냄
    return new Observable(observer => {
        this.socket.on('leaveroom', (data) => {
            console.log("방 잘 나갔는디");
            observer.next(data);
        });
    });
}

public onConnect(): Observable<any> {
    console.log("socket서비스 onConnect 하는 시점");
    return new Observable(observer => {
        this.socket.on('connect', () => observer.next());
    });
}

public onDisconnect(): Observable<any> {
    console.log("소켓 끈어라.");
    return new Observable(observer => {
        this.socket.on('disconnect', () => observer.next());
    });
}


}
