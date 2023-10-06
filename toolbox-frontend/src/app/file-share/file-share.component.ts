import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file-share',
  templateUrl: './file-share.component.html',
  styleUrls: ['./file-share.component.css']
})
export class FileShareComponent implements OnInit {
  files: string[] = [];
  uploadProgress: number = 0;

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.refreshFileList();
  }

  refreshFileList() {
    this.http.get<string[]>('http://192.168.50.13:3000/files').subscribe(files => {
      this.files = files;
      this.cd.detectChanges();

    }, error => {
      console.error('Error fetching file list:', error);
    });
  }


  deleteFile(file: string) {
    this.http.delete(`http://192.168.50.13:3000/delete/${file}`).subscribe(response => {
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

      this.http.post('http://192.168.50.13:3000/upload', formData, {
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
        }
      });
    }
  }


  downloadFile(file: string) {
    window.location.href = `http://192.168.50.13:3000/download/${file}`;
  }
}
