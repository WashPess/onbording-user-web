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
    this.updatePercentByVolume(this.volume);
    this.changeKnobPositionByPercentage(this.percent);
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
    this.percentageAfterDraggingKnob(this.boundaryClient.height - this.knobClient.height);
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

  private getKnobPosition() {
    this.getBoundaryElement();
    this.getKnobElement();
  }

  public changeKnobPositionByPercentage(percent: number = 100) {
    this.getBoundaryElement();
    this.getKnobElement();
    this.dragPosition = { x: 0, y: this.calcPositionKnobByPercent(percent) };
  }

  // calcula o deslocamento necessário para o knob em tela
  private calcPositionKnobByPercent(percent: number): number {
    const height = (this.boundaryClient.height - 1) - this.knobClient.height;
    const position = height - (height / 100) * percent;
    return Math.round(position);
  }

  // atualiza percentual enquanto arrastar o knob
  private percentageAfterDraggingKnob(spaceTraveled: number): number {
    this.percent = ((spaceTraveled - (this.knobClient.top - this.boundaryClient.top)) / (spaceTraveled / 100));
    return this.percent;
  }

  // atualiza o percentual aplicando a curva logaritmica
  // set o volume no audio corrente
  private updatePercentByVolume(volume: number): number {
    this.volume = this.normalizeVolume(volume);
    this.percent = this.adjustPercentageByVolumeWithLogarithmicCurve(volume);
    this.audioCurrent.volume = this.volume;
    return this.percent;
  }

  // atualizar o volume aplicando uma curva exponencial
  //set o volume no audio corrente
  private updateVolumeByPercent(percent: number): number {
    this.percent = this.normalizePercent(percent);
    this.volume = this.adjustVolumeByPercentageWithExponentialCurve(this.percent);
    this.audioCurrent.volume = this.volume;
    return this.volume;
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

  private normalizePercent(percent: number): number {

    if(percent > 100) {
      return 100;
    }

    if(percent < 0) {
      return 0;
    }

    return Number(percent);
  }

  // converte um percentual para par volume
  // aplica uma curva exponencial do volume na base 10 com um offset de ajuste fino
  private adjustVolumeByPercentageWithExponentialCurve(percent: number): number {
    const expansionRate = 1.5;
    const offset = ((0.317 / 100) * ((100 - percent) + 1));
    const axisX = (expansionRate / 100) * percent;
    const axisY = (Math.pow(10, (axisX - (expansionRate - 1))) - offset);
    const normalizeAxisY = axisY * 0.1;
    return this.normalizeVolume(normalizeAxisY);
  }

  // converte um volume para percentual
  // spliva uma curva logaritmica
  private adjustPercentageByVolumeWithLogarithmicCurve(volume: number): number {
    const compressionRatio = 0.665;
    const offset = (1 * (1 - volume));
    const normalizeVolumeTolog = (Math.pow(volume, Math.sqrt(compressionRatio)) * 10) + offset;
    const percent = Math.log10(normalizeVolumeTolog) * 100;
    return this.normalizePercent(percent);
  }

}

