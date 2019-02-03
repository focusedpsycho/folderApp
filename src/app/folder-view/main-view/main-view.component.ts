import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  constructor(private messagingService: MessagingService) { }

  parentReferenceChain: object[];

  folderView = {
    folder1: {
      folder1a: {},
      folder1b: {
        folder1ba: {
          folder1baa: {

          }
        }
      }
    },
    folder2: {
      folder2a: {},
      folder2b: {
        folder2ba: {

        }
      }
    },
    folder3: {
      folder3a: {},
      folder3b: {
        folder3ba: {

        }
      }
    }
  };

  selectedFolder: object;
  createFolderFlag = false;
  newFileName = '';
  showLengthError = false;
  showExistsError = false;
  workingDirectory = '/';
  showPathError = false;


  ngOnInit() {

    this.selectedFolder = this.folderView;
    this.parentReferenceChain = [];

    this.messagingService.currentSelectedTree.subscribe(
      data => {
        if (data) {
          this.openFolderByPath(data);
        }

      }
    );
  }

  openFolderByPath(data) {
    console.log(data);
    this.workingDirectory = '/';
    this.parentReferenceChain = [];
    console.log(this.workingDirectory);
    this.selectedFolder = this.folderView;
    for (let i = 0; i < data.length; i++) {
      this.openFolder(data[i]);
    }
  }

  openFolder(folderName) {
    if (!this.selectedFolder[folderName]) {
      this.showPathError = true;
      return;
    }

    const referenceObj = {};
    referenceObj['name'] = folderName;
    referenceObj['folderReference'] = this.selectedFolder;

    this.parentReferenceChain.push(referenceObj);
    this.selectedFolder = this.selectedFolder[folderName];
    // this.workingDirectory += folderName + '/';
    this.constructPWD();
  }

  constructPWD() {
    this.workingDirectory = '/';
    for (let i = 0; i < this.parentReferenceChain.length; i++) {
      this.workingDirectory += this.parentReferenceChain[i]['name'] + '/';
    }
  }

  goBack() {
    console.log(this.parentReferenceChain);
    this.selectedFolder = this.parentReferenceChain[this.parentReferenceChain.length - 1]['folderReference'];
    this.parentReferenceChain.splice(this.parentReferenceChain.length - 1, 1);
    this.constructPWD();
  }

  createFolder() {
    this.createFolderFlag = true;
    // this.newFileName = '';
    // this.selectedFolder[this.newFileName] = {};
  }

  registerFileName(event) {
    this.showExistsError = false;
    this.showLengthError = false;
    if (event.keyCode === 13 && this.selectedFolder[this.newFileName]) {
      this.showExistsError = true;

    } else if (event.keyCode === 13 && this.newFileName !== '') {
      this.selectedFolder[this.newFileName] = {};
      this.newFileName = '';
      this.createFolderFlag = false;
    } else if (event.keyCode === 13) {
      this.showLengthError = true;
    }

  }

  cancelCreate() {
    this.newFileName = '';
    this.createFolderFlag = false;
  }


  deleteFolder(folderName) {
    delete this.selectedFolder[folderName];
  }

  goToPath(event) {
    this.showPathError = false;
    if(event.keyCode === 13){
      const folderNames = this.workingDirectory.split('/');
      let i = 0;
      while (i < folderNames.length) {
        if (folderNames[i] === '') {
          folderNames.splice(i, 1);
        } else {
          i++;
        }
      }
      this.openFolderByPath(folderNames);
    }


  }



}
