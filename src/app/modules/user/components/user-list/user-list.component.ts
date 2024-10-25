import { Component, OnInit } from '@angular/core';
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
export class UserListComponent implements OnInit {

  private readonly unsubscriptions$: Subscription[] = <Subscription[]>[];
  public loadingSave$ = of(false);
  public usersFiltred: User[] = [];
  public users: User[] = [];

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
        console.log('Usuários recebidos: ', this.users);
        this.usersFiltred = this.users;
        this.changeSearch();
      },
      error: (err: any) => {
        this.toastService.error('Erro ao carregar a lista de usuários');
        console.error('Erro ao listar usuários: ', err);
      }
    });
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
