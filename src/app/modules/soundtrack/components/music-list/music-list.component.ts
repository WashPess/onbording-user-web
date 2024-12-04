import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";


@Component({
    selector: 'app-music-list',
    templateUrl: './music-list.component.html'
})
export class MusicListComponent {

  public catalog = [
    { title: "A Jornada Começa", description: 'WAi', source: '2.mp3'} ,
    { title: "Heróis do Deserto", description: 'WAi', source: '1.mp3'},
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

  constructor(
    private readonly activeModal: NgbActiveModal,
  ) {

  }

  public dismiss() {
    this.activeModal.dismiss();
  }

  public close() {
    this.activeModal.close();
  }

}
