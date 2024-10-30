import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, Observable, of, Subscription, take, tap } from 'rxjs';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
// import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component'; // Importe o AlertDialogComponent
import { AlertDialogComponent } from '../../../shared/components/alert-dialog/alert-dialog.component';
import { TypeForm, UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  private readonly unsubscriptions$: Subscription[] = <Subscription[]>[];
  public loadingSave$ = of(false);
  public loadingDelete$ = of(true);
  public usersFiltred: User[] = [];
  public users: User[] = [];
  public showUuid: { [uuid: string]: boolean } = {};
  public verificationCodes: { [uuid: string]: number } = {};

  public form = new FormGroup({
    search: new FormControl(null, [])
  });

  constructor(
    private readonly modal: NgbModal,
    private readonly userService: UserService,
    private readonly toastService: ToastService,
  ) {
    this.loadingSave$ = this.userService.loadingSave$;
    this.loadingDelete$ = this.userService.loadingDelete$;
  }

  ngOnInit(): void {
    this.userService.list().subscribe({
      next: (response: any) => {
        this.users = response.data || [];
        this.usersFiltred = this.users;
        this.users.forEach(user => {
          this.showUuid[user.uuid] = false;
          this.verificationCodes[user.uuid] = this.generateVerificationCode();
        });
        this.changeSearch();
      },
      error: (err: any) => {
        this.toastService.error('Erro ao carregar a lista de usuários');
        console.error('Erro ao listar usuários: ', err);
      }
    });
  }

  private deleteUserById$(uuid: string): Observable<any> {
    return this.userService.delete(uuid);
  }

  private generateVerificationCode(): number {
    return Math.floor(1000 + Math.random() * 9000);
  }

  public toggleUuidVisibility(uuid: string): void {
    const code = this.verificationCodes[uuid];
    const userInput = prompt(`Para visualizar o UUID, digite o número: ${code}`);

    if (userInput === String(code)) {
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

  public deleteUser(user: User) {
    const modalRef = this.modal.open(AlertDialogComponent); // Abre o AlertDialogComponent como modal
    modalRef.componentInstance.title = 'Deletar Usuário';
    modalRef.componentInstance.message = `Tem certeza que deseja deletar o usuário ${user.firstName}?`;
    modalRef.componentInstance.cancelLabel = 'Cancelar';
    modalRef.componentInstance.confirmLabel = 'Deletar';
    modalRef.componentInstance.selectedUserName = user.firstName; // Passa o nome do usuário

    modalRef.closed
      .pipe(
        take(1),
        filter((state: any) => state),
        tap(() => this.deleteUserById$(user.uuid).subscribe({
          next: () => {
            this.toastService.success(`Usuário ${user.firstName} deletado com sucesso!`);
            this.users = this.users.filter(u => u.uuid !== user.uuid);
            this.usersFiltred = this.users;
          },
          error: () => {
            this.toastService.error(`Erro ao deletar o usuário ${user.firstName}.`);
          }
        }))
      ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscriptions$.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
