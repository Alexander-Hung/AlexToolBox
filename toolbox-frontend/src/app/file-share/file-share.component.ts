import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-share',
  templateUrl: './file-share.component.html',
  styleUrls: ['./file-share.component.css']
})
export class FileShareComponent implements OnInit {
  files: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.refreshFileList();
  }

  refreshFileList() {
    this.http.get<string[]>('http://localhost:3000/files').subscribe(files => {
      this.files = files;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      this.http.post('http://localhost:3000/upload', formData).subscribe(response => {
        console.log('Upload complete');
        this.refreshFileList();  // Refresh the file list after uploading a new file
      });
    }
  }

  downloadFile(file: string) {
    window.location.href = `http://localhost:3000/download/${file}`;
  }
}
