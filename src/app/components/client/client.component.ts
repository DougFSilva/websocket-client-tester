import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ToastrService } from 'ngx-toastr';
import * as SockJS from 'sockjs-client';
import { MessageReceived } from 'src/app/models/MessageReceived';
import * as Stomp from 'stompjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public url: string ="http://localhost:8080/pedidos-recebidos";
  public subscribedToTopics: string[] = [];
  public topicToSubscribe: string;
  public topicToSend: string;
  public stompClient: Stomp;
  public messageToSend: string;
  public messagesReceived: MessageReceived[] = [];
  public connected: boolean | null = false

  constructor(private toast: ToastrService) {}

  ngOnInit(): void {}

  connect(): void {
    if (this.stompClient) {
      if(this.stompClient.connected){
        this.toast.info('Já conectado!', 'INFO');
        return;
      }
    }
    const socket = new SockJS(this.url);
    this.stompClient = Stomp.over(socket);
    const that = this;
    this.stompClient.connect({}, function (frame) {
      if(frame.command == "CONNECTED"){
        that.connected = true;
      }
    });
  }

  subscribe(){
    if(this.stompClient != null){
      if(this.stompClient.connected){
        const that = this;
        that.stompClient.subscribe(that.topicToSubscribe, function (message) {
          that.messagesReceived.push(new MessageReceived(JSON.stringify(message.headers, null, 2),
          JSON.stringify(JSON.parse(message.body), null, 2)));
        });
        this.subscribedToTopics.push(this.topicToSubscribe);
      }
    }
  }

  disconnect(): void {
    if (this.stompClient.connected) {
      this.stompClient.disconnect();
      this.connected = false;
      this.messagesReceived = [];
      this.subscribedToTopics = [];
      this.topicToSubscribe = "";
    }
  }

  sendMessage() {
    this.stompClient.send(this.topicToSend , {}, this.messageToSend);
    this.messageToSend = "";
  }
}
