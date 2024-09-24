import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, finalize, Observable, of } from 'rxjs';

import { SexesOrientationMock } from './mock/sexes-orientation.mock';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private _loadingSexesOrientation = new BehaviorSubject<boolean>(false);
  // public get loadingSexesOrientation() {

  // }

  constructor() { }

  // busca um lista de orientaçao sexual
  listSexesOrientation(query: any): Observable<any[]> {

    const uri = `/sexorientarion`;
    this._loadingSexesOrientation.next(true);
    return of(SexesOrientationMock).pipe(delay(4000))
    .pipe(
      finalize(()=> this._loadingSexesOrientation.next(false))
    );

  }

}
