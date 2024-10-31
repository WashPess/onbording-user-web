import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize, of, Subscription, tap } from 'rxjs';

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
    this.defineValidators();
  }

  @Output() changeForm = new EventEmitter<FormGroup>();


  private readonly unsubscriptions$: Subscription[] = <Subscription[]>[];
  public loadingSave$ = of(false);

  public modeLocal: TypeForm = 'create'

  private readonly validatorsPassword = [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)];
  private readonly validatorsConfirmPassword = [Validators.required, Validate.match('password')];
  private readonly validatorsOptin = [Validate.isTrue];

  public get isModeEdit(): boolean {
    return this.modeLocal == 'edit';
  }

  public get isModeCreate(): boolean {
    return this.modeLocal == 'create';
  }

  private get hasUser(): boolean {
    return Object.keys(this.user).length > 0;
  }

  // Métodos para acessar campos individuais do formulário
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
    uuid: new FormControl(''),
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validate.onlyLetters]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validate.onlyLetters]),
    nickname: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email, Validate.hasDomain]),
    document: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(19), Validate.onlyNumber]),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    optin: new FormControl(false),
  });

  constructor(
    private readonly userService: UserService,
    private readonly toastService: ToastService,
    private readonly activeModal: NgbActiveModal,
  ) {
    this.loadingSave$ = this.userService.loadingSave$;
  }

  ngOnInit() {
    this.changesForm();
    this.setUser();
  }

  ngOnDestroy() {
    this.unsubscriptions$.forEach((sb: Subscription) => sb.unsubscribe());
  }

  private setUser() {
    this.form.patchValue(this.user);
    if (this.isModeEdit) {
      this.form.get("document")?.disable();
    }

    if (this.hasUser) {
      this.defineValidators();
    }
  }

  private changesForm() {
    this.changeForm.emit(this.form);
    this.form.valueChanges.subscribe(() => this.changeForm.emit(this.form));
  }

  public hasError(item: any): boolean {
    if (!item?.touched && !item?.dirty) {
      return false;
    }

    const errors = item?.errors || {};
    const keys = Object.keys(errors);
    return keys.length > 0;
  }

  public save() {

    if (this.isModeCreate) {
      this.form.get('optin')?.updateValueAndValidity();
    }

    if (this.form.invalid) {
      this.toastService.warning("O Formulário precisa ser preenchido corretamente.")
      return;
    }

    const user: User = this.form.value as User;
    this.form.disable();

    if (this.isModeEdit) {
      const { uuid }: any = user;
      const subscription = this.userService.update(uuid, user)
        .pipe(
          tap(()=> this.close()),
          finalize(() => this.form.enable()),
        ).subscribe({
          next: () => this.toastService.success("Usuário atualizado com sucesso"),
          error: (err: HttpErrorResponse) => {
            const { error: { message } } = err;
            this.toastService.error(`Erro ao tentar atualizar o usuário. ${message}`);
          },
        });

      this.unsubscriptions$.push(subscription);
      return;
    }

    const subscription = this.userService.save(user)
      .pipe(
        tap(()=> this.close()),
        finalize(() => this.form.enable()),
      ).subscribe({
        next: () => this.toastService.success("Usuário salvo com sucesso"),
        error: (err: HttpErrorResponse) => {
          const { error: { message } } = err;
          this.toastService.error(`Erro ao tentar atualizar o usuário. ${message}`);
        },
      });

    this.unsubscriptions$.push(subscription);
  }

  public reset() {
    this.form.reset();
    this.activeModal.close();
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
    if (this.isModeCreate) {
      this.addValidators()
    } else {
      this.removeValidators()
    }
  }

  private close() {
    this.activeModal.close(this.form.value);
  }
}
