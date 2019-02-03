import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private selectedFolderTree: string[];
  private folderChainSource = new BehaviorSubject(this.selectedFolderTree);
  currentSelectedTree = this.folderChainSource.asObservable();

  constructor() { }

  chooseAFolderPath(path){
    this.selectedFolderTree = path;
    this.folderChainSource.next(this.selectedFolderTree);

  }
}
