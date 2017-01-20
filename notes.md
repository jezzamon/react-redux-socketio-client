## Notes


### Tests

regarding : test script in node 

```
"test": "mocha --compilers js:babel-core/register --require ./test/test_helper.js \"test/**/*@(.js|.jsx)\""
```


This is almost the same command that we used in the server's package.json. There only difference is in the test file specification: On the server we just used --recursive, but that option won't find .jsx files. We need to use a glob that will find all .js and .jsx test files.


We should also set up react-hot-loader. It will make our development workflow much faster by reloading code for us without losing the current state of the app.
To render a component in a unit test, we can use a helper function called **renderIntoDocument**, which will be in the React test utilities package

```
import { renderIntoDocument } from 'react-addons-test-utils';
```
### React.PureComponent
Use **PureComponent** instead of **React.Component** when dealing with pure components that will pass down props that might change in value. It will run shouldComponentUpdate() internally. See note regarding PureRenderMixin being replaced by [React.PureComponent](https://facebook.github.io/react/docs/react-api.html#react.purecomponent)
