'use strict'

const MeetupSubscriber = use('App/Models/MeetupSubscriber')

class MeetupSubscriberController {
  async store ({ params, response, auth: { user } }) {
    const subscribed = await MeetupSubscriber.query()
      .where('meetup_id', params.id)
      .where('user_id', user.id)
      .first()

    if (subscribed) {
      return response.status(406).send({
        error: {
          message: 'Você já está inscrito no meetup.'
        }
      })
    }

    await MeetupSubscriber.create({
      meetup_id: params.id,
      user_id: user.id
    })
  }

  async delete ({ params, response, auth: { user } }) {
    const unsubscribed = await MeetupSubscriber.query()
      .where('meetup_id', params.id)
      .where('user_id', user.id)
      .first()

    if (!unsubscribed) {
      return response.status(406).send({
        error: {
          message:
            'Você não está inscrito no meetup para cancelar sua inscrição.'
        }
      })
    }

    await unsubscribed.delete()
  }
}

module.exports = MeetupSubscriberController
