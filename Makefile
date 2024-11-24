install:
	npm ci

run1:
	node bin/gendiff.js ./__fixtures__/file1.json ./__fixtures__/file2.json

run2:
	node bin/gendiff.js file1.json file2.json

run3:
	node bin/gendiff.js ./__fixtures__/filePlan1.json ./__fixtures__/filePlan2.json

run4:
	node bin/gendiff.js --format plain file1.json file2.json

run7:
	node bin/gendiff.js --format json file1.json file2.json

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

publish:
	npm publish --dry-run

lint:
	npx eslint .

lintFix:
	npx eslint . --fix