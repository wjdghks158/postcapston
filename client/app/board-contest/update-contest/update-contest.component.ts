import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
const URL = 'api/upload';

@Component({
  selector: 'app-update-contest',
  templateUrl: './update-contest.component.html',
  styleUrls: ['./update-contest.component.css']
})
export class UpdateContestComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  onSubmit() {
    this.uploader._fileTypeFilter
    console.log('이것 log임 '+ this.uploader._fileTypeFilter);
    console.dir('이건 dir임 ' + this.uploader._mimeTypeFilter);
    this.uploader.uploadAll();

}

}
