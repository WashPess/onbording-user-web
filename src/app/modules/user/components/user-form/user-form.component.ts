import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, Observable, of, Subscription, tap } from 'rxjs';

import { ExpressionGender } from '../../models/expression-gender.model';
import { GenderIdentity } from '../../models/gender-identity.model';
import { SexOrientation } from '../../models/sex-orientation.model';
import { Validate } from '../../../shared/utils/validate.form';
import { UserService } from '../../services/user.service';
import { Gender } from '../../models/gender.model';
import { Sex } from '../../models/sex.model';
import { GenderService } from '../../services/gender.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {

  @Output() changeForm = new EventEmitter<FormGroup>();

  private readonly unsubscriptions$: Subscription[] = <Subscription[]>[];
  public loadingSave$ = of(false);

  public get firstName() {
    return this.form.get('firstName');
  }

  public get lastName() {
    return this.form.get('lastName');
  }

  public get email() {
    return this.form.get('email');
  }

  public get document() {
    return this.form.get('document');
  }

  public get nickname() {
    return this.form.get('nickname');
  }

  public get password() {
    return this.form.get('password');
  }

  public get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  public get optin() {
    return this.form.get('optin');
  }

  public form = new FormGroup({
    firstName: new FormControl('Max', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validate.onlyLetters]),
    lastName: new FormControl('Smitch', [Validators.required, Validators.minLength(2),  Validators.maxLength(30), Validate.onlyLetters]),
    email: new FormControl('email@email.com', [Validators.required, Validators.email, Validate.hasDomain]),
    document: new FormControl('09761069000102', [Validators.required, Validators.minLength(11), Validators.maxLength(19), Validate.onlyNumber]),
    nickname: new FormControl('max1024', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    password: new FormControl('Alterar@123', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
    confirmPassword: new FormControl('Alterar@123', [Validators.required, Validate.match('password')]),
    optin: new FormControl(false, [Validate.isTrue]),
  });

  constructor(
    private readonly userService: UserService,
    private readonly toastService: ToastService,
  ) {
    this.loadingSave$ = this.userService.loadingSave$;
  }

  ngOnInit() {
    this.notifyForm();
  }

  ngOnDestroy() {
    this.unsubscriptions$.forEach((sb: Subscription)=> sb.unsubscribe());
  }

  private notifyForm() {
    this.changeForm.emit(this.form);
    this.form.valueChanges.subscribe(()=> this.changeForm.emit(this.form));
  }

  public hasError(item: any): boolean {
    if(!item) {
      return false;
    }

    const keys = Object.keys(item);
    return keys.length > 0;
  }

  public save() {

    this.form.get('optin')?.updateValueAndValidity();
    const control = this.form.get('optin')?.invalid;

    // if(this.userForm.invalid) {
    //   this.notify('danger', 'Formulário inválido');
    //   return;
    // }

    // console.log("SEND: ", this.userForm.invalid, control);

    // return

    const user = this.form.value;
    console.log("SAVE", user, this.form.valid);

    this.form.disable();
    const subscription = this.userService.save(user)
    .pipe(
      finalize(()=> this.form.enable()),
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
    });

    this.unsubscriptions$.push(subscription);
  }

  public reset() {
    this.form.reset();
  }

}

