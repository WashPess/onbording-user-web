import { AbstractControl, ValidationErrors } from "@angular/forms";


export class Validate {

  public static matchValues(matchTo: string): (arg0: AbstractControl) => ValidationErrors | null {
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
        return { isMatching: false };
      }

      return null;
    };
  }
}
