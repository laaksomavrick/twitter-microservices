## User profile service

The user profile service provides read and update operations against a particular user's profile information - data like their display name, phone number, whatever. This data would be particularly useful for any client to provide display information (e.g, a profile photo url and a handle they can change without affecting their underlying `user` data).

A user profile record will be populated when a new user is made via a broadcasted event from the user service. From there, read/update operations can be made against the configurable portions of the record (ie, everything that isn't the username or email).

#### What is a user profile in the data model?

```
{
  username: text (pk),
  email: text (uniq),
  display_name: text
}
```

#### Access patterns

- Retrieve a user's profile by their username
- Update a user's profile by their username and some body data
