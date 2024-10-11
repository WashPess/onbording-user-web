import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, finalize, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private endpointV1 = 'http://127.0.0.1:9090';

  private _loadingSave = new BehaviorSubject<boolean>(false);
  public get loadingSave$(): Observable<boolean> {
    return this._loadingSave.asObservable();
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


}
