import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type TypeNotify = 'success' | 'danger' | 'info' | 'warning' | 'primary' | 'secondary' | 'default';

export interface ToastNotify {
  type: TypeNotify,
  delay: number,
  active: boolean,
  title: string,
  message: string,
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public delay: number = 6000;
  public observers: ToastNotify[] = <ToastNotify[]>[];
  public hide = new BehaviorSubject<boolean>(false)
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

  public error(msg: string) {
    this.notify('danger', 'Erro', msg);
  }

  public info(msg: string, delay: number = 0) {
    delay = delay || this.delay;
    this.notify('info', 'Info', msg);
  }

  public warning(msg: string, delay: number = 0) {
    delay = delay || this.delay;
    this.notify('warning', 'Warning', msg);
  }

  public message(msg: string, delay: number = 0) {
    delay = delay || this.delay;
    this.notify('primary', 'Primary', msg);
  }

  public context(msg: string, delay: number = 0) {
    delay = delay || this.delay;
    this.notify('secondary', 'Secondary', msg);
  }

  public default(msg: string, delay: number = 0) {
    delay = delay || this.delay;
    this.notify('default', 'Default', msg);
  }

  private notify(type: TypeNotify, title: string, message: string, delay: number = 6000, active: boolean = true) {
    this.observers.push(<ToastNotify>{ type, title, message, delay, active });
  }

  public unnotify(status: boolean, notice: ToastNotify) {
    if(!status) {
      return;
    }

    this.observers = this.observers.filter((o: any)=> o !== notice);
  }

  private changeHided() {
    this.hided.subscribe((state: boolean)=> {
      this.unnotify(state, <ToastNotify>{})
    })
  }

}


// this.toastService.success("asdfasdfasdf")
// this.toastService.error("asdfasdfasdf")
