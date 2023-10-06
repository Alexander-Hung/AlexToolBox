import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../environment/environment'

@Component({
  selector: 'app-file-share',
  templateUrl: './file-share.component.html',
  styleUrls: ['./file-share.component.css']
})
export class FileShareComponent implements OnInit {
  files: string[] = [];
  isLocked: boolean = true;
  uploadProgress: number = 0;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.refreshFileList();
  }

  promptPassword() {
    const password = prompt('Enter password to unlock:');
    if (password === 'yourPasswordHere') {  // Replace 'yourPasswordHere' with your desired password
      this.isLocked = false;
    } else {
      alert('Incorrect password!');
    }
  }

  refreshFileList() {
    this.http.get<string[]>(`${environment.apiBaseUrl}/files`).subscribe(files => {
      this.files = files;
      this.cd.detectChanges();

    }, error => {
      console.error('Error fetching file list:', error);
    });
  }


  deleteFile(file: string) {
    this.http.delete(`${environment.apiBaseUrl}/delete/${file}`).subscribe(response => {
      console.log('File deleted');
      this.refreshFileList();  // Refresh the file list after deleting a file
    }, error => {
      console.error('Error deleting file:', error);
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);

      this.http.post(`${environment.apiBaseUrl}/upload`, formData, {
        reportProgress: true,
        observe: 'events'
      }).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total) {
            this.uploadProgress = Math.round(100 * event.loaded / event.total);
          }
        } else if (event.type === HttpEventType.Response) {
          console.log('Upload complete');
          this.uploadProgress = 0; // Reset progress
          this.refreshFileList();
          window.location.reload();
        }
      });
    }
  }


  downloadFile(file: string) {
    window.location.href = `${environment.apiBaseUrl}/download/${file}`;
  }
}
