import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Observable, of, Subscription, tap } from "rxjs";
import { Sex } from "../../models/sex.model";
import { Gender } from "../../models/gender.model";
import { GenderIdentity } from "../../models/gender-identity.model";
import { SexOrientation } from "../../models/sex-orientation.model";
import { ExpressionGender } from "../../models/expression-gender.model";
import { ToastService } from "../../../shared/components/toast/toast.service";
import { GenderService } from "../../services/gender.service";

@Component({
  selector: 'app-gender-form',
  templateUrl: './gender-form.component.html',
  styleUrls: ['./gender-form.component.scss']
})

export class GenderFormComponent implements OnInit, OnDestroy {

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

  public formGender = new FormGroup({
    sex: new FormControl(null, []),
    gender: new FormControl(null, []),
    genderIdentity: new FormControl(null, []),
    sexOrientation: new FormControl(null, []),
    expressionGender: new FormControl(null, []),
  })

  constructor(
    private readonly toastService: ToastService,
    private readonly genderService: GenderService,
  ) {
    this.loadingExpressionsGender$ = this.genderService.loadingExpressionsGender$;
    this.loadingSexesOrientation$ = this.genderService.loadingSexesOrientation$;
    this.loadingGendersIdentity$ = this.genderService.loadingGendersIdentity$;
    this.loadingGenders$ = this.genderService.loadingGenders$;
    this.loadingSexes$ = this.genderService.loadingSexes$;
  }

  ngOnInit() {
    this.controlProgressBar();
    this.loadListSexOrientation();
    this.loadListGenders();
    this.loadListGendersIdentity();
    this.loadListExpressionsGender();
    this.loadListSexes();
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
}
