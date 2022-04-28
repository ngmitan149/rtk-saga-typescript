import Dashboard from './dashboard';
import Students from './students'
import Users from './user'

const allModules: { [key: string]: any } = {
  'Dashboard': Dashboard,
  'Students': Students,
  'Users': Users
}

export default allModules