import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    public messages: string[] = [];

    constructor() { }

    add(msg: string) {
        this.messages.push(msg);
    }

    clear() {
        this.messages = [];
    }
}
