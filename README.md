# PWA
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.
Is an example of a Progressive Web app to demo:
Service workers with background downloading installation.
Push notifications. 
Application shell.
Application data caching.
Once click installation (add to home screen)

# Requisites # 
To enable the application stack (angular app + server) to send push notifications the angular app 
needs to send a public key that identifies the app in the server which contains the public and private key. 
To generate these please install [web-push](https://www.npmjs.com/package/web-push) like so:
`npm install web-push -g` and run `web-push generate-vapid-keys --json` from the result extract the `publicKey`
and paste it to the value of property with same name in the file `src/environments/environment.prod.ts`.
Export `WEB_PUSH_PUBLIC_KEY` and `WEB_PUSH_PRIVATE_KEY` for the server to read these. 

## Build for production #
`ng build --prod`

## Serve production version ##
First run the backend by running `npm run server`
then in another terminal run `npm run start:prod`

visit http://localhost:8081

