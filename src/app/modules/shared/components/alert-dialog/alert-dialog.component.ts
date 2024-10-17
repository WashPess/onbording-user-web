import { Component } from "@angular/core";

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['alert-dialog.component.scss']
})
export class AlertDialogComponent {

  public title = `Deletar Usuário <span class="text-warning">10</span>`
  public message = `Tem certeza que deseja deletar o usuário <span class="text-danger">Lucas</span>?`
  public cancelLabel = "Cancelar"
  public confirmLabel = "Deletar"

  public close() {

  }

}
