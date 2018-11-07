# PWA
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.
Is an example of a Progressive Web app emulating a newsletter renderer:
* Service workers with background downloading installation.
* Push notifications. 
* Application shell.
* Application consumed data caching.
* Flight mode.
* One click installation (add to home screen)

## Requisites ##
To enable the application stack (angular app + server) to send push notifications the angular app 
needs to be provided with the server public key as per [PUSH API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API).
Step by step instructions below.

#### Create vapid keys ####
`npm install web-push -g` and run `web-push generate-vapid-keys --json` from the result extract the `publicKey` and `privateKey`
to pass them to the server and angular app in the next steps.

#### run newsletter-server ####
you can either get the newsletter-server from [github](https://github.com/Gvaldes93/newsletter-server) and follow the instructions
or easier just running it by pulling the docker image:  
`docker pull germanvs/newsletter-server`
and start it with: 
`docker run -p 9000:9000  --env WEB_PUSH_PUBLIC_KEY={publicKey} --env WEB_PUSH_PRIVATE_KEY={privateKey} -d germanvs/newsletter-server`

#### config angular app ####
update the config file `/src/environments/environment.prod.ts` to look like:
```$xslt
export const environment = {
  production: true,
  webPush: {
    publicKey: '{publicKey}',
  }
};
```

### Build for production ###
`ng build --prod`

### Serve production version ###
`npm run start:prod` and visit http://localhost:8081

### Seeing PWA magic in action
#### angular app - offline mode ####
stop the angular server `ctrl + c`, now visit `http://localhost:8081` again and woala!
The application shell + service workers are making their job and your app is available offline! 
Pretty cool! It still can communicate with the server normally. 

#### both angular and server offline - Flight mode ####
Stop the server by running `docker ps -a` grab the container id for newsletter-server and run `docker stop {containerID}`
visit `http://localhost:8081` and you will notice the list of newsletters is still appearing in the app although the 
buttons fail to communicate with the server, this is due to caching on the service workers.
in `ngsw-config.json` is where the service workers are configured to cache data, specifically this bit:
```$xslt
"dataGroups": [
    {
      "name": "Newsletter backend",
      "urls": [
        "http://localhost:9000/api/newsletters"
      ],
      "cacheConfig": {
        "strategy": "freshness",
        "timeout" : "10s",
        "maxAge": "1d",
        "maxSize": 100
      }
    }
  ]
```
tells the service workers - with strategy freshness - to first try to get the data from the server and on success 
caches it for a day so in subsequent GET calls to http://localhost:9000/api/newsletter if the server is 
offline or times out after 10 seconds then it will serve your app with previously cached data, powerful.

#### background loading of new app versions
When service workers are instaleld in the browser every next load will be served locally.
This also applies even when there is a new version of your app. When at least one file changes
is desirable that the whole app is downloaded and re-cached in the browser to avoid inconsistent bundles and possible
outdated references causing problems. 
the good news is that the new version is downloaded in the background and when is installed we can choose to notify our users
or just do a hard reload :O .

Try this:
open `src/app/app.component.html` and add a `<p> this is my new PWA version! </p>`
now run `ng build --prod` when it finishes re-start the app with this comand `npm run start:prod`
visit `http://localhost:8081` and wait for ~5 seconds while SWs are installed.

more on [Angular Service Workers](https://angular.io/guide/service-worker-intro)
