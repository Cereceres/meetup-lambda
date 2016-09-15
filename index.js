'use strict'
let request = require('request')

exports.handler = function (_params, ctx, cb) {
  try {
    let params = {
      method: _params.method || 'GET',
      uri: 'https://api.meetup.com/' +
      (_params.path ? _params.path.join('/') : '2/open_events')
    }

    let qs = {}
    _params.andTxt && (qs.and_text = _params.andTxt)
    //         and_text
    // Changes the interpretation of the "text" field from OR'd terms to AND'd terms
    _params.category && (qs.category = _params.category)
    // category
    // Return events in the specified category or categories specified by commas.
    // This is the category id returned by the Categories method.
    //
    _params.city && (qs.city = _params.city)
    // city
    // A valid city
    //

    _params.country && (qs.country = _params.country)
    // country
    // A valid country code

    _params.fields && (qs.fields = _params.fields)

          //
          // fields
          // Request that additional fields (separated by commas) be included in the output
          //

    _params.lat && (qs.lat = _params.lat)
    // lat
    // A valid latitude, limits the returned group events to those within radius miles
    //

    _params.limited_events && (qs.limited_events = _params.limited_events)
    // limited_events
    // Include limited event information for private groups that wish to expose only a small
    //  amount of information about their events. This includes just: id, name, utc_offset, time,
    //   duration, yes_rsvp_count, waitlist_count, group, visibility, timezone. Value must be true or false.
    //

    _params.lon && (qs.lon = _params.lon)

          // lon
          // A valid longitude, limits the returned group events to those within radius miles
          //

    _params.radius && (qs.radius = _params.radius)
    // radius
    // Radius, in miles for geographic requests, default 25.0 -- maximum 100. May also be specified as "smart",
    //  a dynamic radius based on the number of active groups in the area
    //

    _params.state && (qs.state = _params.state)
    // state
    // If searching in a country with states, a valid 2 character state code
    //

    _params.status && (qs.status = _params.status)
    // status
    // Status may be "upcoming", "past" or both separated by a comma. The default is "upcoming" only
    //

    _params.text && (qs.text = _params.text)
    // text
    // Events that contain the given term or terms somewhere in their content. The terms are OR'd by default.
    // Separate terms with " AND " for events that have combined terms. To have terms automatically AND'd, set the "and_text" to true
    //

    _params.text_format && (qs.text_format = _params.text_format || 'plain')
    // text_format
    // Format of the description text, "html" or "plain". Defaults to "html"
    //

    _params.time && (qs.time = _params.time)
    // time
    // Return events scheduled within the given time range, defined by two times separated with a single comma.
    //  Each end of the range may be specified with relative dates, such as "1m" for one month from now, or by
    //  absolute time in milliseconds since the epoch. If an endpoint is omitted, the range is unbounded on that end.
    //  The default value is unbounded on both ends (though restricted to the search window described above).
    //  Note: to retrieve past events you must also update status value
    //

    _params.topic && (qs.topic = _params.topic)
    // topic
    // Return events in the specified topic or topics specified by commas. This is the topic "urlkey" returned by the Topics method.
    // If all supplied topics are unknown, a 400 error response is returned with the code "badtopic".
    //

    _params.zip && (qs.zip = _params.zip)
    // zip
    // A valid US zip code, limits the returned groups to those within radius miles
    _params.key && (qs.key = _params.key)
    params.qs = qs
    console.log('params : ', params)
    request(params, function (err, res, body) {
      let message
      try {
        message = JSON.parse(body)
      } catch (err) {
        message = body
      }
      if (message.problem)console.log('problem : ', message.problem, 'details : ', message.details)
      let response = message.results || message
      cb(err, response)
    })
  } catch (err) {
    console.error('error in function lambda', err)
    cb(err, null)
  }
}
