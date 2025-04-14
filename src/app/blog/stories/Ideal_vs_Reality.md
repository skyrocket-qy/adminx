20240914
Software
# Motivation
I had a discussion about git flow with colleague recently.

I suggested a test flow:

1. Backend develop the feature and build to image.
2. Frontend run the backend's image on local and develop the frontend feature.

I don't talk about the pros and cons here, but this suggesion is rejected by my colleague, who thinks it violates the "separation of frontend and backend" because frontend need to run it on his own machine.

So, I asked the chatGPT, it's answer is:

Does this violate the separation of backend and frontend?

Not necessarily. Here's why:
Frontend-Backend separation typically refers to keeping the codebases, responsibilities, and concerns distinct. Frontend deals with user interfaces and interaction, while backend focuses on business logic, databases, and APIs.
In your scenario, the codebases are still separate, and each team is responsible for its respective part (frontend or backend).


That is what I think, but in fact, those all are conventions, not absolutely. So I can understand the difference about the boundaries of frontend and backend.

# Ideal vs Realistic
In my career, I have been working on three companies. Exactly, The three companies has three different scales:
- Large scale company: The division of labor is clear, I only do what I need to do.
- Medium scale company: Not just do my work, sometimes I need to do something with DevOps or QA instead of backend, but seldom.
- Small scale company: Because of the lack of some position, I do more things with DevOps, QA, PM...etc.

Why I talk about this?

In Software Engineering, we often need to think about "trade-off", for those philosophy proposed by pioneers, we need to realize its origin, and compare with current environment instead of pursuit blindly.

# Do best choice in the moment
