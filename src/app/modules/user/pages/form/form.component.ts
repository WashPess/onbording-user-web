import { Component, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { of, Subscription } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";


@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnDestroy {

  private unsubscribe$: Subscription[] = <Subscription[]>[];

  public loadingSave$ = of(false);
  public message = '';

  public get isVisibleError(): boolean {
    return String(this.message).length > 0;
  }

  public userForm = new FormGroup({});

  constructor(private userService: UserService) {
    this.loadingSave$ = this.userService.loadingSave$;
  }

  ngOnDestroy() {
    this.unsubscribe$.forEach((s: Subscription)=> s.unsubscribe());
  }

  public changesUserForm(userForm: FormGroup) {
    this.userForm = userForm;
  }

  public save() {

    if(this.userForm.invalid) {
      return;
    }

    const user = this.userForm.value;

    const subscription = this.userService.save(user)
    .subscribe({
      next: (a: any)=> console.log("SUCESSO: ", a),
      error: (err: HttpErrorResponse)=> {
        const { error : { message } } = err;
        this.message = message;
        console.log("ERROR: ", message, err);
      },
    });

    this.unsubscribe$.push(subscription);

    console.log("SAVE", this.userForm.valid);
  }

  public reset() {
    this.userForm.reset();
  }

  private hideToast() {

  }

}
