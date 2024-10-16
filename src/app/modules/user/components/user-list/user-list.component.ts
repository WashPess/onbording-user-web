import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';

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

  ngOnInit(): void {
    this.changeSearch();
  }

  private changeSearch() {
    this.initFilter();
    this.form.get('search')?.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap((term: any)=> !term ? (this.usersFiltred = this.filterUsers('', this.users)) : ''),
      filter((value: any)=> value),
      filter((value: any)=> String(value).length >= 3),
      tap((term: string)=> this.usersFiltred = this.filterUsers(term, this.users)),
      tap((a: any)=> console.log("TAP: ", a)),
    ).subscribe()
  }

  private initFilter() {
    const term: string = this.form.get('search')?.value ?? '';
    this.usersFiltred = this.filterUsers(term, this.users);
  }

  private filterUsers(term: string, users: any[]): any[] {
    if(!term) {
      return users;
    }
    term = String(term).toLowerCase().trim();
    return users.filter((user: any)=> JSON.stringify(user).toLowerCase().includes(term))
  }

}

