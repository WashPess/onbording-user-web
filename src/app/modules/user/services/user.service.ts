import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, finalize, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { SexesOrientationMock } from './mock/sexes-orientation.mock';
import { SexesMock } from './mock/sexes.mock';
import { GendersMock } from './mock/genders.mock';
import { ExpressionsGenderMock } from './mock/expressions-gender.mock';
import { GendersIdentityMock } from './mock/genders-identity.mock';
import { CountriesMock } from './mock/countries.mock';
import { LanguagesMock } from './mock/languages.mock';
import { TimezonesMock } from './mock/timezones.mock';
import { CurrenciesMock } from './mock/currencies.mock';
import { Country } from '../models/country.model';
import { Language } from '../models/language.model';
import { Timezone } from '../models/timezone.model';
import { Currency } from '../models/currency.model';
import { Sex } from '../models/sex.model';
import { Gender } from '../models/gender.model';
import { GenderIdentity } from '../models/gender-identity.model';
import { SexOrientation } from '../models/sex-orientation.model';
import { ExpressionGender } from '../models/expression-gender.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  private endpointV1 = 'http://127.0.0.1:9090';

  private _loadingSave = new BehaviorSubject<boolean>(false);
  public get loadingSave$(): Observable<boolean> {
    return this._loadingSave.asObservable();
  }

  private _loadingCurrencies = new BehaviorSubject<boolean>(false);
  public get loadingCurrencies$(): Observable<boolean> {
    return this._loadingCurrencies.asObservable();
  }

  private _loadingTimezones = new BehaviorSubject<boolean>(false);
  public get loadingTimezones$(): Observable<boolean> {
    return this._loadingTimezones.asObservable();
  }

  private _loadingCountries = new BehaviorSubject<boolean>(false);
  public get loadingCountries$(): Observable<boolean> {
    return this._loadingCountries.asObservable();
  }

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

  public save(user: any): Observable<any> {

    const url = `${this.endpointV1}/user`;
    this._loadingSave.next(true);
    // return of({}).pipe(delay(5000))
    return this.http.post(url, user)
    .pipe(
      // catchError((err)=> of(err)),
      finalize(()=> this._loadingSave.next(false)),
    );
  }

  listTimezones(query: any): Observable<Timezone[]> {

    const uri = `/timezones`;
    this._loadingTimezones.next(true);
    return of(TimezonesMock).pipe(delay(4000))
    .pipe(
      map((response: any[])=> <Timezone[]> response),
      finalize(()=> this._loadingTimezones.next(false)),
    );
  }

  listCountries(query: any): Observable<Country[]> {

    const uri = `/countries`;
    this._loadingCountries.next(true);
    return of(CountriesMock).pipe(delay(4000))
    .pipe(
      map((response: any[])=> <Country[]>response),
      finalize(()=> this._loadingCountries.next(false)),
    );

  }

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

  listCurrencies(query: any): Observable<Currency[]> {
    const uri = `/currencies`;
    this._loadingCurrencies.next(true);
    return of(CurrenciesMock).pipe(delay(2000))
    .pipe(
      map((response: any[])=> <Currency[]> response),
      finalize(()=> this._loadingCurrencies.next(false)),
    );
  }


}
