import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, of, Subscription, tap } from 'rxjs';
import { AlertDialogService } from '../../../shared/components/alert-dialog/alert-dialog.service';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { TypeForm, UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  private readonly unsubscriptions$: Subscription[] = <Subscription[]>[];
  public loadingSave$ = of(false);
  public usersFiltred: User[] = [];
  public users: User[] = [];
  public showUuid: { [uuid: string]: boolean } = {}; // Propriedade para controlar a visibilidade do UUID
  public verificationCodes: { [uuid: string]: number } = {}; // Códigos de verificação para cada usuário

  public form = new FormGroup({
    search: new FormControl(null, [])
  });

  constructor(
    private readonly userService: UserService,
    private readonly toastService: ToastService,
    private readonly modal: NgbModal,
    private readonly alertDialogService: AlertDialogService,
  ) {
    this.loadingSave$ = this.userService.loadingSave$;
  }

  ngOnInit(): void {
    this.userService.list().subscribe({
      next: (response: any) => {
        this.users = response.data || [];
        this.usersFiltred = this.users;
        this.users.forEach(user => {
          this.showUuid[user.uuid] = false; // Inicializa todos os UUIDs como ocultos
          this.verificationCodes[user.uuid] = this.generateVerificationCode(); // Gera um código de verificação para cada usuário
        });
        this.changeSearch();
      },
      error: (err: any) => {
        this.toastService.error('Erro ao carregar a lista de usuários');
        console.error('Erro ao listar usuários: ', err);
      }
    });
  }

  // Gera um código de verificação aleatório entre 1000 e 9999
  private generateVerificationCode(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

  // Função para alternar a visibilidade do UUID com verificação
  public toggleUuidVisibility(uuid: string): void {
    const code = this.verificationCodes[uuid];
    const userInput = prompt(`Para visualizar o UUID, digite o número: ${code}`);

    if (userInput === String(code)) {
      this.showUuid[uuid] = !this.showUuid[uuid];
      // Gera um novo código de verificação após exibir o UUID
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
        tap((term: any) => !term ? this.filterUsers('', this.users) : ''),
        filter((value: any) => value),
        filter((value: any) => String(value).length >= 3),
        tap((term: string) => this.filterUsers(term, this.users)),
      ).subscribe();
  }

  private initFilter() {
    const term: string = this.form.get('search')?.value ?? '';
    this.usersFiltred = this.filterUsers(term, this.users);
  }

  private filterUsers(term: string, users: any[]): any[] {
    if (!term) {
      this.usersFiltred = users;
      return this.usersFiltred;
    }

    term = String(term).toLowerCase().trim();
    this.usersFiltred = users.filter((user: any) =>
      JSON.stringify(user).toLowerCase().includes(term)
    );
    return this.usersFiltred;
  }

  public openUserForm(user: User | null, mode: TypeForm = 'create') {
    const modal = this.modal.open(UserFormComponent, { size: 'xl' });
    modal.componentInstance.mode = mode;
    modal.componentInstance.user = user || {};

    modal.closed.subscribe(() => {
      console.log("Modal foi fechado");
    });

    modal.dismissed.subscribe(() => {
      console.log("Modal foi abandonado");
    });

    console.log("Formulário de usuário aberto");
  }

  public deleteUser() {
    this.alertDialogService.openAlertDialog(
      'danger',
      'Deletar Usuário',
      'Tem certeza que deseja deletar o Usuário?',
      'Deletar',
      'Cancelar',
      'center',
      false
    ).subscribe((state: boolean) => {
    });
  }

  ngOnDestroy() {
    this.unsubscriptions$.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
