import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AlertDialogComponent } from "./alert-dialog.component";


@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {

  constructor(
    private readonly modal: NgbModal,
  ) {}


  public openAlertDialog() {

    const modal = this.modal.open(AlertDialogComponent, { size: 'xl' });

    modal.closed.subscribe(()=> {
      console.log("FOI FECHADO")
    })

    modal.dismissed.subscribe(()=> {
      console.log("FOI ABANDONADO")
    })

    console.log("dialogo aberto")
  }


}
