.PHONY: build

install:
				@npm install

build:
				@npm run build

run:
				@echo "**************************************************"
				@echo "* open http://localhost:8080/webpack-dev-server/ *"
				@echo "**************************************************"
				@npm start

release:
				@./node_modules/.bin/mversion $@
