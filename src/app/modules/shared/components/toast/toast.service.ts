import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export type TypeNotify = 'success' | 'danger' | 'info' | 'warning' | 'primary' | 'secondary' | 'default';

export interface ToastNotify {
  type: TypeNotify,
  delay: number,
  active: boolean,
  title: string,
  message: string,
}

export interface TimeControl {
  state: boolean,
  notice: ToastNotify,
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public delay: number = 6000;
  public observers: ToastNotify[] = <ToastNotify[]>[];

  public observers$ = new BehaviorSubject<ToastNotify[]>(<ToastNotify[]>[]);
  public get observables$(): Observable<ToastNotify[]> {
    return this.observers$.asObservable();
  }

  public hide = new BehaviorSubject<TimeControl>(<TimeControl>{})
  public get hided() {
    return this.hide.asObservable();
  }

  constructor() {
    this.changeHided();
  }

  public success(msg: string, delay: number = 0) {
    delay = delay || this.delay;
    this.notify('success', 'Sucesso', msg, delay);
  }

  public error(msg: string, delay: number = 0) {
    delay = delay || this.delay;
    this.notify('danger', 'Erro', msg, delay);
  }

  public info(msg: string, delay: number = 0) {
    delay = delay || this.delay;
    this.notify('info', 'Info', msg, delay);
  }

  public warning(msg: string, delay: number = 0) {
    delay = delay || this.delay;
    this.notify('warning', 'Warning', msg, delay);
  }

  public message(msg: string, delay: number = 0) {
    delay = delay || this.delay;
    this.notify('primary', 'Primary', msg, delay);
  }

  public context(msg: string, delay: number = 0) {
    delay = delay || this.delay;
    this.notify('secondary', 'Secondary', msg, delay);
  }

  public default(msg: string, delay: number = 0) {
    delay = delay || this.delay;
    this.notify('default', 'Default', msg, delay);
  }

  private notify(type: TypeNotify, title: string, message: string, delay: number = 6000, active: boolean = true) {
    const notice = <ToastNotify>{ type, title, message, delay, active };
    this.observers.push(notice);
    this.timeControl(notice);
    this.observers$.next(this.observers);
  }

  public unnotify(status: boolean, notice: ToastNotify) {
    if(!status) {
      return;
    }

    this.observers = this.observers.filter((o: any)=> o !== notice);
    this.observers$.next(this.observers);
  }

  private changeHided() {
    this.hided.subscribe((timeControl: TimeControl)=> {
      this.unnotify(timeControl.state, timeControl.notice)
    })
  }

  private timeControl(notice: ToastNotify) {
    setTimeout(() => this.hide.next(<TimeControl>{ state: true, notice }), notice.delay);
  }

}
