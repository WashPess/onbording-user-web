import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { debounceTime, distinctUntilChanged, filter, Observable, of, Subscription, switchMap, tap } from "rxjs";

import { ToastService } from "../../../shared/components/toast/toast.service";
import { Enterprise } from "../../models/enterprise.model";
import { EnterpriseService } from "../../services/enterprise.service";
import { EnterpriseFormComponent, TypeForm } from "../enterprise-form/enterprise-form.component";

@Component({
  selector: 'app-enterprise-list',
  templateUrl: './enterprise-list.component.html',
  styleUrls: ['./enterprise-list.component.scss']
})
export class EnterpriseListComponent implements OnInit, OnDestroy {

  private readonly unsubscriptions$: Subscription[] = <Subscription[]>[];
  public loadingSave$ = of(false);
  public loadingDelete$ = of(true);
  public enterprisesFiltred: Enterprise[] = [];
  public enterprises: Enterprise[] = [];
  public showUuid: { [uuid: string]: boolean } = {};
  public verificationCodes: { [uuid: string]: number } = {};

  public form = new FormGroup({
    search: new FormControl(null, [])
  });

  constructor(
    private readonly modal: NgbModal,
    private readonly enterpriseService: EnterpriseService,
    private readonly toastService: ToastService,
  ) {
    this.loadingSave$ = this.enterpriseService.loadingSave$;
    this.loadingDelete$ = this.enterpriseService.loadingDelete$;
  }

  ngOnInit(): void {
    this.loadEnterprises();
    this.changeSearch();
  }

  ngOnDestroy() {
    this.unsubscriptions$.forEach((sub: Subscription) => sub.unsubscribe());
  }

  private loadEnterprises() {
     const subscription = this.loadEnterprises$().subscribe({
      error: (err: Error) => this.toastService.error(`Erro ao carregar a lista de EMPRESAS. ${err.message}`),
    });
    this.unsubscriptions$.push(subscription);
  }

  private loadEnterprises$(): Observable<any> {
    return this.enterpriseService.list()
    .pipe(
      tap((enterprises: any[])=> this.enterprises = enterprises),
      tap((enterprises: any[])=> this.enterprisesFiltred = enterprises),
      tap(()=> this.digest()),
    );
 }

  private deleteEnterpriseById$(uuid: string): Observable<any> {
    return this.enterpriseService.delete(uuid);
  }

  private generateVerificationCode(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

  public toggleUuidVisibility(uuid: string): void {
    const code = this.verificationCodes[uuid];
    const enterpriseInput = prompt(`Para visualizar o UUID, digite o número: ${code}`);

    if (enterpriseInput === String(code)) {
      this.showUuid[uuid] = !this.showUuid[uuid];
      this.verificationCodes[uuid] = this.generateVerificationCode();
    } else {
      this.toastService.error('Código incorreto. Não foi possível exibir o UUID.');
    }
  }

  private changeSearch() {
    this.initFilter();
    this.form.get('search')?.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap((term: any) => !term ? this.filterEnterprises('', this.enterprises) : ''),
        filter((value: any) => value),
        filter((value: any) => String(value).length >= 3),
        tap((term: string) => this.filterEnterprises(term, this.enterprises)),
      ).subscribe();
  }

  private initFilter() {
    const term: string = this.form.get('search')?.value ?? '';
    this.enterprisesFiltred = this.filterEnterprises(term, this.enterprises);
  }

  private filterEnterprises(term: string, enterprises: any[]): any[] {
    if (!term) {
      this.enterprisesFiltred = enterprises;
      return this.enterprisesFiltred;
    }

    term = String(term).toLowerCase().trim();
    this.enterprisesFiltred = enterprises.filter((enterprise: any) =>
      JSON.stringify(enterprise).toLowerCase().includes(term)
    );
    return this.enterprisesFiltred;
  }

  public openEnterpriseForm(enterprise: Enterprise | null, mode: TypeForm = 'create') {
    const modal = this.modal.open(EnterpriseFormComponent, { size: 'xl' });
    modal.componentInstance.mode = mode;
    modal.componentInstance.enterprise = enterprise || {};
    modal.closed.pipe(switchMap(()=> this.loadEnterprises$())).subscribe();
  }

  public deleteEnterprise(enterprise: Enterprise) {
    this.toastService.dialog(
      "danger",
      "Deletar Usuário",
      `Tem certeza que deseja deletar o usuário <b></b>?`,
      "Sim",
      "Cancelar",
    ).pipe(
      filter((state: any)=> state),
      switchMap(()=> this.deleteEnterpriseById$(enterprise.uuid)),
      switchMap(()=> this.loadEnterprises$()),
    ).subscribe({
      next: ()=> this.toastService.success(`Usuário deletado com sucesso.`),
      error: (err: Error)=> this.toastService.error(`Erro ao deletar o usuário. ${err.message}`),
    })
  }

  private digest() {
    this.enterprises.forEach(enterprise => {
      this.showUuid[enterprise.uuid] = false;
      this.verificationCodes[enterprise.uuid] = this.generateVerificationCode();
    });
  }

}
