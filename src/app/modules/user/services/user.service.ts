import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly endpointV1 = 'http://127.0.0.1:9090';

  private readonly _loadingSave = new BehaviorSubject<boolean>(false);
  public get loadingSave$(): Observable<boolean> {
    return this._loadingSave.asObservable();
  }

  private readonly _loadingDelete = new BehaviorSubject<boolean>(false);
  public get loadingDelete$(): Observable<boolean> {
    return this._loadingDelete.asObservable();
  }

  constructor(private readonly http: HttpClient) { }

  public save(user: User): Observable<any> {

    const url = `${this.endpointV1}/user`;
    this._loadingSave.next(true);
    return this.http.post(url, user)
    .pipe(
      finalize(()=> this._loadingSave.next(false)),
    );
  }

  public update(uuid: string, user: User): Observable<any> {

    const url = `${this.endpointV1}/user/${uuid}`;
    this._loadingSave.next(true);
    return this.http.put(url, user)
    .pipe(
      finalize(()=> this._loadingSave.next(false)),
    );
  }

  public list(): Observable<any> {
    const url = `${this.endpointV1}/users`;
    this._loadingSave.next(true);
    return this.http.get(url)
    .pipe(
      finalize(() => this._loadingSave.next(false)),
    );
  }

  public delete(uuid: string): Observable<any> {

    const url = `${this.endpointV1}/user/${uuid}`;
    this._loadingDelete.next(true);
    return this.http.delete(url)
    .pipe(
      finalize(()=> this._loadingDelete.next(false)),
    );
  }


}
