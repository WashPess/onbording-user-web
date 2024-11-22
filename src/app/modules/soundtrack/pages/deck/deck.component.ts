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
    { title: "Nas Sombras do Segredo", description: 'WAi', source: '4.mp3'} ,
    { title: "Canção do Bardo", description: 'WAi', source: '5.mp3'} ,
    { title: "Rock Balboa", description: 'WAi', source: '6.mp3'} ,
    { title: "Gate", description: 'WAi', source: '7.mp3'} ,
    { title: "Ó o caba Lá", description: 'WAi', source: '8.mp3'} ,
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
