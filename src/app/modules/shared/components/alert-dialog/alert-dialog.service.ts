import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BehaviorSubject, of, skip } from "rxjs";

import { AlertDialogComponent, PositionDialog, TypeDialog } from "./alert-dialog.component";


@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {

  private readonly _close$ = new BehaviorSubject<boolean>(false);
  public get close() {
    return this._close$.asObservable();
  }

  private readonly _loading$ = new BehaviorSubject<boolean>(false);
  public get loading$() {
    return this._loading$.asObservable();
  }

  constructor(
    private readonly modal: NgbModal,
  ) {}

  public openAlertDialog(
    type: TypeDialog,
    title: string,
    message: string,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    position: PositionDialog = "start",
    hideIcon = false,
    loading$ = of(false),
  ) {

    const modal = this.modal.open(AlertDialogComponent, { size: 'md', backdrop: false, });
    modal.componentInstance.type=type;
    modal.componentInstance.title=title;
    modal.componentInstance.message=message;
    modal.componentInstance.confirmLabel=confirmLabel;
    modal.componentInstance.cancelLabel=cancelLabel;
    modal.componentInstance.position=position;
    modal.componentInstance.hideIcon=hideIcon;

    modal.closed.subscribe((state: boolean)=> this._close$.next(state))
    modal.dismissed.subscribe(()=> this._close$.next(false))

    return this.close.pipe(skip(1));
  }

}
