import { Injectable } from '@angular/core';
import AWSAppSyncClient from 'aws-appsync';
import { Auth } from 'aws-amplify';
import awsmobile from '../../aws-exports';

@Injectable()
export class AppsyncService {

   // hc;
   _hc;

   constructor() {
     const client = new AWSAppSyncClient({
       url: awsmobile.aws_appsync_graphqlEndpoint,
       region: awsmobile.aws_appsync_region,
       auth: {
         type: awsmobile.aws_appsync_authenticationType,
         jwtToken: async () => (await Auth.currentSession()).getIdToken().getJwtToken()
       }
     });
     // this.hc = client.hydrated;
     this._hc = client;
   }
   hc() {
     return this._hc.hydrated();
   }
}

/*
clientLocal = new AWSAppSyncClient({
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
*/
