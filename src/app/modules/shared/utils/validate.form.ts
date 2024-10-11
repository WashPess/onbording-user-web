import { AbstractControl, ValidationErrors } from "@angular/forms";


export class Validate {

  static readonly DomainReg = /[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  static readonly OnlyNumber = /^\d+$/;
  static readonly OnlyLetters = /^[A-Za-zÀ-ÿ\s]+$/;


  public static match(matchTo: string): (arg0: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {


      const { parent, value } = control;
      const { controls: parentControls, value: parentValue }: any = parent || {};


      if(
        !parent
        || !parentValue
        || !parentControls
        || !(matchTo in parentControls)
        || !('value' in parentControls[matchTo])
        || !value
        || value !== parentControls[matchTo].value
      ) {
        return { match: true };
      }

      return null;
    };
  }

  public static get hasDomain(): (arg0: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if(!Validate.DomainReg.test(value)) {
        return { hasdomain: String(value).includes('@') };
      }
      return null;
    };
  }

  public static get onlyNumber(): (arg0: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;

      if(!Validate.OnlyNumber.test(value)) {
        return { onlynumber: true };
      }
      return null;
    };
  }

  public static get onlyLetters(): (arg0: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value, errors }: any = control;

      const size = value ? String(value).trim().length : 0;
      const sizeErrors = errors && typeof errors == 'object' ?  Object.keys(errors).length : 0;

      if(sizeErrors == 0 && size > 0 && !Validate.OnlyLetters.test(value)) {
        return { onlyletters: true };
      }

      return null;
    };
  }

  public static get isTrue(): (arg0: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      const val = value === true

      if(control?.dirty && !val) {
        return { istrue: true };
      }

      return null;
    };
  }

}
