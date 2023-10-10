import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment/environment'

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private http: HttpClient) { }

  getTools() {
    return this.http.get<any>(`${environment.apiBaseUrl}/tools`);
  }
}
