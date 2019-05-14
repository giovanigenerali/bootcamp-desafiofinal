'use strict'

const Model = use('Model')

class MeetupSubscriber extends Model {
  static boot () {
    super.boot()

    this.addHook('afterCreate', 'MeetupSubscriptionHook.sendMail')
  }

  meetup () {
    return this.belongsTo('App/Models/Meetup')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = MeetupSubscriber
