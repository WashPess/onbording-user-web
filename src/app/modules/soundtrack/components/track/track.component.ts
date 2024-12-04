import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Debounce } from "../../../shared/utils/debounce";
import { StorageDB } from "../../../shared/utils/storagedb";
import { Str } from "../../../shared/utils/str";
import { MusicListComponent } from "../music-list/music-list.component";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {

  @Input() title = '';
  @Input() description = '';
  @Input() source = '';

  @Input() progress = 0;          // porcentagem de progresão
  @Input() volume = 100;          // porcentagem de progresão
  @Input() timecode = 0;          // tempo atual
  @Input() timecodeTotal = 0;     // tempo atual
  @Input() regress = 0;           // tempo restante
  @Input() positionPercent = 0;   // tempo restante

  @Input() played = false;        // estado da execução
  @Input() paused = true;         // estado da execução

  @Input() timeStart = false;     // timecode de início
  @Input() timeEnd = false;       // timecode de fim

  @Input() holded = false;        // se a musica deve continuar tocando quando der play em outra
  @Input() repeated = false;      // muda o estado de repetiçao

  @Input() set stop(stop: boolean) {
    if(this.playing) {
      return;
    }
    this.stoppage();
  }

  @Input() set reset(reset: boolean) {
    this.clear();
  }

  @Output() playChange = new EventEmitter<boolean>() ;
  @Output() audioChange = new EventEmitter<HTMLAudioElement>() ;

  public playing = false;
  public audio = new Audio();
  private debounce: any = ()=> {};

  public colors = [
    { color: '#FCEAAC', saturate: '175%' },
    { color: '#FDA802', saturate: '110%' },
    { color: '#B7E7F7', saturate: '200%' },
    { color: '#C4C4C6', saturate: '105%' },
  ];

  constructor(
    private readonly modal: NgbModal
  ) {

  }

  public currentColor = this.colors[0];

  ngOnInit(): void {
    this.audioBuilder();
    this.readFeature();

    setTimeout(()=> this.openMusicList(), 500);

  }

  public changeHold(state: boolean) {
    this.holded = state;
    this.saveFeature();
  }

  public changeReapeat() {
    this.repeated = !this.repeated;
    this.saveFeature();
  }

  public changeRangeMusic(range: string) {
    const timecode = Math.ceil((this.timecodeTotal / 100)) * parseFloat(range);
    this.audio.currentTime = timecode;
  }

  public changeRangeWhenDrop() {
    this.saveFeature();
  }

  private changeVolume() {
    this.volume = (this.audio.volume * 100);
    if(!this.debounce) {
      return;
    }
    this.debounce();
  }

  private updateTimeCode() {
    this.timecode = this.audio.currentTime;
    this.regress = this.timecodeTotal - this.timecode;
    this.positionPercent = this.updateTimeToPercent(this.timecode);
  }

  private updateTimeToPercent(timecode: number) {
    this.positionPercent = (100 / this.timecodeTotal) * timecode;
    return this.positionPercent;
  }

  private audioBuilder() {
    this.audio = new Audio()
    this.audio.src = this.source;
    this.audio.onloadstart = ()=> this.initLoad();
    this.audio.onended = ()=> this.initPlayToReapet();
    this.audio.onvolumechange = ()=> this.changeVolume();
    this.audio.ontimeupdate = () => this.updateTimeCode();
    this.audio.ondurationchange = () => this.initTimeDuration();
  }

  private initPlayToReapet() {
    if(!this.repeated) {
      return;
    }
    const that = this;
    this.stoppage();
    setTimeout(()=> that.play(), 2);
  }

  private initTimeDuration() {
    this.timecodeTotal = this.audio.duration;
    this.saveFeature();
  }

  private initLoad() {
    this.volume =  (this.audio.volume * 100);
    this.saveFeature();
    this.debounce = Debounce(()=> this.saveFeature(), 40);
  }

  public play() {
    const playtoogle = this.toggleStatePlay()
    this.playChange.emit(playtoogle);
    this.runElapsedPlaying()
    if(playtoogle) {
      this.audio.play();
      this.audioChange.emit(this.audio);
      this.saveFeature();
      return;
    }
    this.pause();
  }

  public pause () {
    this.runElapsedPlaying()
    this.paused = true;
    this.played = false;
    this.audio.pause();
    // this.saveFeature();
  }

  public stoppage() {
    if(this.holded) {
      return;
    }
    this.pause();
    this.audio.currentTime = 0;
  }

  public clear() {
    this.audio.volume = 1;
    this.holded = false;
    this.repeated = false;
    // this.saveFeature();
    this.stoppage()
  }

  private runElapsedPlaying() {
    this.playing = true;
    setTimeout(() => this.playing = false, 20);
  }

  private saveFeature() {
    const feature = {
      title: this.title,
      description: this.description,
      source: this.source,
      volume: this.volume,
      currentTime: this.audio.currentTime,
      holded: this.holded,
      repeated: this.repeated,
      timeStart: this.timeStart,
      timeEnd: this.timeEnd,
    }

    const key = Str.toSnakeCase(`${this.title} ${this.source}`);
    StorageDB.save(key, feature)
  }

  private readFeature() {
    const key = Str.toSnakeCase(`${this.title} ${this.source}`);
    const feature = StorageDB.read(key)
    const { title, description, source, volume, currentTime, holded, repeated, timeStart, timeEnd } = feature;

    this.title = title || this.title;
    this.description = description || this.description;
    this.source = source || this.source;
    this.volume = volume || this.volume;
    this.holded = holded || this.holded;
    this.repeated = repeated || this.repeated;
    this.timeStart = timeStart || this.timeStart;
    this.timeEnd = timeEnd || this.timeEnd;

    this.audio.src = this.source;
    this.audio.volume = (this.volume / 100);
    this.audio.currentTime = currentTime || this.audio.currentTime;
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

  public parseInt(n: number) {
    return  parseInt(String(n), 10);
  }

  public openMusicList() {
    const modal = this.modal.open(MusicListComponent, { size: 'lg' });
    modal.closed.subscribe((music: any)=> {
      console.log("A", music)
    });
  }

}
