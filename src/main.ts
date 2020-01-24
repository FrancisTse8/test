import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Amplify, { Analytics } from 'aws-amplify';
import gql from 'graphql-tag';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsmobile from './aws-exports';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

Amplify.configure(awsmobile);
/*
const client = new AWSAppSyncClient({
  url: awsmobile.aws_appsync_graphqlEndpoint,
  region: awsmobile.aws_appsync_region,
  auth: {
    //type: AUTH_TYPE.API_KEY, 
    // use "aws_appsync_authenticationType": "AMAZON_COGNITO_USER_POOLS" instead of API Key
    type: awsmobile.aws_appsync_authenticationType,
    //no API Key
    //apiKey: awsmobile.aws_appsync_apiKey,
  }
});
*/
