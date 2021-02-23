import { Component,ViewChild } from '@angular/core';

import { FilePondOptions } from 'filepond';
import { FilePondComponent } from 'ngx-filepond/filepond.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  @ViewChild('myPond') myPond: FilePondComponent

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Drop files here...'
  }

  pondFiles: FilePondOptions["files"] = [
    {
      source: 'assets/photo.jpeg',
      options: {
        type: 'local'
      }
    }
  ]

  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }

  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
  }

  pondHandleActivateFile(event: any) {
    console.log('A file was activated', event)
  }
}
