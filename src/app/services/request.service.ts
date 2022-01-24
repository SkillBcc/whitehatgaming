import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Api } from '../enums/api';
import { ApiRequest } from '../interfaces/api-request';
import { KeyValue } from '../interfaces/key-value';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private http: HttpClient
  ) { }

  private _getOptions() {
    const headers = new HttpHeaders({ 
      // 'Authorization': this._getAuthorization()
      'Content-Type': 'text/plain'
    });
    return { headers: headers };
  }

  // TODO
  private _getAuthorization(): string {
    return 'Bearer 0';
  }

  private _getApiVariables(api: Api, variables: KeyValue[] | undefined): string {
    let newApi: string = api.toString();
    if (api.indexOf('{') > -1 && variables) {
      const arrApi = api.split('/');
      newApi = '';
      for (let i = 0; i < arrApi.length; i++) {
        if (arrApi[i][0] === '{' && (arrApi[i][(arrApi[i].length - 1)])) {
          const key = arrApi[i].replace('{', '').replace('}', '');
          for (let x = 0; x < variables.length; x++) {
            if (key === variables[x].key) {
              arrApi[i] = variables[x].value;
              break;
            }
          }
        }
        if (arrApi[i] !== '') {
          newApi += '/' + arrApi[i];
        }
      }
    }
    return newApi;
  }

  public get(
    apiRequest: ApiRequest,
    params: string = ''
  ): Observable<any> {
    const apiAddress = environment.baseUrl + this._getApiVariables(apiRequest.api, apiRequest.variables) + params;
    return this.http.get(apiAddress, this._getOptions());
  }

  public post(
    apiRequest: ApiRequest,
    params: string = '',
    body: any
  ): Observable<any> {
    const apiAddress = environment.baseUrl + this._getApiVariables(apiRequest.api, apiRequest.variables) + params;
    return this.http.post(apiAddress, body, this._getOptions());
  }

  public put(
    apiRequest: ApiRequest,
    params: string = '',
    body: any
  ): Observable<any> {
    const apiAddress = environment.baseUrl + this._getApiVariables(apiRequest.api, apiRequest.variables) + params;
    return this.http.put(apiAddress, body, this._getOptions());
  }

  public delete(
    apiRequest: ApiRequest,
    params: string = ''
  ): Observable<any> {
    const apiAddress = environment.baseUrl + this._getApiVariables(apiRequest.api, apiRequest.variables) + params;
    return this.http.put(apiAddress, this._getOptions());
  }
}
