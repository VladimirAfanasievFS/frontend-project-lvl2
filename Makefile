install:
	npm install
start:
	npx babel-node src/bin/gendiff.js
publish:
	npm publish --dry-run
build:
	rm -rf dist
	npm run build
gitlg: 
	git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%C(bold blue)<%an>%Creset' --abbrev-commit"
make lint:
	npx eslint .
test:
	npm test	
test-coverage:
	npm test -- --coverage
.PHONY: test	



