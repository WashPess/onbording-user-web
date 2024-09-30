import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription, tap } from 'rxjs';


import { UserService } from '../../services/user.service';
import { Country } from '../../models/country.model';
import { Language } from '../../models/language.model';
import { Timezone } from '../../models/timezone.model';
import { Currency } from '../../models/currency.model';
import { Sex } from '../../models/sex.model';
import { Gender } from '../../models/gender.model';
import { GenderIdentity } from '../../models/gender-identity.model';
import { SexOrientation } from '../../models/sex-orientation.model';
import { ExpressionGender } from '../../models/expression-gender.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {

  @Output() changeForm = new EventEmitter<FormGroup>();

  private unsubscriptions$: Subscription[] = <Subscription[]>[];
  public loadingExpressionsGender$: Observable<boolean> = of(false);
  public loadingSexesOrientation$: Observable<boolean> = of(false);
  public loadingGendersIdentity$: Observable<boolean> = of(false);
  public loadingCurrencies$: Observable<boolean> = of(false);
  public loadingCountries$: Observable<boolean> = of(false);
  public loadingLanguages$: Observable<boolean> = of(false);
  public loadingTimezones$: Observable<boolean> = of(false);
  public loadingGenders$: Observable<boolean> = of(false);
  public loadingSexes$: Observable<boolean> = of(false);

  public percent = 0; // percentual da barra de progresso
  public sexes: Sex[] = <Sex[]>[];
  public genders: Gender[] = <Gender[]>[];
  public countries: Country[] = <Country[]>[];
  public languages: Language[] = <Language[]>[];
  public timezones: Timezone[] = <Timezone[]>[];
  public currencies: Currency[] = <Currency[]>[];
  public gendersIdentity: GenderIdentity[] = <GenderIdentity[]>[];
  public sexesOrientation: SexOrientation[] = <SexOrientation[]>[];
  public expressionsGender: ExpressionGender[] = <ExpressionGender[]>[];

  public form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.min(2)]),
    lastName: new FormControl('', [Validators.required, Validators.min(2)]),
    email: new FormControl('', [Validators.required]),
    document: new FormControl('', [Validators.required]),
    nickname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    optin: new FormControl(false, [Validators.required]),
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
    this.loadingCountries$ = this.userService.loadingCountries$;
    this.loadingLanguages$ = this.userService.loadingLanguages$;
    this.loadingTimezones$ = this.userService.loadingTimezones$;
    this.loadingCurrencies$ = this.userService.loadingCurrencies$;
  }

  ngOnInit() {
    this.changeCountry();
    this.controlProgressBar();
    this.loadListSexOrientation();
    this.loadListExpressionsGender();
    this.loadListSexes();
    this.loadListGenders();
    this.loadListGendersIdentity();
    this.loadListCountries();
    this.loadListLanguages();
    this.loadListTimezones();
    this.loadListCurrencies();

    this.form.valueChanges.subscribe(()=>{
      this.changeForm.emit(this.form)
    })
  }

  ngOnDestroy() {
    this.unsubscriptions$.forEach((sb: Subscription)=> sb.unsubscribe());
  }

  public loadListCountries() {
    this.countries = [];
    const subscription = this.userService.listCountries({})
    .pipe(
      tap((countries: Country[])=> this.countries = countries),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListSexOrientation() {
    const subscription = this.userService.listSexesOrientation({})
    .pipe(
      tap((sexesOrientation: SexOrientation[])=> this.sexesOrientation = sexesOrientation),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListGenders() {
    const subscription = this.userService.listGenders({})
    .pipe(
      tap((genders: Gender[])=> this.genders = genders),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListGendersIdentity() {
    const subscription = this.userService.listGendersIdentity({})
    .pipe(
      tap((gendersIdentity: GenderIdentity[])=> this.gendersIdentity = gendersIdentity),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListExpressionsGender() {
    const subscription = this.userService.listExpressionsGender({})
    .pipe(
      tap((expressionsGender: ExpressionGender[])=> this.expressionsGender = expressionsGender),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListSexes() {
    const subscription = this.userService.listSexes({})
    .pipe(
      tap((sexes: Sex[])=> this.sexes = sexes),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListLanguages() {
    this.languages = [];
    const subscription = this.userService.listLanguages({})
    .pipe(
      tap((languages: Language[])=> this.languages = languages),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListTimezones() {
    this.timezones = [];
    const subscription = this.userService.listTimezones({})
    .pipe(
      tap((timezones: Timezone[])=> this.timezones = timezones),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListCurrencies() {
    this.currencies = [];
    const subscription = this.userService.listCurrencies({})
    .pipe(
      tap((currencies: Currency[])=> this.currencies = currencies),
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
    });
  }
}
