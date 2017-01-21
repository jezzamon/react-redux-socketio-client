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
#### React.PureComponent
Use **PureComponent** instead of **React.Component** when dealing with pure components that will pass down props that might change in value. It will run shouldComponentUpdate() internally. See note regarding PureRenderMixin being replaced by [React.PureComponent](https://facebook.github.io/react/docs/react-api.html#react.purecomponent)

Reasoning for using PureComponent (formerly pureRenderMixin ) with Immutable.js
"When this mixin is added to a component, it changes the way React checks for changes in the component's props (and state). Instead of a deep compare it does a shallow compare, which is much, much faster.

The reason we can do this is that by definition, there can never be changes within immutable data structures. If the props of a component are all immutable values, and the props keep pointing to the same values between renders, there can be no reason to re-render the component, and it can be skipped completely"

#### React-Redux
The big idea of react-redux is to take our pure components and wire them up into a Redux Store by doing two things:

Mapping the Store state into component input props.

Mapping actions into component output callback props.

Before any of this is possible, we need to wrap our top-level application component inside a react-redux Provider component. This connects our component tree to a Redux store, enabling us to make the mappings for individual components later.
