import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html'
})
export class ToastComponent {

  public state: 'actived' | 'hided' | 'freezed' = 'hided';
  public activeLocal = false;

  @Input() set active(active: boolean) {
    this.activeLocal = active;
    this.hideToast();
  };

  @Input() title = "";
  @Input() message = "";
  @Input() type: 'success' | 'danger' | 'info' | 'warning' | 'primary' | 'secondary' | 'default' = 'info';
  @Input() delay = 6000;

  @Output() hidedChange = new EventEmitter<boolean>(false);

  private hideToast() {
    if(this.activeLocal && this.state !== 'freezed') {
      this.state = 'freezed';
      this.hidedChange.emit(false);
      setTimeout(()=> {
        this.activeLocal = false;
        this.state = 'hided';
        this.hidedChange.emit(true);
      }, this.delay);
    }
  }
}
