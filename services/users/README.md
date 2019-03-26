## Users service

#### What is a user?
```
{
  username: text (pk),
  display_name: text,
  email: text (uniq),
  password: text (bcrypted)
}
```

#### Access patterns?
* get a user's details by their email
* create a user
* update a user's display_name or password
* delete a user