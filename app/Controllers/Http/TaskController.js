'use strict'

const Task = use('App/Models/Task')
class TaskController {
  async index ({ params }) {
    return Task.query()
      .where('project_id', params.projects_id)
      .with('user')
      .fetch()
  }

  async store ({ request, params }) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    return Task.create({ ...data, project_id: params.project_id })
  }

  async show ({ params }) {
    return Task.findOrFail(params.id)
  }

  async update ({ params, request }) {
    const task = Task.findOrFail(params.id)
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    task.merge(data)
    await task.save()

    return task
  }

  async destroy ({ params }) {
    const task = Task.findOrFail(params.id)

    await task.delete()
  }
}

module.exports = TaskController
