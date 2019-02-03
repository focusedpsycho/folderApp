import { Component, OnInit, Input } from '@angular/core';
import {MessagingService} from '../messaging.service';

@Component({
  selector: 'app-explorer-view',
  templateUrl: './explorer-view.component.html',
  styleUrls: ['./explorer-view.component.css']
})
export class ExplorerViewComponent implements OnInit {

  @Input() folderData: object;
  clicked: boolean[];
  @Input() parentChain: string[];

  constructor(private messagingService: MessagingService) { }

  ngOnInit() {
    this.clicked = new Array();
    for (const key in this.folderData) {
      if (this.folderData[key]) {
        this.clicked.push(false);
      }
    }

    console.log(this.parentChain);
  }

  toggleClick(index, event) {

    this.clicked[index] = !this.clicked[index];
    event.stopPropagation();
  }

  getParentChain(parent) {
    const newParentChain = [];
    for (let i = 0; i < this.parentChain.length; i++) {
      newParentChain.push(this.parentChain[i]);
    }

    newParentChain.push(parent)
    return newParentChain;
  }

  openFolder(parent){
    const newParentChain = [];
    for (let i = 0; i < this.parentChain.length; i++) {
      newParentChain.push(this.parentChain[i]);
    }

    newParentChain.push(parent);
    
   this.messagingService.chooseAFolderPath(newParentChain);
  }

}
