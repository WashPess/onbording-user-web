import { Component, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { finalize, of, Subscription } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastService } from "../../../shared/components/toast/toast.service";


@Component({
	selector: 'app-users-registers',
	templateUrl: './users-registers.component.html',
	styleUrls: ['./users-registers.component.scss']
})
export class UsersRegistersComponent implements OnDestroy {

  private readonly unsubscribe$: Subscription[] = <Subscription[]>[];

  public message = '';

  public get isVisibleError(): boolean {
    return String(this.message).length > 0;
  }

  constructor(private readonly userService: UserService, private readonly toastService: ToastService) {
    this.toastService.error("ERRO de teste")
  }

  ngOnDestroy() {
    this.unsubscribe$.forEach((s: Subscription)=> s.unsubscribe());
  }


}
