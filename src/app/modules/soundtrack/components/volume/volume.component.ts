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
    this.changeKnobPositionByPercent(this.updatePercentByVolume(this.volume));
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
    this.knobElement.style.top = `${this.calcPositionKnobByPercent(percent)}px`;
  }

  public changePosition() {
    this.dragPosition = {x: this.dragPosition.x , y: this.dragPosition.y };
  }

  // quando knob sofre mudança
  public knobChangesByDrag(event: CdkDragMove<any>){
    this.getKnobPosition();
    this.percentageAfterDraggingKnob(this.boundaryClient.height - this.knobClient.height)
    this.updateVolumeByPercent(this.percent);
  }

  private calcPositionKnobByPercent(percent: number): number {
    const height = (this.boundaryClient.height - 1) - this.knobClient.height;
    return (height - (height / 100) * percent);
  }

  private getKnobPosition() {
    this.getBoundaryElement();
    this.getKnobElement();
  }

  private percentageAfterDraggingKnob(spaceTraveled: number): number {
    this.percent = ((spaceTraveled - (this.knobClient.top - this.boundaryClient.top)) / (spaceTraveled / 100));
    return this.percent;
  }

  public parseToInt(percent: number): number {
    return parseInt(String(percent), 10);
  }

  private updateVolumeByPercent(percent: number): number {
    this.volume = this.adjustLogCurve(this.percent);
    this.percent = this.normalizePercent(percent);
    this.audioCurrent.volume = this.volume;
    return this.volume;
  }

  private updatePercentByVolume(volume: number): number {
    this.percent = this.parseVolumeToPercent(volume);
    this.volume = this.normalizeVolume(volume);
    this.audioCurrent.volume = this.volume;
    return this.percent;
  }

  private parsePercentToVolume(percent: number): number {
    return this.normalizePercent(percent) / 100;
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

  private adjustLogCurve(percent: number): number {
    const normalizePercent = percent * 0.1;
    const percentageWithOffset = (normalizePercent + 1);
    const percentageWithVariance = percentageWithOffset * 0.91;
    return this.normalizeVolume(Math.log10(percentageWithVariance));
  }

  //JA ERA MEU FONE -- blz'

}
