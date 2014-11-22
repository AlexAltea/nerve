Nerve
=====
[![Last Release](https://badge.fury.io/gh/AlexAltea%2Fnerve.svg)](https://github.com/AlexAltea/nerve/releases)

Front-end for PlayStation 3 debuggers. Please, understand that I'm not interested on providing support, releases, or attention to any comments, issues or pull requests for now.

### Deploy
To build, clone the *master* branch of this repository, and run following commands on it:

Install the development and client dependencies:
```
npm install
bower install
```

Install the TypeScript definiton files from the dependencies:
```
tsd install angular
tsd install jquery
```

Finally, build the app with:
```
grunt build
```
