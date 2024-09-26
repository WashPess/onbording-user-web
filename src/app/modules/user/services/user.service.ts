import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, finalize, Observable, of } from 'rxjs';

import { SexesOrientationMock } from './mock/sexes-orientation.mock';
import { SexesMock } from './mock/sexes.mock';
import { ExpressionsGenderMock } from './mock/expressions-gender.mock';
import { GendersMock } from './mock/genders.mock';
import { GendersIdentityMock } from './mock/genders-identity.mock';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _loadingSexes = new BehaviorSubject<boolean>(false);
  public get loadingSexes$(): Observable<boolean> {
    return this._loadingSexes.asObservable();
  }

  private _loadingGenders = new BehaviorSubject<boolean>(false);
  public get loadingGenders$(): Observable<boolean> {
    return this._loadingGenders.asObservable();
  }

  private _loadingGendersIdentity = new BehaviorSubject<boolean>(false);
  public get loadingGendersIdentity$(): Observable<boolean> {
    return this._loadingGendersIdentity.asObservable();
  }

  private _loadingSexesOrientation = new BehaviorSubject<boolean>(false);
  public get loadingSexesOrientation$(): Observable<boolean> {
    return this._loadingSexesOrientation.asObservable();
  }

  private _loadingExpressionsGender = new BehaviorSubject<boolean>(false);
  public get loadingExpressionsGender$(): Observable<boolean> {
    return this._loadingExpressionsGender.asObservable();
  }


  constructor() { }

  // busca um lista de orientaçao sexual

  listSexes(query: any): Observable<any[]> {

    const uri = `/sexes`;
    this._loadingSexes.next(true);
    return of(SexesMock).pipe(delay(4000))
    .pipe(
      finalize(()=> this._loadingSexes.next(false)),
    );

  }

  listGenders(query: any): Observable<any[]> {

    const uri = `/genders`;
    this._loadingGenders.next(true);
    return of(GendersMock).pipe(delay(4000))
    .pipe(
      finalize(()=> this._loadingGenders.next(false)),
    );

  }

  listGendersIdentity(query: any): Observable<any[]> {

    const uri = `/genders`;
    this._loadingGendersIdentity.next(true);
    return of(GendersIdentityMock).pipe(delay(4000))
    .pipe(
      finalize(()=> this._loadingGendersIdentity.next(false)),
    );

  }

  listSexesOrientation(query: any): Observable<any[]> {

    const uri = `/sexorientarion`;
    this._loadingSexesOrientation.next(true);
    return of(SexesOrientationMock).pipe(delay(4000))
    .pipe(
      finalize(()=> this._loadingSexesOrientation.next(false)),
    );

  }

  listExpressionsGender(query: any): Observable<any[]> {

    const uri = `/expressiongender`;
    this._loadingExpressionsGender.next(true);
    return of(ExpressionsGenderMock).pipe(delay(4000))
    .pipe(
      finalize(()=> this._loadingExpressionsGender.next(false)),
    );

  }



}
