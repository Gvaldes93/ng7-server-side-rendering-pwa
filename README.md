# Progressive Web App with Server Side Rendering 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.
Is an example of a Progressive Web app with Server Side Rendering emulating a newsletter renderer:
* Service workers with background downloading installation.
* Push notifications. 
* Application shell.
* Server data caching in browser.
* Server Side Rendering
* Lighthouse punctuation 93
* Flight mode.

## Quickstart
Install dependencies `npm install`

#### Create web-push notifications key pairs ####
You just need to execute `. generateWebPushKeys.sh`

#### start newsletter-server ####
Now pull the newsletter-server from dockerhub (~180mb)
`docker pull germanvs/newsletter-server`
and start it with this command 
`docker run -p 9000:9000 --env-file=web-push-keys.env -d germanvs/newsletter-server`

### build and start client app ###
`npm run build:start:prod`
visit http://localhost:4000

### Seeing PWA magic in action
#### angular app - offline mode ####
stop the angular server `ctrl + c`, now visit `http://localhost:4000` again and voilà!
The application shell + service workers are making their job and your app is available offline! 
Pretty cool! It still can communicate with the server normally. 

#### both angular and server offline - Flight mode ####
Stop the server by running `docker ps -a` grab the container id for newsletter-server and run `docker stop {containerID}`
visit `http://localhost:4300` and you will notice the list of newsletters is still appearing in the app although the 
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
the good news is that the new version is downloaded in the background and when is installed the app can subscribe to this event and decide wha tto do 
(whether reload the app or ask user for permission).

Try background install and prompt user to load new version when is ready:
open `src/app/app.component.html` and add a `<p> this is my new PWA version! </p>`
now run `npm run build:start:prod`
visit `http://localhost:4000` and wait for ~5 seconds while SWs are installed for the reload permission prompt.

more on [Angular Service Workers](https://angular.io/guide/service-worker-intro)
