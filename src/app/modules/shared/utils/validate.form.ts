import { AbstractControl, ValidationErrors } from "@angular/forms";


export class Validate {

  static DomainReg = /[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  static OnlyNumber = /^\d+$/;

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
