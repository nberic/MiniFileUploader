import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private url: string = "http://localhost:4000/api/upload";
  private fileName: string = "file";
  private username: string = "marina";
  private headers: HttpHeaders = new HttpHeaders({
    "File-Name": this.fileName,
    "User-Name": this.username
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  uploadFiles(selectedFiles: FileList) {
    console.log(selectedFiles);

    const formData: FormData = new FormData();
    for (let i = 0; i < selectedFiles.length; ++i) {
      formData.append("file", selectedFiles.item(i), selectedFiles.item(i).name);
    }

    this.http.post(this.url, formData, { headers: this.headers })
      .subscribe(data => {
        console.log(JSON.stringify(data));
      });
  }

}
