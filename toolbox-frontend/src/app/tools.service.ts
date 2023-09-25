import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getTools() {
    return this.http.get<any>(`${this.baseUrl}/tools`);
  }
}
