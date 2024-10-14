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

  public loadingSave$ = of(false);
  public message = '';

  public get isVisibleError(): boolean {
    return String(this.message).length > 0;
  }

  public userForm = new FormGroup({});

  constructor(private readonly userService: UserService, private readonly toastService: ToastService) {
    this.loadingSave$ = this.userService.loadingSave$;

    this.toastService.error("ERRO de teste")
  }

  ngOnDestroy() {
    this.unsubscribe$.forEach((s: Subscription)=> s.unsubscribe());
  }

  public changesUserForm(userForm: FormGroup) {
    this.userForm = userForm;
  }

  public save() {

    this.userForm.get('optin')?.updateValueAndValidity();
    const control = this.userForm.get('optin')?.invalid;

    // if(this.userForm.invalid) {
    //   this.notify('danger', 'Formulário inválido');
    //   return;
    // }

    // console.log("SEND: ", this.userForm.invalid, control);

    // return

    const user = this.userForm.value;
    console.log("SAVE", user, this.userForm.valid);

    this.userForm.disable();
    const subscription = this.userService.save(user)
    .pipe(
      finalize(()=> this.userForm.enable()),
    ).subscribe({
      next: (a: any)=> {
        console.log("SAVED: ", a);
        this.toastService.success("Usuário salvo com sucesso");
      },
      error: (err: HttpErrorResponse)=> {
        const { error : { message } } = err;
        this.toastService.error("Erro ao tentar salvar usuário");
        console.log("ERROR: ", err);
      },
      complete: ()=> this.message = '',
    });

    this.unsubscribe$.push(subscription);
  }

  public reset() {
    this.userForm.reset();
  }



}
