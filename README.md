Nerve
=====
[![Last Release](https://badge.fury.io/gh/AlexAltea%2Fnerve.svg)](https://github.com/AlexAltea/nerve/releases)

Front-end for PlayStation 3 debuggers. Please, understand that I'm not interested on providing support, releases, or attention to any comments, issues or pull requests for now.

### Deploy
To build the Nerve client, clone the *master* branch of this repository, and do the following:

**1.** Install the development and client dependencies:
```
npm install
bower install
```

**2.** Install the TypeScript definiton files from the dependencies:
```
tsd install angular
tsd install bootstrap
tsd install jquery
```

**3.** Finally, build the app with:
```
grunt build
```
