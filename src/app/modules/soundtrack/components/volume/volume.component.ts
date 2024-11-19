import { Component, Input, OnInit } from "@angular/core";


@Component({
    selector: 'app-volume',
    templateUrl: './volume.component.html',
    styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit {

  public volume = 100;

  @Input() set audio(au: HTMLAudioElement) {

    if(!au) {
      return;
    }

    console.log("AUDIO: ", au.volume)
    this.audioCurrent = au;
    this.volume = (this.audioCurrent.volume * 100);
    this.changeKnob(this.volume);
  };

  public audioCurrent: HTMLAudioElement = new Audio();
  dragPosition = {x: 0, y: 0};

  ngOnInit(): void {
    this.audioCurrent.volume = 0.1;
  }

  public changeKnob(percent: number = 100) {

    const knobBoundary = document.querySelector('.knob-boundary') as HTMLElement;
    const clientBoundary = knobBoundary.getBoundingClientRect();

    const knob = document.querySelector('.knob-box') as HTMLElement;
    const clientKnob = knob.getBoundingClientRect();

    const height = (clientBoundary.height - 1) - clientKnob.height;
    const heightPercent = height - (height / 100) * percent;
    knob.style.top = `calc((${heightPercent}px - 1px)`;
  }

  changePosition() {
    this.dragPosition = {x: this.dragPosition.x + 50, y: this.dragPosition.y + 50};
  }

  onFieldHover(event: any){
    console.log("MOUSE: ", event.target);
  }

}
