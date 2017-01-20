## Notes
regarding : test script in node 

```
"test": "mocha --compilers js:babel-core/register --require ./test/test_helper.js \"test/**/*@(.js|.jsx)\""
```


This is almost the same command that we used in the server's package.json. There only difference is in the test file specification: On the server we just used --recursive, but that option won't find .jsx files. We need to use a glob that will find all .js and .jsx test files.