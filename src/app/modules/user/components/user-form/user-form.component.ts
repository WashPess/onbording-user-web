import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, of, Subscription } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { Validate } from '../../../shared/utils/validate.form';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';


export type TypeForm = 'create' | 'edit'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {

  @Input() user: User = <User>{};

  @Input() set mode(mode: TypeForm) {
    this.modeLocal = mode;
    // this.defineValidators();
  }

  @Output() changeForm = new EventEmitter<FormGroup>();

  private readonly unsubscriptions$: Subscription[] = <Subscription[]>[];
  public loadingSave$ = of(false);

  public modeLocal: TypeForm = 'create'

  public get isModeEdit(): boolean {
    return this.modeLocal == 'edit';
  }

  public get isModeCreate(): boolean {
    return this.modeLocal == 'create';
  }

  private get hasUser(): boolean {
    return Object.keys(this.user).length > 0;
  }

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

  private readonly validatorsPassword = [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)];
  private readonly validatorsConfirmPassword = [Validators.required, Validate.match('password')];
  private readonly validatorsOptin = [Validate.isTrue];

  public form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validate.onlyLetters]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2),  Validators.maxLength(30), Validate.onlyLetters]),
    nickname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    email: new FormControl('', [Validators.required, Validators.email, Validate.hasDomain]),
    document: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(19), Validate.onlyNumber]),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    optin: new FormControl(false),
  });

  constructor(
    private readonly userService: UserService,
    private readonly toastService: ToastService,
  ) {
    this.loadingSave$ = this.userService.loadingSave$;
  }

  ngOnInit() {
    this.notifyForm();
    this.form.patchValue(this.user);
    if(this.hasUser) {
      this.defineValidators();
    }
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

  private addValidators() {
    this.form.get('password')?.addValidators(this.validatorsPassword);
    this.form.get('confirmPassword')?.addValidators(this.validatorsConfirmPassword);
    this.form.get('optin')?.addValidators(this.validatorsOptin);
  }

  private removeValidators() {
    this.form.get('password')?.clearValidators();
    this.form.get('confirmPassword')?.clearValidators();
    this.form.get('optin')?.clearValidators();
  }

  private defineValidators() {
    if(this.isModeCreate) {
      this.addValidators()
    } else {
      this.removeValidators()
    }
  }



}

