import Adapter from 'enzyme-adapter-react-16'
import enzyme from 'enzyme'
import db from './server/db'

const adapter = new Adapter()
enzyme.configure({adapter})

beforeEach(() => {
  return db.sync({force: true})
})
