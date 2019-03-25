# twitter-microservices

### High level design doc

#### tech

- Node, RabbitMQ, Cassandra, JSON-Schema, Docker, K8s, Helm

#### What is the app?
- A user makes post
- A user has a viewable list of their own posts
- A user can subscribe to other users
- A user has an activity feed of those they follow's posts (chronological order)

#### This app needs to provide the ability:
- To create a user
- To login a user
- To get a list of a user's posts
- To follow other users
- To retrieve an aggregated activity feed of posts from those they follow

#### Ergo, service breakdown:
- User service (CRUD for users)
- Auth service (Issuing token for authentication)
- Post service (Adding to user post list; "my posts")
- Follower service (Managing user - follow relationships)
- User feed service (Aggregating user activity feed; "my feed")
- API gateway

#### Service ethos:
- Each service should have copies of data it may require
- Each service will own its own set of tables, including tables owning denormalized data
- Each service will broadcast events other services may need (eventually consistent)
- Each service will provide an api (http, rest) for the gateway to delegate requests to
