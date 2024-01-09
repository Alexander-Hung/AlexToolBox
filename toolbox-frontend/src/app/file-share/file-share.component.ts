import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../environment/environment'

interface UploadResponse {
  message: string;
}

@Component({
  selector: 'app-file-share',
  templateUrl: './file-share.component.html',
  styleUrls: ['./file-share.component.css']
})
export class FileShareComponent implements OnInit, OnDestroy  {
  files: string[] = [];
  isLocked: boolean = true;
  uploadProgress: number = 0;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.refreshFileList();
    window.addEventListener('beforeunload', this.confirmOnPageExit.bind(this));
  }

  promptPassword() {
    const password = prompt('Enter password to unlock:');
    if (password === `${environment.password}`) {
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
    this.http.delete(`${environment.apiBaseUrl}/delete/${file}`).subscribe((response: any) => {
      console.log('File deleted');
      this.refreshFileList();  // Refresh the file list after deleting a file
    }, (error: any) => {
      this.refreshFileList();
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
          this.refreshFileList();
        } else if (event.type === HttpEventType.Response) {
          console.log('Upload response:', (event.body as UploadResponse).message);
          this.uploadProgress = 0; // Reset progress
          this.refreshFileList();
        }
      });
    }
  }

  ngOnDestroy(): void {
    // Remove the beforeunload listener to prevent memory leaks
    window.removeEventListener('beforeunload', this.confirmOnPageExit.bind(this));
  }

  confirmOnPageExit(event: any): void {
    if (this.uploadProgress !== 0 && this.uploadProgress !== 100) {
      const message = 'Upload in progress. To prevent list error, please hold.';
      event.returnValue = message;
    }
  }

  downloadFile(file: string) {
    window.location.href = `${environment.apiBaseUrl}/download/${file}`;
  }
}
