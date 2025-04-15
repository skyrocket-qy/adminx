build:
	pnpm build
	rm -rf docs
	mv out docs

backup:
	git add .
	git commit -m "backup"
	git push