import { Component, OnInit } from "@angular/core";



@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  public playersToggle= false;
  public audioCurrent: HTMLAudioElement = new Audio();

  public playToggle() {
    this.playersToggle = !this.playersToggle
  }

  public audioToggle(audio: HTMLAudioElement) {
    this.audioCurrent = audio;
  }

  public catalog = [
    { title: "Heróis do Deserto", description: 'WAi', source: '1.mp3'} ,
    { title: "A Jornada Começa", description: 'WAi', source: '2.mp3'} ,
    { title: "A Queda do Herói", description: 'WAi', source: '3.mp3'} ,
    { title: "A Queda do Herói", description: 'WAi', source: '3.mp3'} ,
    { title: "A Queda do Herói", description: 'WAi', source: '3.mp3'} ,
    { title: "A Queda do Herói", description: 'WAi', source: '3.mp3'} ,
    { title: "A Queda do Herói", description: 'WAi', source: '3.mp3'} ,
    { title: "A Queda do Herói", description: 'WAi', source: '3.mp3'} ,
    { title: "A Queda do Herói", description: 'WAi', source: '3.mp3'} ,
    { title: "A Queda do Herói", description: 'WAi', source: '3.mp3'} ,
    { title: "A Queda do Herói", description: 'WAi', source: '3.mp3'} ,
    { title: "A Queda do Herói", description: 'WAi', source: '3.mp3'} ,
    { title: "A Queda do Herói", description: 'WAi', source: '3.mp3'} ,
    { title: "A Queda do Herói", description: 'WAi', source: '3.mp3'} ,
    { title: "A Queda do Herói", description: 'WAi', source: '3.mp3'} ,
  ]


  ngOnInit(): void {
      this.initDragAndDrop();
  }

  public initDragAndDrop() {}

}
