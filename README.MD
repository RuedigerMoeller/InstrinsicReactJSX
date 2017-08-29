# react-material-ui with kontraktor intrinsic stack (no node/npm/babel required)


**Full web app example featuring ..**

* jsx transpilation, automatic resolvment of missing npm dependencies (without having nodejs/npm installed)
* Actor based async server
* Session handling
* Session timeout handling
* Session resurrection. (SPA client was away/offline and connects back)
* Dynamic connection type (http adaptive long poll or websockets) without code change

[kontraktor home](https://github.com/RuedigerMoeller/kontraktor)

**how to run:**

* add project to your ide (from pom)
* run ReactMaterialUITestApp with workingdir [...]/examples/webapp-spa/react-ui-lib-examples/react-material-ui
* goto localhost:8080 in your browser
* first request triggers download of required npm packages so give it like 50 seconds (wathc console)
* set DEVMODE to false to get a (dynamically) bundled build

Note:
* on the initial request, all missing npm dependencies are installed by kontraktor-Jnpm, this migth take up to a minute,
**once** (watch console) per install.
* as source is kept in separate files during development mode, loading is somewhat slowish (~3 seconds). Set DEVMODE to false 
inside ReactMaterialUITestApp, restart server in order to see loading time of bundled and minified app. Even then: First request triggers bundling (cached then) as kontraktor-http favors dynamic optimization over 'pre-building' (for now ;) ).

commandline:
```bash
git clone https://github.com/RuedigerMoeller/InstrinsicReactJSX.git
cd InstrinsicReactJSX/
mvn clean package
java -cp target/react-material-ui-1.0-SNAPSHOT-jar-with-dependencies.jar sample.reactmaterial.ReactMaterialUITestApp
```
browser: localhost:8080  (watch console on first request isntalling dependencies ..)

**session resurrection**

* goto localhost:8080 login (just some dummy nick)
* press greet button
* restart server
* press greet button again.

Inner workings of resurrection: once a remote call to an unknown actor is received, a lookup is done from sessionid => userid (+pwd), then
a new session actor is created. After that the remotecall is routed. Client receives a notification so it might update 
stale data.

Of course a real world app might associate arbitrary session data with a session id. Session resurrection is important
for SPA apps (especially on mobile) as one frequently loses connection or keeps an SPA open for days without "refreshing".

[![Watch the video](http://img.youtube.com/vi/CuYuynl16o4/0.jpg)](http://youtu.be/CuYuynl16o4)
