import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription, finalize, of, tap } from "rxjs";

import { HttpErrorResponse } from "@angular/common/http";
import { ToastService } from "../../../shared/components/toast/toast.service";
import { Enterprise } from "../../models/enterprise.model";
import { EnterpriseService } from "../../services/enterprise.service";

export type TypeForm = 'create' | 'edit'

@Component({
  selector: 'app-enterprise-form',
  templateUrl: './enterprise-form.component.html',
  styleUrls: ['./enterprise-form.component.scss'],
})
export class EnterpriseFormComponent implements OnInit, OnDestroy {

  @Input() enterprise: Enterprise = <Enterprise>{};

  @Input() set mode(mode: TypeForm) {
    this.modeLocal = mode;
    this.defineValidators();
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

  private get hasEnterprise(): boolean {
    return Object.keys(this.enterprise).length > 0;
  }

  // Métodos para acessar campos individuais do formulário
  public get company() {
    return this.form.get('company');
  }

  public get timezone() {
    return this.form.get('timezone');
  }

  public get address() {
    return this.form.get('address');
  }

  public get cnpj() {
    return this.form.get('cnpj');
  }

  public get corporateReason() {
    return this.form.get('corporateReason');
  }

  public get optin() {
    return this.form.get('optin');
  }

  public form = new FormGroup({
    uuid: new FormControl(''),
    company: new FormControl(''),
    timezone: new FormControl(''),
    address: new FormControl(''),
    cnpj: new FormControl(''),
    corporateReason: new FormControl(''),
    optin: new FormControl(false),
  });

  constructor(
    private readonly enterpriseService: EnterpriseService,
    private readonly toastService: ToastService,
    private readonly activeModal: NgbActiveModal,
  ) {
    this.loadingSave$ = this.enterpriseService.loadingSave$;
  }

  ngOnInit() {
    console.log('MODE', this.modeLocal)
    this.changesForm();
    this.setEnterprise();
  }

  ngOnDestroy() {
    this.unsubscriptions$.forEach((sb: Subscription) => sb.unsubscribe());
  }

  private setEnterprise() {
    this.form.patchValue(this.enterprise);
    if (this.isModeEdit) {
      this.form.get("document")?.disable();
    }

    if (this.hasEnterprise) {
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

    const enterprise: Enterprise = this.form.value as Enterprise;
    this.form.disable();

    if (this.isModeEdit) {
      const { uuid }: any = enterprise;
      const subscription = this.enterpriseService.update(uuid, enterprise)
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

    const subscription = this.enterpriseService.save(enterprise)
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

  private removeValidators() {
    this.form.get('password')?.clearValidators();
    this.form.get('confirmPassword')?.clearValidators();
    this.form.get('optin')?.clearValidators();
  }

  private defineValidators() {
    if (this.isModeCreate) {
      this.removeValidators()
    }
  }

  private close() {
    this.activeModal.close(this.form.value);
  }
}
