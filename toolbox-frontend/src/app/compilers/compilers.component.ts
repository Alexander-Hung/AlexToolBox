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
  isLocked: boolean = true;
  panelOpenState = false;

  constructor(private http: HttpClient) {}

  promptPwd() {
    const password = prompt('Enter password to unlock:');

    let hex = '';
    // @ts-ignore
    for (let i = 0; i < password.length; i++) {
      // @ts-ignore
      hex += password.charCodeAt(i).toString(16);
    }

    let hex2 = '';
    // @ts-ignore
    for (let i = 0; i < `${environment.password}`.length; i++) {
      // @ts-ignore
      hex2 += `${environment.password}`.charCodeAt(i).toString(16);
    }

    // @ts-ignore
    if (hex === hex2) {   //if (password === `${environment.password}`) {
      this.isLocked = false;
    } else {
      alert('Incorrect password!');
    }
  }

  compileCode() {
    this.http.post(`${environment.apiBaseUrl}/compile`, { code: this.code }).subscribe((response: any) => {
      this.output = response.output;
    }, error => {
      console.error('Error compiling code:', error);
    });
  }
}
