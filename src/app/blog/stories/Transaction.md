20240725
Software

# What is a Transaction?

A transaction is a concept used to ensure the atomicity of a set of operations. This means that a transaction can have only two outcomes: either all operations are completed successfully (commit), or none of them are (rollback).

# Why is transaction so importanct?

Jimmy has accounts A and B in the same bank. One day, Jimmy wants to transfer $100 from account A to account B. This involves two steps:

1. Decrease $100 from account A.
2. Increase $100 in account B.
It seems simple, right?

But if we don't ensure that both steps are part of the same transaction, and step 1 succeeds but step 2 fails due to an error, what happens?

A major problem arises! The $100 disappears, which could lead to even more severe issues.

# Why are distributed transactions so hard?

There are many factors across different services that can cause problems, such as network issues, storage failures, and system crashes. These factors can lead to many uncertain states, making it difficult to ensure that all parts of the transaction either commit or roll back together.

# How to solve that?

There are several methods to handle distributed transactions, such as WAL (Write-Ahead Logging), 2PC (Two-Phase Commit), and versioning. However, these methods may introduce other problems, like performance issues. You need to choose the approach based on your specific use case.

Here are some suggestions:

- If the load is not too high: Avoid using microservices and multiple databases. While these approaches offer advantages like scalability, they also introduce complexity.
- If you need to use microservices or multiple databases: Carefully separate the use cases and database schemas to ensure that a set of operations is handled within the same service or database whenever possible.
- If you must handle transactions across multiple services and databases: Implement a compensation mechanism to address failures. However, be aware that this will add complexity to your system.

