import React from 'react'
import {Component}  from 'react'
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {KClientListener} from 'kontraktor-client';
import {HCenter,Fader} from './util';
import Greeter from './greeter';
import global from "./global"
import MaterialPlay, {Dummy,Dummy1,DummyLambda} from './materialui/materialplay';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Static from './static';
import {RadioButtonGroup,RadioButton} from 'material-ui/RadioButton';
import Snackbar from 'material-ui/Snackbar';
import {KClient} from 'kontraktor-client';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loginEnabled: false,
      loggedIn: false,
      relogin: false,
      connectionType: 'HTLP',
      error: null,
      snackText: "",
      snackOpen: false
    };
    const self = this;
    global.kclient.listener = new class extends KClientListener {
      // session timeout or resurrection fail
      onInvalidResponse(response) {
        console.error("invalid response",response);
        self.setState({relogin: true}); // session expired
      }
      onResurrection() {
        console.log("session resurrected. should update client data + resubscribe streams in case !")
        self.setState({snackText: "Session Resurrected !", snackOpen: true });
      }
    };
  }
  handleConnectionSelect(event, value) {
    this.setState( { connectionType:"http" == value ? "HTPL" : "WS" } )
  }

  handleUChange(ev) {
    this.setState( {user: ev.target.value}, () => this.validate() );
  }

  validate() {
    this.setState({
      loginEnabled: this.state.user.trim().length > 0
    });
  }

  relogin() {
    // forcereload
    document.location.href = "/";
  }

  login() {
    var url,connectionType;
    if ( this.state.connectionType == 'HTLP' ) {
      url = "/api";
      connectionType = "HTLP";
    } else {
      url = "ws://"+document.location.host+"/ws";
      connectionType = "WS";
    }
    global.kclient
      .connect(url,connectionType)
        .then( (server,err) => {
          if ( err )
            this.setState( {error: ""+err} );
          else {
            global.server = server;
            server.login( this.state.user )
              .then( (session,err) => {
                if ( err )
                  this.setState( {error: ""+err} );
                else {
                  global.session = session;
                  console.log("logged in");
                  this.setState({loggedIn:true});
                }
              })
          }
      });
  }

  componentWillUpdate(nextProps,nextState) {
    if ( !this.state.loggedIn && nextState.loggedIn ) {
      console.log("will be logged in ..")
    }
  }

  render() {
    const actions = [
      <RaisedButton
        label="Ok"
        primary={true}
        onClick={ () => this.relogin() }
      />
    ];
    return (
      <MuiThemeProvider>
        <div>
          <p>{"Dummy:"+Dummy()+"  Dummy1:"+Dummy1()+"  DummyLambda:"+DummyLambda()}</p>
          <Snackbar
            open={this.state.snackOpen}
            message={this.state.snackText}
            autoHideDuration={4000}
            onRequestClose={ () => this.setState({snackText: "", snackOpen: false }) }
          />
          <Dialog
            title="Session expired"
            actions={actions}
            modal={true}
            open={this.state.relogin}
            onRequestClose={() => this.relogin()}
          >
            Session timed out. Pls relogin.
          </Dialog>
          <br/><br/><br/>
          <HCenter>
            <div style={{fontWeight: 'bold', fontSize: 18}}>
              Hello World !
            </div>
          </HCenter>
          <br/>
          { this.state.loggedIn ?
            <Fader><Greeter/></Fader>
            : (
              <Fader>
                <HCenter>
                  <TextField
                    onChange={ ev => this.handleUChange(ev) }
                    hintText="nickname"
                    floatingLabelText="Login"
                  />
                </HCenter>
                <br/>
                <HCenter>
                  <RadioButtonGroup name="connection" defaultSelected="http" onChange={(ev,val) => this.handleConnectionSelect(ev,val)}>
                    <RadioButton
                      value="http"
                      label="Http (adaptive long poll)"
                    />
                    <RadioButton
                      value="websockets"
                      label="WebSocket"
                    />
                  </RadioButtonGroup>
                </HCenter>
                <br/>
                <HCenter>
                  <RaisedButton
                    disabled={!this.state.loginEnabled}
                    onClick={ ev => this.login(ev) }>
                    Login
                  </RaisedButton>
                </HCenter>
              </Fader>
            )
          }
          <div>
            {this.state.error ? <div><b>error</b></div> : ""}
          </div>
          { this.state.loggedIn ?
          <div>
            <MaterialPlay/>
          </div>
            : <Static/>
          }
        </div>
      </MuiThemeProvider>
  )}

}

if ( typeof _kHMR === 'undefined' ) { // only load once, not when doing hot reloading
  global.app = <App/>;
  // required for hot reloading
  window._kreactapprender = ReactDOM.render(global.app,document.getElementById("root"));
}

////////// generated Hot Reloading support
if ( typeof _kHMR === 'undefined') {
  if ( typeof KClient === 'undefined' ) {
    console.error("hot module reloading requires 'import {KClient} from 'kontraktor-client''");
  }
  const hmrcl = new KClient().useProxies(false);
  let addr = "ws://"+ window.location.host + "/hotreloading";
  hmrcl.connect(addr,"WS").then( (conn, err) => {
    if ( err ) {
      console.error("failed to connect to hot reloading actor on '"+addr+"'. Hot reloading won't work.");
      console.error('add to server builder:".hmrServer(true)"\n' );
      return;
    }
    conn.ask("addListener", (r,e) => {
      console.log("a file has changed _appsrc/"+r);
      if ( ! window._kreactapprender ) {
        console.error("hot module reloading requires window._kreactapprender to be set to rect root. E.g. 'window._kreactapprender = ReactDOM.render(global.app,document.getElementById(\"root\"));' ");
        return;
      }
      if ( !r ) {
        console.error("failed to init hot reloading actor on '"+addr+"'. Hot reloading won't work.");
        console.error('add to server builder:".hmrServer(true)"\n' );
      }
      const lib = kimports[r];
      if ( lib ) {
        // fetch new source and patch
        fetch("_appsrc/"+r+".transpiled")
        .then( response => response.text() )
        .then( text => {
          const prev = kimports[r];
          const prevEval = __keval[r];
          const exp = eval("let _kHMR=true;"+text.toString());
          const patch = kimports[r];
          kimports[r] = prev;
          __keval[r] = prevEval;
          Object.getOwnPropertyNames(patch).forEach( topleveldef => {
            const istop = "__kdefault__" !== topleveldef && prev['__kdefault__'] === prev[topleveldef];
            if ( "__kdefault__" === topleveldef ) {
              // ignore
            } else if ( ! prev[topleveldef] ) {
              prev[topleveldef] = patch[topleveldef]; // new definition, FIXME: not locally visible, unsupported for now
            } else if ( patch[topleveldef]._kNoHMR ) {
              // unmarked for HMR
            } else if ( typeof patch[topleveldef] === 'function') {
              let src = patch[topleveldef].toString();
              const isclass = src.indexOf("class") == 0;
              const isfun = src.indexOf("function") == 0;
              if ( isfun || (!isclass) ) // assume function or lambda
              {
                if ( patch[topleveldef]._kwrapped && prev[topleveldef]._kwrapped ) {
                  let funsrc = patch[topleveldef]._kwrapped.toString();
                  let evalSrc = ""+topleveldef+" = "+funsrc+";"+topleveldef;
                  const newfun = __keval[r](evalSrc);
                  prev[topleveldef]._kwrapped = newfun;
                }
              } else if ( isclass ) {
                const newName = topleveldef;
                const newDef = __keval[r](newName+"="+src+"; "+newName);
                Object.getOwnPropertyNames(newDef.prototype).forEach( key => {
                  prev[topleveldef].prototype[key] = newDef.prototype[key];
                });
              } else { // should not happen
                console.error("unknown function object",src);
              }
            } else {
              Object.assign(prev[topleveldef],patch[topleveldef]);
            }
            if ( istop )
              prev['__kdefault__'] = prev[topleveldef];
          });
          window._kreactapprender.forceUpdate();
        });
      }
    }).then( (r,e) => { if (r) console.log('connected to hmr server' ); else console.log('could not subscribe to hmr server' );} );
  });
}
