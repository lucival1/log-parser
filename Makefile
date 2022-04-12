.PHONY: build_1 build_2 start_1 start_2 emit_logs clean_level_1 clean_level_2

level_1: install build_1 start_1
level_2: install build_2 start_2

install:
	npm install

build_1:
	npm run build:level_1

start_1:
	npm run start:level_1

clean_level_1:
	npm run prebuild:level_1

start_1:
	npm run start:level_1

build_2:
	npm run build:level_2

start_2:
	npm run start:level_2

clean_level_2:
	npm run prebuild:level_2

test:
	npm run test

emit_logs:
	npm run emit_logs
