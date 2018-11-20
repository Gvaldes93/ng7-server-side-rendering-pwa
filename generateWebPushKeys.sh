#!/usr/bin/env bash

# This script generates web-push vapid keys (public/private pair) and stores the keys in the following places:
#       * in a .env file which is passed to the server's docker image on its run command (see Readme)
#       * and the public key only in the angular prod environment file
# -------------------------------------------------------------------------------

WEB_PUSH_KEYS_FILE=web-push-keys.env
ENVIRONMENT_PROD_TS_FILE=src/environments/environment.prod.ts

npm run create:vapid-keys >> $WEB_PUSH_KEYS_FILE

WEB_PUSH_PUBLIC_KEY=$(awk '/Public/{a=1;next}/Private/{a=0}a'  $WEB_PUSH_KEYS_FILE)
WEB_PUSH_PRIVATE_KEY=$(awk '/Private/{a=1;next}/=====/{a=0}a'  $WEB_PUSH_KEYS_FILE)


echo "WEB_PUSH_PUBLIC_KEY="$WEB_PUSH_PUBLIC_KEY > $WEB_PUSH_KEYS_FILE
echo "WEB_PUSH_PRIVATE_KEY="$WEB_PUSH_PRIVATE_KEY >> $WEB_PUSH_KEYS_FILE

#WARNING! Please don't use this for real prod application!
# https://github.com/angular/angular-cli/issues/12810

echo "export const environment = {"               >  $ENVIRONMENT_PROD_TS_FILE
echo "   production: true,"                       >> $ENVIRONMENT_PROD_TS_FILE
echo "   webPush: {"                              >> $ENVIRONMENT_PROD_TS_FILE
echo "       publicKey: '"$WEB_PUSH_PUBLIC_KEY"'" >> $ENVIRONMENT_PROD_TS_FILE
echo "   }"                                       >> $ENVIRONMENT_PROD_TS_FILE
echo "};"                                         >> $ENVIRONMENT_PROD_TS_FILE
