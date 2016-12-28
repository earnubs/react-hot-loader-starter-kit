BABEL = node_modules/.bin/babel
WEBPACK = node_modules/.bin/webpack
WEBPACK_ARGS = --config webpack/config.js
SRC = $(shell find src -name "*.js" -type f)
LIB = $(SRC:src/%.js=lib/%.js)

build: $(LIB) public/b.js

$(LIB): lib/%.js: src/%.js
	@mkdir -p $(@D)
	@echo -n .
	@$(BABEL) $< --out-file $@ --copy-files

public/b.js: ./lib/client/*.js
	@echo
	@$(WEBPACK) $(WEBPACK_ARGS)

clean:
	rm -rf lib public

clean-deps:
	rm -rf node_modules

.PHONY: build clean clean-deps
