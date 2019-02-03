import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../folder-view/header/header.component';
import { FooterComponent } from '../folder-view/footer/footer.component';
import { MainViewComponent } from '../folder-view/main-view/main-view.component';
import { FormsModule } from '@angular/forms';

import { ExplorerViewComponent } from './explorer-view/explorer-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [HeaderComponent, FooterComponent, MainViewComponent, ExplorerViewComponent],
  exports: [HeaderComponent, FooterComponent, MainViewComponent]
})
export class FolderViewModule { }
