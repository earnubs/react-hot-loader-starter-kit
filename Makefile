BABEL = node_modules/.bin/babel
WEBPACK = node_modules/.bin/webpack
LINT = node_modules/.bin/eslint
JEST = node_modules/.bin/jest

# node targetted babel: ignore .babelrc which targets webpack/browser
BABEL_ARGS = --no-babelrc --source-maps --presets=react,stage-2 \
	     --plugins=babel-plugin-transform-es2015-modules-commonjs

WEBPACK_PROD_ARGS = --config webpack/production.js -p
WEBPACK_DEV_ARGS = --config webpack/development.js

SRC_DIR := src

SRC = $(shell find $(SRC_DIR) -name "*.js" -type f)
LIB = $(SRC:src/%.js=lib/%.js)

all : build

build : $(LIB) public/.dirstamp public/favicon.ico

start : build
	node ./lib/server/server.js

start-dev : public/favicon.ico
	node ./src/server/dev-server.js

start-debug :
	DEBUG=express:* node --inspect ./src/server/dev-server.js

test:
	$(JEST)

watch:
	fswatch -o $(SRC_DIR) | xargs -n1 -I{} $(MAKE) build

# node/server libs
$(LIB) : lib/%.js: src/%.js
	mkdir -p $(@D)
	$(LINT) $< --fix
	$(BABEL) $< --out-file $@ $(BABEL_ARGS)

# bundle for browser
public/.dirstamp: $(filter src/client/%.js,$(SRC))
	mkdir -p ./public && touch $@
ifeq ($(strip $(NODE_ENV)), production)
	@echo "Webpack building with production config"
	$(WEBPACK) $(WEBPACK_PROD_ARGS)
else
	@echo "\033[41mWebpack building with development config\033[0m"
	$(WEBPACK) $(WEBPACK_DEV_ARGS)
endif

public/favicon.ico: assets/favicon.ico
	mkdir -p ./public
	cp $< $@

clean :
	rm -rf lib public webpack_cache

clean-deps :
	rm -rf node_modules

.PHONY: build clean clean-deps start start-dev
