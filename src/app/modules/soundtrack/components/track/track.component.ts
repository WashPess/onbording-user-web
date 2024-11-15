import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {

  @Input() title = 'Evidências';
  @Input() description = 'Chitãozinho e Xororó';
  @Input() source = '1.mp3';

  @Input() progress = 0; // porcentagem de progresão
  @Input() volume = 50; // porcentagem de progresão
  @Input() timecode = 0; // tempo atual
  @Input() timecodeTotal = 0; // tempo atual
  @Input() regress = 0;  // tempo restante

  @Input() played = false;  // estado da execução
  @Input() paused = true;   // estado da execução

  @Input() timeStart = false;   // timecode de início
  @Input() timeEnd = false;     // timecode de fim

  @Input() set stop(stop: boolean) {
    if(this.playing) {
      return;
    }
    this.clear()
  }

  @Output() playChange = new EventEmitter<boolean>() ;

  public playing = false;

  public audio = new Audio();

  public colors = [
    { color: '#FCEAAC', saturate: '175%' },
    { color: '#FDA802', saturate: '110%' },
    { color: '#B7E7F7', saturate: '200%' },
    { color: '#C4C4C6', saturate: '105%' },
  ]

  public currentColor = this.colors[0];

  ngOnInit(): void {
    this.audioBuilder();
  }
    //Factory
  private audioBuilder() {
    this.audio = new Audio()
    this.audio.src = this.source;
    this.volume =  (this.audio.volume * 100);
    this.audio.ontimeupdate = () => this.timecode = this.audio.currentTime;
    this.audio.ondurationchange = () => this.timecodeTotal = this.audio.duration;
    this.audio.onvolumechange = ()=> this.volume =  (this.audio.volume * 100);
  }

  public play() {
    const playtoogle = this.toggleStatePlay()
    this.playChange.emit(playtoogle);
    this.runElapsedPlaying()
    if(playtoogle) {
      this.audio.play();
      return;
    }
    this.pause();
  }

  public pause () {
    this.runElapsedPlaying()
    this.paused = true;
    this.played = false;
    this.audio.pause();
  }

  public clear() {
    this.pause();
    this.audio.currentTime = 0;
    this.audio.volume = 1;
  }

  private toggleStatePlay() {
    if(this.paused) {
      this.paused = false;
      this.played = true;
      return this.played;
    }

    this.paused = true;
    this.played = false;
    return this.played;
  }

  public labelTimecode(timecode: number) {
    const seconds = parseInt(String(timecode % 60), 10);
    const minutes = parseInt(String((timecode / 60) % 60), 10)
    const hours = parseInt(String((timecode / 3600) % 24), 10)
    const days = parseInt(String((timecode / 86400)), 10)
    const daysStr = days > 0 ? `${this.padStart(days)} dias ` : '';
    return `${daysStr}${this.padStart(hours)}:${this.padStart(minutes)}: ${this.padStart(seconds)}`
  }

  private padStart(counter: number): string {
    return String(counter).padStart(2, '0');
  }

  private runElapsedPlaying() {
    this.playing = true;
    setTimeout(() => this.playing = false, 20);
  }

}



