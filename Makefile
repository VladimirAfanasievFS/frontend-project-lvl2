install:
	npm install
publish:
	npm publish --dry-run
gitlg: 
	git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%C(bold blue)<%an>%Creset' --abbrev-commit"
lint:
	npx eslint .
lint-fix:
	npx eslint . --fix
test:
	npm run test	
test-watch: 
	npm run test-watch
test-coverage:
	npm test -- --coverage
.PHONY: test	



