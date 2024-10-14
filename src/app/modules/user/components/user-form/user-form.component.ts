import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, Subscription, tap } from 'rxjs';

import { ExpressionGender } from '../../models/expression-gender.model';
import { GenderIdentity } from '../../models/gender-identity.model';
import { SexOrientation } from '../../models/sex-orientation.model';
import { Validate } from '../../../shared/utils/validate.form';
import { UserService } from '../../services/user.service';
import { Gender } from '../../models/gender.model';
import { Sex } from '../../models/sex.model';
import { GenderService } from '../../services/gender.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {

  @Output() changeForm = new EventEmitter<FormGroup>();

  private readonly unsubscriptions$: Subscription[] = <Subscription[]>[];

  public loadingExpressionsGender$: Observable<boolean> = of(false);
  public loadingSexesOrientation$: Observable<boolean> = of(false);
  public loadingGendersIdentity$: Observable<boolean> = of(false);
  public loadingGenders$: Observable<boolean> = of(false);
  public loadingSexes$: Observable<boolean> = of(false);

  public percent = 0; // percentual da barra de progresso
  public sexes: Sex[] = <Sex[]>[];
  public genders: Gender[] = <Gender[]>[];
  public gendersIdentity: GenderIdentity[] = <GenderIdentity[]>[];
  public sexesOrientation: SexOrientation[] = <SexOrientation[]>[];
  public expressionsGender: ExpressionGender[] = <ExpressionGender[]>[];

  public get firstName() {
    return this.form.get('firstName');
  }

  public get lastName() {
    return this.form.get('lastName');
  }

  public get email() {
    return this.form.get('email');
  }

  public get document() {
    return this.form.get('document');
  }

  public get nickname() {
    return this.form.get('nickname');
  }

  public get password() {
    return this.form.get('password');
  }

  public get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  public get optin() {
    return this.form.get('optin');
  }

  public form = new FormGroup({
    firstName: new FormControl('Max', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validate.onlyLetters]),
    lastName: new FormControl('Smitch', [Validators.required, Validators.minLength(2),  Validators.maxLength(30), Validate.onlyLetters]),
    email: new FormControl('email@email.com', [Validators.required, Validators.email, Validate.hasDomain]),
    document: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(19), Validate.onlyNumber]),
    nickname: new FormControl('max1024', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    password: new FormControl('Alterar@123', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)]),
    confirmPassword: new FormControl('Alterar@123', [Validators.required, Validate.match('password')]),
    optin: new FormControl(false, [Validate.isTrue]),
  });

  public formGender = new FormGroup({
    sex: new FormControl(null, []),
    gender: new FormControl(null, []),
    genderIdentity: new FormControl(null, []),
    sexOrientation: new FormControl(null, []),
    expressionGender: new FormControl(null, []),
  })

  // DI - dependance injection
  constructor(private readonly userService: UserService, private readonly genderService: GenderService) {
    this.loadingExpressionsGender$ = this.genderService.loadingExpressionsGender$;
    this.loadingSexesOrientation$ = this.genderService.loadingSexesOrientation$;
    this.loadingGendersIdentity$ = this.genderService.loadingGendersIdentity$;
    this.loadingGenders$ = this.genderService.loadingGenders$;
    this.loadingSexes$ = this.genderService.loadingSexes$;
  }

  ngOnInit() {
    this.controlProgressBar();
    this.loadListSexOrientation();
    this.loadListExpressionsGender();
    this.loadListSexes();
    this.loadListGenders();
    this.loadListGendersIdentity();
    this.notifyForm();
  }

  ngOnDestroy() {
    this.unsubscriptions$.forEach((sb: Subscription)=> sb.unsubscribe());
  }

  private loadListSexOrientation() {
    const subscription = this.genderService.listSexesOrientation({})
    .pipe(
      tap((sexesOrientation: SexOrientation[])=> this.sexesOrientation = sexesOrientation),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListGenders() {
    const subscription = this.genderService.listGenders({})
    .pipe(
      tap((genders: Gender[])=> this.genders = genders),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListGendersIdentity() {
    const subscription = this.genderService.listGendersIdentity({})
    .pipe(
      tap((gendersIdentity: GenderIdentity[])=> this.gendersIdentity = gendersIdentity),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListExpressionsGender() {
    const subscription = this.genderService.listExpressionsGender({})
    .pipe(
      tap((expressionsGender: ExpressionGender[])=> this.expressionsGender = expressionsGender),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private loadListSexes() {
    const subscription = this.genderService.listSexes({})
    .pipe(
      tap((sexes: Sex[])=> this.sexes = sexes),
    ).subscribe();

    this.unsubscriptions$.push(subscription);
  }

  private notifyForm() {
    this.changeForm.emit(this.form);
    this.form.valueChanges.subscribe(()=> this.changeForm.emit(this.form));
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

  public hasError(item: any): boolean {
    if(!item) {
      return false;
    }

    const keys = Object.keys(item);
    return keys.length > 0;
  }

}

