# My Buddy Virtual Pet: Showtime
The biggest update to My Buddy (code named 'Showtime') is set to be a near rewrite of the game's infrastructure. That
means a lot of goodies for you :)

## Updates
### Move Character Interaction to Backend
Perhaps the biggest single improvement is the inclusion of our own custom backend. This will allow us to move all
character manipulation on our end, preventing hackability and allowing us to squash more bugs.

### Get Rid of Dependence on Firebase
With the inclusion of our own backend, then there's no reason for us to use Firebase anymore! This update will use a
MongoDB instance for our database and we'll handle authentication with Google ourselves. Unfortunately, this means
all user data will likely be lost once this update is deployed

## Future
Those are only _very_ brief descriptions of just a few of the many changes we're making. As we're developing this update,
we may decide to add, remove, or modify features not listed here. We'll do our best to keep track of everything here, but
keep a lookout soon for our feature complete v1.0 release!
