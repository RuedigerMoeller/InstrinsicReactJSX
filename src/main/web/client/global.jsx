import {KClient} from 'kontraktor-client'

const global = {
  kclient: new KClient(),
  app: null,
  server: null,
  session: null
};

export default global;