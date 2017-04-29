# Universal React/Redux Starter Kit with Hot Reloading

Other than a couple of bare bones 'container' components there is very little to this project aside from the setup for a JavaScript app that renders react both on server and client, with Expressjs and webpack.

Server side JS is compiled at install time (postinstall script) with Babel & Make using the babel config found in the Makefile, client side js is compiled via Webpack and uses the `.babelrc` found in the root directory (TODO use babel envs to put both server and client config in the same `.bablerc` file).

To start a development instance:

```
make start-dev
```

To start a development instance with debugging:

```
make start-debug
```

To start production:

```
make start
```

Deploy to heroku simply by pushing to heroku git or connecting to the repo on github, everything else should be setup to go, for example this repo is deployed here: https://react-universal-hot-starter.herokuapp.com/
