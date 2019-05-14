'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User/Store')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.get('profile', 'UserController.show')
  Route.put('profile', 'UserController.update').validator('User/Update')

  Route.resource('meetups', 'MeetupController')
    .apiOnly()
    .validator(
      new Map([
        [['meetups.store'], ['Meetup/Store']],
        [['meetups.update'], ['Meetup/Update']]
      ])
    )

  Route.post('meetups/:id/subscriber', 'MeetupSubscriberController.store')
  Route.delete('meetups/:id/unsubscriber', 'MeetupSubscriberController.delete')

  Route.get('images/:path', 'ImageController.show')
}).middleware('auth')
