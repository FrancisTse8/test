import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { ListItemModal } from './list.item.modal';
import { ToDoItem, ToDoList } from '../classes/item.class';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  modal: any;
  data: any;
  user: any;
  itemList: ToDoList;
  signedIn: boolean;

  constructor(
    public modalController: ModalController,
    events: Events
  ) {
    // Listen for changes to the AuthState in order to change item list appropriately
    events.subscribe('data:AuthState', async (data) => {
      if (data.loggedIn){
        this.getItems();
      } else {
        this.itemList.items = []; //uncommented this ***Francis
      }
    })
  }

  async ngOnInit(){
    this.getItems();
  }

  async modify(item, i) {
    console.log("item = " + JSON.stringify(item));
    console.log("i = " + i);
    let props = {
      itemList: this.itemList,
      /*
        We pass in an item parameter only when the user clicks on an existing item
        and therefore populate an editItem value so that our modal knows this is an edit operation.
      */
      editItem: item || null  //changed this from undefined to null
    };

    // Create the modal
    const modal = await this.modalController.create({     //use const instead of this. - Francis
      component: ListItemModal,
      componentProps: props,
      mode: "ios"
    });
    // Listen for the modal to be closed...
    modal.onDidDismiss().then((result) => {               //removed this. and added then - Francis
      console.log("modal.onDidDismiss called ...");
      console.log("After modal is dismissed, result = " + JSON.stringify(result));
      if (result.data.newItem){
        // ...and add a new item if modal passes back newItem
        result.data.itemList.items.push(result.data.newItem)
      } else if (result.data.editItem){
        // ...or splice the items array if the modal passes back editItem
        result.data.itemList.items[i] = result.data.editItem
      }
      this.save(result.data.itemList);
    })
    return await modal.present()       //removed return (worked with it also)  - Francis
  }

  delete(i){
    this.itemList.items.splice(i, 1);
    this.save(this.itemList); //uncommented this ***Francis
  }

  complete(i){
    this.itemList.items[i].status = "complete";
    this.save(this.itemList); //uncommented this ***Francis
  }

  save(list){
    // Use AWS Amplify to save the list...
    this.itemList = list; //uncommented this ***Francis
  }

  getItems(){
    this.itemList = {
      userId: 1,
      items: [
        new ToDoItem({
          id: '1',
          title: 'test item 1',
          description: 'my test item',
          status: 'complete'
        }),
        new ToDoItem({
          id: '2',
          title: 'test item 3',
          description: 'my other test item',
          status: 'pending'
        })
      ]
    }
  }

}
