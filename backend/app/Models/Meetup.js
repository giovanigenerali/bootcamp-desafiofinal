'use strict'

const Model = use('Model')

class Meetup extends Model {
  static scopeSubscribed (query, userId) {
    return query.whereHas('members', builder => {
      builder.where('user_id', userId)
    })
  }

  static scopeUpcoming (query) {
    return query.where('when', '>', 'now()')
  }

  static scopeRecomended (query, userPreferences) {
    query = query.whereHas('themes', builder => {
      builder.whereIn('theme_id', userPreferences)
    })
  }

  themes () {
    return this.belongsToMany('App/Models/Theme').pivotTable('meetup_themes')
  }

  members () {
    return this.belongsToMany('App/Models/User').pivotTable(
      'meetup_subscribers'
    )
  }
}

module.exports = Meetup
