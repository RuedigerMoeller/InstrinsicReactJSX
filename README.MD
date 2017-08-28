# react-material-ui with kontraktor intrinsic jnpm, jsx transpilation and bundling (no node/npm/babel required)

Full example featuring

* jsx transpilation, automatic npm download (without having nodejs/npm installed)
* Actor based async server
* Session handling
* Session timeout handling
* Session resurrection. (SPA client was away/offline and connects back)
* Dynamic connection type (http adaptive long poll or websockets) without code change

**how to run:**

* add project to your ide (from pom)
* run ReactMaterialUITestApp with workingdir [...]/examples/webapp-spa/react-ui-lib-examples/react-material-ui
* goto localhost:8080 in your browser
* first request triggers download of required npm packages so give it like 50 seconds (wathc console)
* set DEVMODE to false to get a (dynamically) bundled build

**see session resurrection**

* goto localhost:8080 login (just some dummy nick)
* press greet button
* restart server
* press greet button again.

Inner workings of resurrection: once a remote call to an unknown actor is received, a lookup is done from sessionid => userid (+pwd), then
a new session actor is created. After that the remotecall is routed. Client receives a notification so it might update 
stale data.

Of course a real world app might associate arbitrary session data with a session id. Session resurrection is important
for SPA apps (especially on mobile) as one frequently loses connection or keeps an SPA open for days without "refreshing".