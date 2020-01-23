import { Component, OnInit } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  private url: string = "http://localhost:4000/api/upload";
  private fileName: string = UUID.UUID();
  private fileNameHeaders = { name: "File-Name", value: this.fileName };
  private username: string = "slavko"; // this.keycloakService.getusername();
  private usernameHeaders = { name: "User-Name", value: this.username };
  public uploader: FileUploader = new FileUploader({ url: this.url, itemAlias: "file", headers: [ this.fileNameHeaders, this.usernameHeaders ] });

  constructor() { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file: FileItem) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("FileUpload: uploaded successfully", item, status, response);
    };
  }

}
