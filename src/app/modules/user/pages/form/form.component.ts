import { Component, OnDestroy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { finalize, of, Subscription } from "rxjs";
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
  public type: 'danger' | 'success' = 'danger';
  public observers: any[] = [];

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

    // if(this.userForm.invalid) {
    //   return;
    // }

    const user = this.userForm.value;
    console.log("SAVE", user, this.userForm.valid);

    this.userForm.disable();
    const subscription = this.userService.save(user)
    .pipe(
      finalize(()=> this.userForm.enable()),
    ).subscribe({
      next: (a: any)=> {
        console.log("SAVED: ", a)
        this.notify('success', 'Usuário criado com sucesso');
      },
      error: (err: HttpErrorResponse)=> {
        const { error : { message } } = err;
        this.notify('danger', message);
        console.log("ERROR: ", err);
      },
      complete: ()=> this.message = '',
    });

    this.unsubscribe$.push(subscription);
  }

  public reset() {
    this.userForm.reset();
  }

  private notify(type: 'success' | 'danger', message: string) {
    this.observers.push({ type, message });
  }

  public unnotify(status: boolean, notice: any) {
    if(!status) {
      return;
    }

    this.observers = this.observers.filter((o: any)=> o !== notice);
  }

}
