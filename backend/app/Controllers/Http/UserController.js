'use strict'

const Hash = use('Hash')

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['name', 'email', 'password'])
    const user = await User.create(data)

    return user
  }

  async show ({ auth: { user } }) {
    const profile = await User.query()
      .where('id', user.id)
      .with('preferences')
      .first()

    return profile
  }

  async update ({ request, response, auth: { user } }) {
    const data = request.only(['name', 'email', 'password'])

    if (!data.password) {
      delete data.password
    }

    user.merge(data)

    await user.save()

    const preferencesId = request.input(['preferences_id'])

    if (preferencesId) {
      await user.preferences().detach()
      await user.preferences().attach(preferencesId)
    }

    const userUpdated = await User.query()
      .where('id', user.id)
      .with('preferences')
      .fetch()

    return userUpdated
  }
}

module.exports = UserController
