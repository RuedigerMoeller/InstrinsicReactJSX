# React JSX front end app powered by a java backend, no node/npm/webpack required

## Frontend

* **intrinsic react jsx transpilation** 
* Ultra fast **hot reloading / live editing** (Disclaimer: breakpoints cannot be set inside Chrome then: use **'debugger;'** instead)
* built-in **npm replacement** dependency management ('JNPM') fetches missing imports on demand
* integrated **bundler/transpiler**. Integrates **google-clojure compiler** to compile down to **ES5** in production mode
* Sophisticated **java/javascript interoperation**. Fulfil Promises from js by java code, server push by calling callbacks from java transparently to js client code.

Has been tested with major react-UI libs: react-material-ui, react-bootstrap and react-semantic-ui (should work with any npm powered js lib)
  
## Server Side

* Actor based async server (Java 8, node style threading model, but enables multithreading by assigning client sessions to additional threads)
* (optional) Session handling, timeout, ressurrection (SPA client was away/offline and connects back) 
* Dynamically change connection type (http adaptive long poll or websockets) without code change

**Jnpm in action, session ressurrection:**

[![Watch the video](http://img.youtube.com/vi/CuYuynl16o4/0.jpg)](http://youtu.be/CuYuynl16o4)

**Getting started**

[Starter templates and scaffolding](https://github.com/RuedigerMoeller/react-with-java-starter-templates)

**Docs**

[Kontraktor's JSX transpilation + npm emulation](https://github.com/RuedigerMoeller/kontraktor/wiki/Kontraktor-4-React-JSX)

[Examples for semantic-ui-react and react-bootstrap](https://github.com/RuedigerMoeller/kontraktor/tree/trunk/examples/webapp-spa/react-ui-lib-examples)

[Kontraktor home](https://github.com/RuedigerMoeller/kontraktor)


## Run this sample app

**IDE**
* add project to your ide (from pom)
* run ReactMaterialUITestApp with workingdir [...]/examples/webapp-spa/react-ui-lib-examples/react-material-ui
* goto localhost:8080 in your browser
* first request triggers download of required npm packages so give it like 50 seconds (wathc console)
* set DEVMODE to false to get a (dynamically) bundled build

**commandline:**
```bash
git clone https://github.com/RuedigerMoeller/InstrinsicReactJSX.git
cd InstrinsicReactJSX/
mvn clean package
java -jar target/bundle.jar
```
browser: localhost:8080  (watch console on first request isntalling dependencies ..)

**Note:**
* on the initial request, all missing npm dependencies are installed by kontraktor-Jnpm, this migth take up to a minute,
**once** (watch console) per install.
* as source is kept in separate files during development mode, loading is somewhat slowish (~3 seconds). Set DEVMODE to false 
inside ReactMaterialUITestApp, restart server in order to see loading time of bundled and minified app. Even then: First request triggers bundling (cached then) as kontraktor-http favors dynamic optimization over 'pre-building' (since 4.18.5 : static build artifacts support).

[Simpler starter templates and scaffolding](https://github.com/RuedigerMoeller/react-with-java-starter-templates)

## Session resurrection

* goto localhost:8080 login (just some dummy nick)
* press greet button
* restart server
* press greet button again.

Inner workings of resurrection: once a remote call to an unknown actor is received, a lookup is done from sessionid => userid (+pwd), then
a new session actor is created. After that the remotecall is routed. Client receives a notification so it might update 
stale data.

Of course a real world app might associate arbitrary session data with a session id. Session resurrection is important
for SPA apps (especially on mobile) as one frequently loses connection or keeps an SPA open for days without "refreshing".


