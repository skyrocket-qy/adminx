20240726
Software
# Understand reason
The charming of SWE for me is: each design depends on some reason, so called 'Philosophy'.

Why is it so important?

I read a lot of code with bad sturct or design or document.

For example:
## Use lots of any and interface in Go
Go is a static type language, while static type makes it memory-efficient and easy to maintain and use. 
However, you can also define your parameters as any type, but, if any in too many places, it will seems like dynamic type language, if you don't handle any case or support explicit description, it will make other developers hardly to use it, and also lose the advantage of static type language.

