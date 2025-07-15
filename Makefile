build:
	pnpm build
	rm -rf docs
	mv out docs

bk:
	git add .
	git commit -m "backup"
	git push