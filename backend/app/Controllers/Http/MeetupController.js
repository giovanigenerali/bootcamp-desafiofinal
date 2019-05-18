'use strict'

const fs = use('fs')
const Helpers = use('Helpers')

const Meetup = use('App/Models/Meetup')

class MeetupController {
  async index ({ request, auth: { user } }) {
    const { page, type, title } = request.get()

    let query = Meetup.query()
      .withCount('members')
      .with('themes')

    /** search by title */
    if (title) {
      query = query.whereRaw(`LOWER(title) LIKE '%${title.toLowerCase()}%'`)
    }

    /** search by type */
    if (type) {
      if (type === 'subscribed') {
        query = query.subscribed(user.id)
      } else if (type === 'upcoming') {
        query = query.upcoming()
      } else if (type === 'recomended') {
        const userPreferences = (await user.preferences().fetch())
          .toJSON()
          .map(preference => preference.id)
        query = query.recomended(userPreferences)
      }
    }

    const meetups = await query.paginate(page)

    return meetups
  }

  async store ({ request, auth: { user } }) {
    const data = request.only([
      'title',
      'description',
      'where',
      'when'
    ])

    const meetup = await Meetup.create({
      ...data,
      user_id: user.id
    })

    const meetupImage = request.file('image', {
      types: ['image'],
      size: '2mb',
      extnames: ['png', 'jpg']
    })

    const imageName = `${meetup.id}.${meetupImage.extname}`

    await meetupImage.move(Helpers.tmpPath('uploads'), {
      name: imageName,
      overwrite: true
    })

    meetup.merge({ image: imageName })

    await meetup.save()

    const themesId = request.input(['themes_id'])

    if (themesId) {
      await meetup.themes().attach(themesId)
    }

    const meetupNew = await Meetup.query()
      .where('id', meetup.id)
      .with('themes')
      .fetch()

    return meetupNew
  }

  async show ({ params }) {
    const meetup = await Meetup.query()
      .where('id', params.id)
      .withCount('members')
      .with('themes')
      .fetch()

    return meetup
  }

  async update ({ params, request, response, auth: { user } }) {
    const meetup = await Meetup.query()
      .where('id', params.id)
      .first()

    if (meetup.user_id !== user.id) {
      return response.status(401).send({
        error: {
          message: 'Apenas o criador do meetup pode editá-lo.'
        }
      })
    }

    const data = request.only(['title', 'description', 'where', 'when'])

    const meetupImage = request.file('image', {
      types: ['image'],
      size: '2mb',
      extnames: ['png', 'jpg']
    })

    const imageName = `${meetup.id}.${meetupImage.extname}`

    await meetupImage.move(Helpers.tmpPath('uploads'), {
      name: imageName,
      overwrite: true
    })

    meetup.merge({ ...data, image: imageName })

    await meetup.save()

    const themesId = request.input(['themes_id'])

    if (themesId) {
      await meetup.themes().detach()
      await meetup.themes().attach(themesId)
    }

    const meetupUpdated = await Meetup.query()
      .where('id', params.id)
      .withCount('members')
      .with('themes')
      .fetch()

    return meetupUpdated
  }

  async destroy ({ params, response, auth: { user } }) {
    const removeImage = Helpers.promisify(fs.unlink)
    const meetup = await Meetup.find(params.id)

    if (meetup.user_id !== user.id) {
      return response.status(401).send({
        error: {
          message: 'Apenas o criador do meetupo pode excluí-lo'
        }
      })
    }

    if (meetup.image) {
      removeImage(`${Helpers.tmpPath('uploads')}/${meetup.image}`)
    }

    await meetup.delete()
  }
}

module.exports = MeetupController
