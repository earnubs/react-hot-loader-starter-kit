BABEL = node_modules/.bin/babel
WEBPACK = node_modules/.bin/webpack
WEBPACK_ARGS = --config webpack/config.js
SRC = $(shell find src -name "*.js" -type f)
LIB = $(SRC:src/%.js=lib/%.js)

build: $(LIB) public/b.js

$(LIB): lib/%.js: src/%.js
	@mkdir -p $(@D)
	$(BABEL) $< --out-file $@ --copy-files

public/b.js: $(filter lib/client/%.js,$(LIB))
	@$(WEBPACK) $(WEBPACK_ARGS)

clean:
	rm -rf lib public

clean-deps:
	rm -rf node_modules

.PHONY: build clean clean-deps
