BABEL = node_modules/.bin/babel
WEBPACK = node_modules/.bin/webpack

BABEL_ARGS = --presets=react
WEBPACK_ARGS = --config webpack/config.js

SRC = $(shell find src -name "*.js" -type f)
LIB = $(SRC:src/%.js=lib/%.js)

build: $(LIB) public/b.js
#https://www.gnu.org/software/make/manual/html_node/Multiple-Targets.html
start: $(filter lib/server/%.js,$(LIB))
	node ./lib/server/index.js
#start-dev: node ./lib/server/dev.js

# transpile all sources for node/server environment
$(LIB): lib/%.js: src/%.js
	@mkdir -p $(@D)
	$(BABEL) $< --out-file $@ $(BABEL_ARGS)

# bundle for browser
public/b.js: $(filter src/client/%.js,$(SRC))
	@$(WEBPACK) $(WEBPACK_ARGS)

clean:
	rm -rf lib public

clean-deps:
	rm -rf node_modules

.PHONY: build clean clean-deps
