import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

//global is the node object to refer to the global scope outside of the node module
global.document = doc;
global.window = win;


//we need to take all the properties that the jsdom window object contains, such as navigator, and hoist them on to the Node.js global object. This is done so that properties provided by window can be used without the window. prefix, which is what would happen in a browser environment. Some of the code inside React relies on this:
Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

chai.use(chaiImmutable);