import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subscription, tap } from 'rxjs';


import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {

  private unsubscriptions$: Subscription[] = <Subscription[]>[];
  public loadingSexesOrientation$: Observable<boolean> = of(false);
  public loadingExpressionsGender$: Observable<boolean> = of(false);
  public loadingSexes$: Observable<boolean> = of(false);
  public loadingGenders$: Observable<boolean> = of(false);
  public loadingGendersIdentity$: Observable<boolean> = of(false);

  public percent = 0; // percentual da barra de progresso

  public countries = [
    { name: 'Brasil', code: 'BR' },
    { name: 'Argentina', code: 'AG' },
    { name: 'Colombia', code: 'CO' },
    { name: 'Uruguai', code: 'UR' },
    { name: 'Paraguai', code: 'PA' },
    { name: 'Venezuela', code: 'VE' },
    { name: 'Peru', code: 'PE' },
    { name: 'Chile', code: 'CH' },
    { name: 'Guiana', code: 'GU' },
    { name: 'Guiana Francesa', code: 'GF' },
    { name: 'Bolívia', code: 'BO' },
    { name: 'Equador', code: 'EQ' },
    { name: 'Suriname', code: 'SU' },
  ];

  public languages = [
    { name: 'Portugues', acronym: 'PT-BR' },
    { name: 'Castelhano Argentino', acronym: 'CA-AG' },
    { name: 'Castelhano Colombiano', acronym: 'CA-CO' },
    { name: 'Castelhano Uruguaiano', acronym: 'CA-UR' },
    { name: 'Espanhol Paraguaio', acronym: 'ES-PA' },
    { name: 'Espanhol Venezuelano', acronym: 'ES-VE' },
    { name: 'Espanhol Peruano', acronym: 'ES-PE' },
    { name: 'Castelhano Chinelo', acronym: 'ES-CH' },
    { name: 'Ingles', acronym: 'EG-GU' },
    { name: 'Frances', acronym: 'FC-GF' },
    { name: 'Espanhol Boliviano', acronym: 'ES-BO' },
    { name: 'Espanhol Equatorianos', acronym: 'ES-EQ' },
    { name: 'Neerlandês', acronym: 'NE-SU' },
  ];

  public timezones = [
    { code: "UTC", name: "Coordinated Universal Time" },
    { code: "GMT", name: "Greenwich Mean Time" },
    { code: "EST", name: "Eastern Standard Time (US & Canada)" },
    { code: "CST", name: "Central Standard Time (US & Canada)" },
    { code: "PST", name: "Pacific Standard Time (US & Canada)" },
    { code: "CET", name: "Central European Time" },
    { code: "EET", name: "Eastern European Time" },
    { code: "JST", name: "Japan Standard Time" },
    { code: "IST", name: "India Standard Time" },
    { code: "AEST", name: "Australian Eastern Standard Time" },
  ];

  public currencies = [
    { code: "USD", name: "United States Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "INR", name: "Indian Rupee" },
  ];

  public sexes: any[] = [];
  public genders: any[] = [];
  public gendersIdentity: any[] = [];
  public sexesOrientation: any[] = [];
  public expressionsGender: any[] = [];

  public form = new FormGroup({
    firstName: new FormControl('', []),
    lastName: new FormControl('', []),
    company: new FormControl('', []),
    contactPhone: new FormControl('', []),
    companySite: new FormControl('', []),
    country: new FormControl('', []),
    language: new FormControl('', []),
    timeZone: new FormControl('', []),
    currency: new FormControl('', []),
    email: new FormControl(true, []),
    telefone: new FormControl(true, []),
    allowMarketing: new FormControl(true, []),
  });

  public formGender = new FormGroup({
    sex: new FormControl(null, []),
    gender: new FormControl(null, []),
    genderIdentity: new FormControl(null, []),
    sexOrientation: new FormControl(null, []),
    expressionGender: new FormControl(null, []),
  })

  // DI - dependance injection
  constructor(private userService: UserService) {
    this.loadingSexesOrientation$ = this.userService.loadingSexesOrientation$;
    this.loadingExpressionsGender$ = this.userService.loadingExpressionsGender$;
    this.loadingSexes$ = this.userService.loadingSexes$;
    this.loadingGenders$ = this.userService.loadingGenders$;
    this.loadingGendersIdentity$ = this.userService.loadingGendersIdentity$;
  }

  ngOnInit() {
    this.changeCountry();
    this.controlProgressBar();
    this.loadListSexOrientation();
    this.loadListExpressionsGender();
    this.loadListSexes();
    this.loadListGenders();
    this.loadListGendersIdentity();
  }

  ngOnDestroy() {
    this.unsubscriptions$.forEach((sb: Subscription)=> sb.unsubscribe());
  }

  private loadListSexOrientation() {
    const subscription = this.userService.listSexesOrientation({})
    .pipe(
      tap((sexesOrientation: any[])=> this.sexesOrientation = sexesOrientation),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListGenders() {
    const subscription = this.userService.listGenders({})
    .pipe(
      tap((genders: any[])=> this.genders = genders),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListGendersIdentity() {
    const subscription = this.userService.listGendersIdentity({})
    .pipe(
      tap((gendersIdentity: any[])=> this.gendersIdentity = gendersIdentity),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListExpressionsGender() {
    const subscription = this.userService.listExpressionsGender({})
    .pipe(
      tap((expressionsGender: any[])=> this.expressionsGender = expressionsGender),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListSexes() {
    const subscription = this.userService.listSexes({})
    .pipe(
      tap((sexes: any[])=> this.sexes = sexes),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  public print() {
    console.log('FIRSTNAME: ', this.form?.value);
  }

  private controlProgressBar() {

    let sexWasFilled = false;
    this.formGender.get('sex')?.valueChanges
    .subscribe((value: any)=> sexWasFilled = this.controlPercent(value, sexWasFilled));

    let genderWasFilled = false;
    this.formGender.get('gender')?.valueChanges
    .subscribe((value: any)=> genderWasFilled = this.controlPercent(value, genderWasFilled));

    let genderIdentityWasFilled = false;
    this.formGender.get('genderIdentity')?.valueChanges
    .subscribe((value: any)=> genderIdentityWasFilled = this.controlPercent(value, genderIdentityWasFilled));

    let sexOrientationIdentityWasFilled = false;
    this.formGender.get('sexOrientation')?.valueChanges
    .subscribe((value: any)=> sexOrientationIdentityWasFilled = this.controlPercent(value, sexOrientationIdentityWasFilled));

    let expressionGenderWasFilled = false;
    this.formGender.get('expressionGender')?.valueChanges
    .subscribe((value: any)=> expressionGenderWasFilled = this.controlPercent(value, expressionGenderWasFilled));

  };

  private controlPercent(value: any, wasFilled: boolean) {
    const step = 20;
    if(!value) {
      this.percent = this.percent - step;
      wasFilled = false;

      if(this.percent < 0) {
        this.percent = 0;
      }
      return wasFilled;
    }

    if(wasFilled === false) {
      wasFilled = true;
      this.percent = this.percent + step;
    }

    return wasFilled;
  }

  // escuta alteraçoes em country
  public changeCountry() {
    this.form.get('currency')?.disable();
    this.form.get('country')?.valueChanges.subscribe((value: string | null) => {
      console.log('COUNTRY: ', value);

      if (!value) {
        return;
      }
      this.form.get('qualqiercoisa')?.enable();
      this.form.get('currency')?.disable();

      if (value === 'BR') {
        this.form.get('currency')?.setValue('BRL');
      }
    });
  }


}
