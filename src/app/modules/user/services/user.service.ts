

import { Injectable } from '@angular/core';
import { concatAll, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() { }

  getSexOrientation(): Observable<any> {
    const sexOrientation = [
      { code: "heterossexual", name: "Heterossexual"},
      { code: "homossexual", name: "Homossexual"},
      { code: "pansexual", name: "Pansexual"},
      { code: "assexual", name: "Assexual"},
      { code: "bissexual", name: "Bissexual"},
      { code: "intersexual", name: "Intersexual"},
      { code: "NA", name: "Nenhuma das Alternativas" },
    ];

    return of(sexOrientation);

  }

}
function caoncatAll(w: Observable<number[]>): import("rxjs").OperatorFunction<{ code: string; name: string; }[], any[]> {
  throw new Error('Function not implemented.');
}

