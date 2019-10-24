import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Events } from '@ionic/angular';
import { AmplifyService } from 'aws-amplify-angular';
import { ListItemModal } from './list.item.modal';
import { ToDoItem, ToDoList } from '../classes/item.class';
import { debug } from 'util';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  amplifyService: AmplifyService;
  modal: any;
  data: any;
  user: any;
  itemList: ToDoList | any;
  signedIn: boolean;

  constructor(
    public modalController: ModalController,
    amplify: AmplifyService,
    events: Events
  ) {
    this.amplifyService = amplify;
    // Listen for changes to the AuthState in order to change item list appropriately
    events.subscribe('data:AuthState', (data) => {
      console.log("events.subscribe() called ...");
      console.log("data = " + JSON.stringify(data));
      if (data.loggedIn){
        this.amplifyService.auth().currentUserInfo().then ((user) => {
          console.log('Current User = ' + JSON.stringify(user));
          this.user = user;
          this.getItems();
        });

      } else {
        this.itemList = [];
        this.user = null;
      }
    })
  }

  async ngOnInit(){
    // Use AWS Amplify to get user data when creating items
    this.user = await this.amplifyService.auth().currentUserInfo();
    this.getItems();
  }

  async modify(item, i) {
    console.log("item = " + JSON.stringify(item));
    console.log("i = " + i);
    let props = {
      itemList: this.itemList || new ToDoList({userId: this.user.id}),
      /*
        We pass in an item parameter only when the user clicks on an existing item
        and therefore populate an editItem value so that our modal knows this is an edit operation.
      */
      editItem: item || undefined
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
    this.save(this.itemList);
  }

  complete(i){
    this.itemList.items[i].status = "complete";
    this.save(this.itemList);
  }

  save(list){
    console.log("save() called ... list = " + JSON.stringify(list));
    // Use AWS Amplify to save the list...
    this.amplifyService.api().post('ToDoItemsCRUD', '/ToDoItems', {body: list}).then((i) => {
      console.log("post() was called and returned sucessfully ...");
      // ... and to get the list after you save it.
      this.getItems()
    })
    .catch((err) => {
      console.log('Error saving list: ${err}')
    })
  }

  getItems(){
    console.log('getItem() called ... this.user = ' + JSON.stringify(this.user));
    if (this.user) {
      console.log("this.user.id = " + this.user.id);
      // Use AWS Amplify to get the list
      this.amplifyService.api().get('ToDoItemsCRUD', `/ToDoItems/${this.user.id}`).then((res) => {
        console.log("api().get called ... res = " + JSON.stringify(res));
        if (res && res.length > 0) {
          this.itemList = res[0];
        } else {
          this.itemList = new ToDoList({userId: this.user.id, items: []});
        }
    })
    .catch((err) => {
      console.log('Error getting list: ${err}')
      })
    } else {
      console.log('Cannot get items: no active user')
    }
  }
}
