import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';
import { AlertDialogService } from '../../../shared/components/alert-dialog/alert-dialog.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  public usersFiltred: any[] = [];

  public form = new FormGroup({
    search: new FormControl(null, [])
  })

  public users: any[] = [
    { name: 'qwert A', email: 'qwerta@qwert.com', document: '000.000.00-00' },
    { name: 'qwert B', email: 'qwertb@qwert.com', document: '000.000.00-01' },
    { name: 'qwert C', email: 'qwertc@qwert.com', document: '000.000.00-02' },
    { name: 'qwert D', email: 'qwertd@qwert.com', document: '000.000.00-03' },
    { name: 'qwert E', email: 'qwerte@qwert.com', document: '000.000.00-04' },
    { name: 'qwert F', email: 'qwertf@qwert.com', document: '000.000.00-05' },
  ];

  constructor(
    private readonly modal: NgbModal,
    private readonly alertDialogService: AlertDialogService,
  ) {}

  ngOnInit(): void {
    this.changeSearch();
  }

  private changeSearch() {
    this.initFilter();
    this.form.get('search')?.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap((term: any)=> !term ? this.filterUsers('', this.users) : ''),
      filter((value: any)=> value),
      filter((value: any)=> String(value).length >= 3),
      tap((term: string)=> this.filterUsers(term, this.users)),
      tap((a: any)=> console.log("TAP: ", a)),
    ).subscribe()
  }

  private initFilter() {
    const term: string = this.form.get('search')?.value ?? '';
    this.usersFiltred = this.filterUsers(term, this.users);
  }

  private filterUsers(term: string, users: any[]): any[] {
    if(!term) {
      this.usersFiltred = users;
      return this.usersFiltred;
    }

    term = String(term).toLowerCase().trim();
    this.usersFiltred = users.filter((user: any)=> JSON.stringify(user).toLowerCase().includes(term))

    return this.usersFiltred;
  }

  public openUserForm(user: any) {

    const modal = this.modal.open(UserFormComponent, { size: 'xl' });
    modal.componentInstance.mode = "edit"
    modal.componentInstance.user = user;

    modal.closed.subscribe(()=> {
      console.log("FOI FECHADO")
    })

    modal.dismissed.subscribe(()=> {
      console.log("FOI ABANDONADO")
    })

    console.log("formulário aberto")
  }

  public deleteUser() {
    console.log("delete de usuário");
    this.alertDialogService.openAlertDialog(
      'danger',
      'Deletar Usuário',
      'Tem certeza que deseja deletar o Usuário???',
      'Deletar',
      'Cancelar',
      'center',
      false
    ).subscribe((state: boolean)=> {
      console.log("DELETAR USUÀRIO: ", state);
    });
  }

}

