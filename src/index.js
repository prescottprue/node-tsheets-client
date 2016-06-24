import * as utils from './utils'
import cruder, { get } from './utils/cruder'

export default class TSheets {
  /** Constructor
   */
  constructor () {
    this.utils = utils
  }
  timesheets () {
    return cruder('/timesheets', ['get', 'add', 'update', 'remove'])
  }
  jobcodes () {
    return cruder('/jobcodes', ['get', 'add', 'update', 'remove'])
  }
  groups () {
    return cruder('/groups', ['get', 'add', 'update', 'remove'])
  }
  users () {
    return cruder('/groups', ['get', 'add', 'update', 'remove'])
  }

  // Original API
  reportTime (reportData) {
    return cruder('/timesheets', reportData)
  }
  getTimesheets () {
    return get('/timesheets')()
  }
  getJobcodes () {
    return get('/timesheets')()
  }
}
export const timesheets = Object.assign({}, cruder('/timesheets', ['get', 'add', 'update', 'remove']))

export { utils, TSheets }
