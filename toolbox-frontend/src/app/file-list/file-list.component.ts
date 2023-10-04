import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  files: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/files').subscribe(
      data => {
        console.log('Data received:', data);
        this.files = data as any[];
      },
      error => {
        console.error('Error fetching files:', error);
      }
    );

  }


  downloadFile(file: string) {
    window.location.href = `http://localhost:3000/download/${file}`;
  }
}
