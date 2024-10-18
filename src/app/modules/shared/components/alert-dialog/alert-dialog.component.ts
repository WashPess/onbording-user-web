import { Component, Input } from "@angular/core";

export type TypeDialog = 'message' | 'success' | 'danger' | 'info' | 'warning' | 'primary' | 'second';
export type PositionDialog = 'start' | 'center' | 'end';

export const IconDialog = new Map<TypeDialog, string>([
  [ "message", "bi-chat-right-dots" ],
  [ "success", "bi-check2-circle" ],
  [ "danger", "bi-slash-circle" ],
  [ "info", "bi-exclamation-circle" ],
  [ "warning", "bi-exclamation-circle" ],
  [ "primary", "bi-chat-right" ],
  [ "second", "" ],
])

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['alert-dialog.component.scss']
})
export class AlertDialogComponent {

  @Input() title = ``;
  @Input() message = ``;
  @Input() cancelLabel = "Cancelar";
  @Input() confirmLabel = "Confirmar";
  @Input() type: TypeDialog = "message";
  @Input() hideIcon: boolean = false;
  @Input() position: PositionDialog = "start";

  public get isFillTitle(): boolean {
    return  String(this.title ?? '').length > 0;
  }

  public get isFillMessage(): boolean {
    return String(this.message ?? '').length > 0;
  }

  public get isFillCancelLabel(): boolean {
    return String(this.cancelLabel ?? '').length > 0;
  }

  public get isFillConfirmLabel(): boolean {
    return String(this.confirmLabel ?? '').length > 0;
  }

  public get alertColor(): string {
    return String(this.type).trim();
  }

  public get positionDialog(): string {
    return String(this.position).trim();
  }

  public get iconTitle(): string {
    return IconDialog.get(this.type) ?? '';
  }

  public get hasIcon(): boolean {
    return !this.hideIcon && String(this.iconTitle).length > 0;
  }

  // public close() {

  // }

}
