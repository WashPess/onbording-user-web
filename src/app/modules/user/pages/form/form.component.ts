import { Component, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { of, Subscription } from "rxjs";


@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnDestroy {

  private unsubscribe$: Subscription[] = <Subscription[]>[];

  public loadingSave$ = of(false);

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
      error: (err: any)=> console.log("ERROR: ", err),
    });

    this.unsubscribe$.push(subscription);

    console.log("SAVE", this.userForm.valid);
  }

  public reset() {
    this.userForm.reset();
  }

}
