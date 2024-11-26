import { CdkDragMove } from "@angular/cdk/drag-drop";
import { Component, Input, OnInit } from "@angular/core";


@Component({
    selector: 'app-volume',
    templateUrl: './volume.component.html',
    styleUrls: ['./volume.component.scss']
})
export class VolumeComponent implements OnInit {

  @Input() set audio(au: HTMLAudioElement) {

    if(!au) {
      return;
    }

    this.audioCurrent = au;

    this.volume = this.normalizeVolume(this.audioCurrent.volume);
    this.updatePercentByVolume(this.volume)
    this.changeKnobPositionByPercent(this.adjustLogCurveByVolume(this.volume));
    console.log("VOL: ", this.volume);
  };

  public volume: number = 1; // 0 - 1
  public percent: number = 0; // 0 - 100

  public audioCurrent: HTMLAudioElement = new Audio();
  public dragPosition = { x: 0, y: 0 };

  private boundaryElement: HTMLElement = document.createElement('div');
  private boundaryClient: DOMRect = new DOMRect();

  private knobElement: HTMLElement = document.createElement('div');
  private knobClient: DOMRect = new DOMRect();

  ngOnInit(): void {
    this.getBoundaryElement();
    this.getKnobElement();
  }

  // quando knob sofre mudança
  public knobChangesByDrag(event: CdkDragMove<any>){
    this.getKnobPosition();
    this.percentageAfterDraggingKnob(this.boundaryClient.height - this.knobClient.height)
    this.updateVolumeByPercent(this.percent);
  }

  public parseToInt(percent: number): number {
    return parseInt(String(percent), 10);
  }

  private getBoundaryElement() {
    this.boundaryElement = document.querySelector('.knob-boundary') as HTMLElement;
    this.boundaryClient = this.boundaryElement.getBoundingClientRect();
  }

  private getKnobElement() {
    this.knobElement = document.querySelector('.knob-box') as HTMLElement;
    this.knobClient = this.knobElement.getBoundingClientRect();
  }

  public changeKnobPositionByPercent(percent: number = 100) {
    this.getBoundaryElement();
    this.getKnobElement();
    this.dragPosition = { x: 0, y: this.calcPositionKnobByPercent(percent) };
  }

  private calcPositionKnobByPercent(percent: number): number {
    const height = (this.boundaryClient.height - 1) - this.knobClient.height;
    const position = height - (height / 100) * percent;
    return Math.round(position);
  }

  private updatePercentByVolume(volume: number): number {
    this.percent = this.parseVolumeToPercent(volume);
    this.volume = this.normalizeVolume(volume);
    this.audioCurrent.volume = this.volume;
    return this.percent;
  }

  private getKnobPosition() {
    this.getBoundaryElement();
    this.getKnobElement();
  }

  private percentageAfterDraggingKnob(spaceTraveled: number): number {
    this.percent = ((spaceTraveled - (this.knobClient.top - this.boundaryClient.top)) / (spaceTraveled / 100));
    return this.percent;
  }

  private updateVolumeByPercent(percent: number): number {
    this.volume = this.adjustLogCurveByPercent(this.percent);
    this.percent = this.normalizePercent(percent);
    this.audioCurrent.volume = this.volume;
    return this.volume;
  }

  private normalizePercent(percent: number): number {

    if(percent > 100) {
      return 100;
    }

    if(percent < 0) {
      return 0;
    }

    return Number(percent);
  }

  private parseVolumeToPercent(volume: number): number {
    return this.normalizeVolume(volume) * 100;
  }

  private normalizeVolume(volume: number): number {


    if(volume > 1) {
      return 1;
    }

    if(volume < 0) {
      return 0;
    }

    return Number(volume);
  }

  private adjustLogCurveByPercent(percent: number): number {
    const baseToPercent = 1.5;
    const offset = ((0.317 / 100) * ((100 - percent) + 1));
    const axisX = (baseToPercent / 100) * percent;
    const axisY = (Math.pow(10, (axisX - (baseToPercent - 1))) - offset);
    const normalizeAxisY = axisY * 0.1;
    return this.normalizeVolume(normalizeAxisY);
  }

  private adjustLogCurveByVolume(volume: number): number {
    const offset = (1 * (1 - volume));
    const normalizeVolumeTolog = (Math.pow(volume, Math.sqrt(0.665)) * 10) + offset;
    const percent = Math.log10(normalizeVolumeTolog) * 100;
    return this.normalizePercent(percent);
  }

}

