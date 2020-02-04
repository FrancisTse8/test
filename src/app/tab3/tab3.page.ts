import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { myItem, myItemsList } from '../classes/item.class';
import { AmplifyService } from 'aws-amplify-angular';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import Amplify, { API, graphqlOperation, Auth } from 'aws-amplify';
import { Events } from '@ionic/angular';
import AWSAppSyncClient, { AUTH_TYPE, buildMutation } from 'aws-appsync';
import awsmobile from '../../aws-exports';
import gql from 'graphql-tag';
import { listNewTodos } from '../../graphql/queries';
import { createNewTodo } from '../../graphql/mutations';
import { AppsyncService } from '../services/appsync.service';
import { ObservableQuery } from 'apollo-client';
import { ListNewTodosQuery } from '../../API';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  amplifyService: AmplifyService;
  item = new myItem;
  itemList: myItemsList | any;
  user: any;
  observedQuery: ObservableQuery<ListNewTodosQuery>;

// have to block this so can use client on appsync.services  
/*  clientLocal = new AWSAppSyncClient({
    url: awsmobile.aws_appsync_graphqlEndpoint,
    region: awsmobile.aws_appsync_region,
    auth: {
      //type: AUTH_TYPE.API_KEY, 
      // use "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS" instead of API Key
      type: awsmobile.aws_appsync_authenticationType,
      jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken(), //added this to get rid of status 401 error
      //no API Key
      //apiKey: awsmobile.aws_appsync_apiKey,
    }
  });
*/

  constructor(
    amplify: AmplifyService,
    events: Events,
    private appsync: AppsyncService
    ) {
    this.amplifyService = amplify;
    // Listen for changes to the AuthState in order to change item list appropriately
    events.subscribe('data:AuthState', (data) => {
      console.log("events.subscribe() called ...");
      console.log("data = " + JSON.stringify(data));
      if (data.loggedIn){
        this.amplifyService.auth().currentUserInfo().then ((user) => {
          console.log('Current User = ' + JSON.stringify(user));
          //this.item.userId = user.username;
          this.getItems();
        });

      } else {
        this.itemList = [];
        this.user = null;
      }
    });
    
  }

  async ngOnInit(){
    console.log("ngOnInit() called ...");
    // Use AWS Amplify to get user data when creating items
    this.user = await this.amplifyService.auth().currentUserInfo();
    console.log("user = " + JSON.stringify(this.user));
    this.getItems();
  }

  create() {
    console.log("create() called ...");
    console.log("userId = " + this.user.username);
    console.log("name = " + this.item.title);
    console.log("description = " + this.item.description);
    this.appsync.hc().then(client => {

      client.mutate(buildMutation
        (
          client,
          gql(createNewTodo),
          {
            inputType: gql(createNewTodo),
            variables: {
              input: {
                userId: this.user.username,
                name: this.item.title,
                description: this.item.description,
              }
            }
          },
          (_variables) => [ gql(listNewTodos) ],
          'NewTodo'
        )
      ).then(result => {
        console.log("result = " + JSON.stringify(result));
        this.getItems()   //update items list display
      });
      

/*
      client.mutate ({
        mutation: gql(createNewTodo),
        variables: {
          input: {
            userId: this.user.username,
            name: this.item.title,
            description: this.item.description,
          }
        }
      })
      .then(result => {
        console.log("result = " + JSON.stringify(result));
        this.getItems();    //update items list display
      });
*/ 
      
    });
  }

  /* 
//This is using SDK originally
  async create() {
    console.log("create() called ...");
    console.log("userId = " + this.user.username);
    console.log("name = " + this.item.title);
    console.log("description = " + this.item.description);

//    (async () => {
      const result = await this.client.mutate({
        mutation: gql(createNewTodo),
        variables: {
          input: {
            userId: this.user.username,
            name: this.item.title,
            description: this.item.description,
          }
        }
      });
      console.log("result = " + JSON.stringify(result));
//    })();


//  This is using the GraphQL Client
    const todoDetails = {
      userId: this.user.username,
      name: this.item.title,
      description: this.item.description
    }
    const newTodo = await API.graphql(graphqlOperation(mutations.createNewTodo, {input: todoDetails}));
    console.log("newTodo = " + JSON.stringify(newTodo));
*/

//    this.getItems();  //update the list of items
//  }

  getItems() {
    console.log ("getItem() called ...");

    this.appsync.hc().then(client => {
      const observable: ObservableQuery<ListNewTodosQuery> = client.watchQuery({
        query: gql(listNewTodos),
        fetchPolicy: 'cache-and-network'
      });
      observable.subscribe(({data}) => {
        console.log("data = " + JSON.stringify (data));
        if (!data) {return console.log("can't get data ..."); }
        const temp1: any = data;
        console.log(JSON.stringify(temp1.listNewTodos.items[1]));
        const n1: number = temp1.listNewTodos.items.length;
        console.log("number of items = " + n1);
        var i;
        this.itemList = []; //zero out the list first
        for (i = 0; i < n1; i++ ) {
//          if (temp1.listNewTodos.items[i].userId == this.user.username) {  //only get items from current user
            this.itemList.push(temp1.listNewTodos.items[i]);
//          }
        }
        console.log("itemsList = " + JSON.stringify(this.itemList));
      });
    });


/* Two original approaches - using AppSync SDK query with promise and GraphQL Client
    // uses SDK query with promise
    this.client.query({
      query: gql(listNewTodos),
//      fetchPolicy: 'cache-and-network',
//'cache-and-network' will only work when using watchQuery since that would return an observable when things changes.
//will use 'network-only for now.
//      fetchPolicy: 'network-only',
    }).then(({ data }) => {
      console.log(JSON.stringify(data));
      const temp1: any = data;
      console.log(JSON.stringify(temp1.listNewTodos.items[1]));
      const n1: number = temp1.listNewTodos.items.length;
      console.log("number of items = " + n1);
      var i;
      this.itemList = []; //zero out the list first
      for (i = 0; i < n1; i++ ) {
//        if (temp1.listNewTodos.items[i].userId == this.user.username) {  //only get items from current user
          this.itemList.push(temp1.listNewTodos.items[i]);
//        }
    }
    console.log("itemsList = " + JSON.stringify(this.itemList));
    });

    // This is using the GraphQL Client
    //geet everything in the table
    const allTodos = await API.graphql(graphqlOperation(queries.listNewTodos));
    console.log("allTodos = " + JSON.stringify(allTodos));
    const temp1: any = allTodos;
    console.log(JSON.stringify(temp1.data.listNewTodos.items[1]));
    const n1: number = temp1.data.listNewTodos.items.length;
    console.log("number of items = " + n1);
    var i;
    this.itemList = []; //zero out the list first
    for (i = 0; i < n1; i++ ) {
      if (temp1.data.listNewTodos.items[i].userId == this.user.username) {  //only get items from current user
        this.itemList.push(temp1.data.listNewTodos.items[i]);
      }
    }
    console.log("itemsList = " + JSON.stringify(this.itemList));
*/

  }

  async getOneItem(item) {
    console.log("getOneItem() called ...");
    console.log("$event received = " + item);
    var oneItem: string = "item12"; //place holder for item to search for
    //get just one of the items for the current user
    const oneTodo = await API.graphql(graphqlOperation(queries.getNewTodo,{userId: "FrancisTse", name: oneItem}));
    console.log("oneTodos = " + JSON.stringify(oneTodo));
    const temp: any = oneTodo;
    console.log("Info for " + oneItem + " = " + temp.data.getNewTodo.description);


  }

}
