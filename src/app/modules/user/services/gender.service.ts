import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, finalize, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ExpressionsGenderMock } from './mock/expressions-gender.mock';
import { SexesOrientationMock } from './mock/sexes-orientation.mock';
import { ExpressionGender } from '../models/expression-gender.model';
import { GendersIdentityMock } from './mock/genders-identity.mock';
import { SexOrientation } from '../models/sex-orientation.model';
import { GenderIdentity } from '../models/gender-identity.model';
import { LanguagesMock } from './mock/languages.mock';
import { Language } from '../models/language.model';
import { GendersMock } from './mock/genders.mock';
import { Gender } from '../models/gender.model';
import { SexesMock } from './mock/sexes.mock';
import { Sex } from '../models/sex.model';
@Injectable({
  providedIn: 'root',
})
export class GenderService {

  private endpointV1 = 'http://127.0.0.1:9090';

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

  private _loadingLanguages = new BehaviorSubject<boolean>(false);
  public get loadingLanguages$(): Observable<boolean> {
    return this._loadingLanguages.asObservable();
  }

  constructor(private http: HttpClient) { }

  listSexes(query: any): Observable<Sex[]> {

    const uri = `/sexes`;
    this._loadingSexes.next(true);
    return of(SexesMock).pipe(delay(4000))
    .pipe(
      map((response: any[])=> <Sex[]> response),
      finalize(()=> this._loadingSexes.next(false)),
    );

  }

  listGenders(query: any): Observable<Gender[]> {

    const uri = `/genders`;
    this._loadingGenders.next(true);
    return of(GendersMock).pipe(delay(4000))
    .pipe(
      map((response: any[])=> <Gender[]> response),
      finalize(()=> this._loadingGenders.next(false)),
    );

  }

  listGendersIdentity(query: any): Observable<GenderIdentity[]> {

    const uri = `/genders`;
    this._loadingGendersIdentity.next(true);
    return of(GendersIdentityMock).pipe(delay(4000))
    .pipe(
      map((response: any[])=> <GenderIdentity[]> response),
      finalize(()=> this._loadingGendersIdentity.next(false)),
    );

  }

  listSexesOrientation(query: any): Observable<SexOrientation[]> {

    const uri = `/sexorientarion`;
    this._loadingSexesOrientation.next(true);
    return of(SexesOrientationMock).pipe(delay(4000))
    .pipe(
      map((response: any[])=> <SexOrientation[]> response),
      finalize(()=> this._loadingSexesOrientation.next(false)),
    );

  }

  listExpressionsGender(query: any): Observable<ExpressionGender[]> {

    const uri = `/expressiongender`;
    this._loadingExpressionsGender.next(true);
    return of(ExpressionsGenderMock).pipe(delay(4000))
    .pipe(
      map((response: any[])=> <ExpressionGender[]> response),
      finalize(()=> this._loadingExpressionsGender.next(false)),
    );

  }

  listLanguages(query: any): Observable<Language[]> {
    const uri = `/languages`;
    this._loadingLanguages.next(true);
    return of(LanguagesMock).pipe(delay(2000))
    .pipe(
      map((response: any[])=> <Language[]>response),
      finalize(()=> this._loadingLanguages.next(false)),
    );
  }

}
