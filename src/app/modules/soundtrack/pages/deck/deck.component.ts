import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss']
})
export class DeckComponent implements OnInit {

  public playersToggle= false;

  playToggle() {
    this.playersToggle = !this.playersToggle
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

  public initDragAndDrop() {

    let isDown = false;
    const dragMe = document.querySelector('.dragme') as HTMLElement;
    dragMe?.addEventListener('mousedown', function() {
      isDown = true;
    });

    window.addEventListener('mouseup', function() {
      isDown = false;
    });

    window.addEventListener('mousemove', function(event) {
      if (isDown) {
        dragMe.style.top = event.clientY + 'px';
        dragMe.style.left = event.clientX + 'px';
      }
    });

  }

}
