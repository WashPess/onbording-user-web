import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, finalize, map } from "rxjs";
import { Enterprise } from "../models/enterprise.model";

@Injectable({
  providedIn: 'root',
})
export class EnterpriseService {

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

  public save(enterprise: Enterprise): Observable<any> {

    const url = `${this.endpointV1}/enterprise`;
    this._loadingSave.next(true);
    return this.http.post(url, enterprise)
    .pipe(
      finalize(()=> this._loadingSave.next(false)),
    );
  }

  public update(uuid: string, enterprise: Enterprise): Observable<any> {

    const url = `${this.endpointV1}/enterprise/${uuid}`;
    this._loadingSave.next(true);
    return this.http.put(url, enterprise)
    .pipe(
      finalize(()=> this._loadingSave.next(false)),
    );
  }

  public list(): Observable<any[]> {
    const url = `${this.endpointV1}/enterprises`;
    this._loadingSave.next(true);
    return this.http.get(url)
    .pipe(
      map((response: any)=>response.data || []),
      finalize(() => this._loadingSave.next(false)),
    );
  }

  public delete(uuid: string): Observable<any> {

    const url = `${this.endpointV1}/enterprise/${uuid}`;
    this._loadingDelete.next(true);
    return this.http.delete(url)
    .pipe(
      finalize(()=> this._loadingDelete.next(false)),
    );
  }


}
