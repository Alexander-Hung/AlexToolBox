import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment/environment';


@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private baseUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) { }

  getTools() {
    return this.http.get<any>(`${this.baseUrl}/tools`);
  }
}
