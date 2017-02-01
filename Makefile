BABEL = node_modules/.bin/babel
WEBPACK = node_modules/.bin/webpack
LINT = node_modules/.bin/eslint

# node targetted babel: ignore .babelrc which targets webpack/browser
BABEL_ARGS = --no-babelrc --source-maps --presets=react \
	     --plugins=babel-plugin-transform-es2015-modules-commonjs
WEBPACK_ARGS = --config webpack/config.js -p

SRC = $(shell find src -name "*.js" -type f)
LIB = $(SRC:src/%.js=lib/%.js)

all : build

build : $(LIB) public

start :
	node ./lib/server/server.js

start-dev :
	node ./src/server/dev-server.js

# node/server libs
$(LIB) : lib/%.js: src/%.js
	mkdir -p $(@D)
	$(LINT) $<
	$(BABEL) $< --out-file $@ $(BABEL_ARGS)

# bundle for browser
public: $(filter src/client/%.js,$(SRC))
	mkdir ./public
	$(WEBPACK) $(WEBPACK_ARGS)

clean :
	rm -rf lib public

clean-deps :
	rm -rf node_modules

.PHONY: build clean clean-deps start start-dev
