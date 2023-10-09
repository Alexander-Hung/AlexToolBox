import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment'

@Component({
  selector: 'app-compilers',
  templateUrl: './compilers.component.html',
  styleUrls: ['./compilers.component.css']
})
export class CompilersComponent {
  code: string = '';
  output: string = '';

  constructor(private http: HttpClient) {}

  compileCode() {
    this.http.post(`${environment.apiBaseUrl}/compile`, { code: this.code }).subscribe((response: any) => {
      this.output = response.output;
    }, error => {
      console.error('Error compiling code:', error);
    });
  }
}
