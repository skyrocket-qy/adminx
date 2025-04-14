20240724
Software
# Why need sequential transaction?
Consider the following case:

We have 3 dbs: A, B
And Two usecases: g, h, each usecase also use A and B dbs.

If someone code like:
```
// usecase g
A.Transaction(){
  B.Transaction(){}
}

// usecase h
B.Transaction(){
  A.Transaction(){}
}
```

# Deadlock problem
If g locked the A, at the same time, h locked the B, now g is waiting for B's lock and h also waits for A's too. Looks like two cars drived reversed direction at the same road which only can bypass by one. If all is waiting each other, all things worse.

# Solution
I support a easy solution: all usecases must lock dbs in same sequence, just looks like we limit the road only can drive in one direction.

[See the Go example](https://github.com/skyrocketOoO/GoUtils/blob/main/SequenceTransaction/SequenceTransaction.go)

