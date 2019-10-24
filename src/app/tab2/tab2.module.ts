import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ListItemModal } from './list.item.modal';
import { AmplifyService} from 'aws-amplify-angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [
    Tab2Page,
    ListItemModal
  ],
  entryComponents: [
    Tab2Page,
    ListItemModal
  ],
  providers: [AmplifyService]
})
export class Tab2PageModule {}
