import { Component, OnInit } from "@angular/core";
import { ToastNotify, ToastService } from "./toast.service";
import { Observable, of } from "rxjs";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html'
})
export class ToastComponent implements OnInit {

  public observers: ToastNotify[] = <ToastNotify[]>[];
  private readonly observers$: Observable<ToastNotify[]> = of(<ToastNotify[]>[]);

  constructor(private readonly toastService: ToastService) {
    this.observers$ = toastService.observables$;
  }

  ngOnInit() {
    this.changeObservers();
  }

  private changeObservers() {
    this.observers$.subscribe((observers: ToastNotify[])=> {
      this.observers = observers;
    })
  }
}
