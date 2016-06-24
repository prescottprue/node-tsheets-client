import cruder, { search, add } from '../utils/cruder'

export default () => {
  const endpoint = '/timesheets'
  const methods = {
    add: (project) => {
      if (!project.name) return Promise.reject({ message: 'name is required' })
      if (project.name.match(/[^A-Za-z0-9\-_!,() ]/)) {
        return Promise.reject({
          message: 'name may not contain symbols other than: _ ! , ( )'
        })
      }
      return add(endpoint)(project)
    }

  }

  return Object.assign(
    {},
    cruder(url, ['get']),
    methods
  )
}
