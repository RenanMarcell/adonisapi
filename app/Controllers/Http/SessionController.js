'use strict'

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all();

    return await auth.attempt(email, password)
  }
}

module.exports = SessionController
