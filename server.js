const jsonServer = require('json-server')
const jwt = require('jsonwebtoken')
const fs = require('fs')
require('dotenv').config()
const queryString = require('query-string')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const SECRET_KEY = 'sunflower123'
const expiresIn = '24h'

function timeOut(time = 500) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done')
    }, time);
  })
}

// Create a token from a payload 
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}

// Verify the token 
function verifyToken(token){
  return jwt.verify(token, SECRET_KEY, (err, decode) => {
    if (decode !== undefined) {
      return decode
    }
    throw err
  })
}

// Check if the user exists in database
function isAuthenticated({username, password}){
  const db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))

  return db.users.findIndex(user => {
    return user.username === username && user.password === password
  }) !== -1
}

function getUser({username, password}){
  const db = JSON.parse(fs.readFileSync('./db.json', 'UTF-8'))

  return db.users.find(user => user.username === username && user.password === password)
}

server.use(async (_req, _res, next) => {
  await timeOut()
  next()
})

server.use(middlewares)

server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});


server.use(jsonServer.bodyParser);

server.post('/api/auth/login', (req, res) => {
  const {username, password} = req.body
  if (isAuthenticated({username, password}) === false) {
    const status = 401
    const message = 'Incorrect email or password'
    res.status(status).json({status, message})
    return
  }
  const user = getUser({username, password})
  const access_token = createToken({
    ...user,
    password: undefined
  })
  res.status(200).json({access_token})
})

server.use(/^\/api(?!\/auth).*$/, (req, res, next) => {
  if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
    const status = 401
    const message = 'Bad authorization header'
    res.status(status).json({status, message})
    return
  }
  try {
    verifyToken(req.headers.authorization.split(' ')[1])
    next()
  } catch (err) {
    const { expiredAt } = err

    const status = 401
    const message = 'Error: access_token is not valid'
    res.status(status).json({status, message, inValidToken: true, expiredAt})
  }
})

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updatedAt = Date.now();
  } else if (req.method === 'PATCH') {
    req.body.updatedAt = Date.now();
  }

  // Continue to JSON Server router
  next();
});

router.render = (req, res) => {
  // Check GET with pagination
  // If yes, custom output
  const headers = res.getHeaders();

  const totalCountHeader = headers['x-total-count'];
  if (req.method === 'GET' && totalCountHeader) {
    const queryParams = queryString.parse(req._parsedUrl.query);

    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 10,
        _totalRows: Number.parseInt(totalCountHeader),
      },
    };

    return res.jsonp(result);
  }

  // Otherwise, keep default behavior
  res.jsonp(res.locals.data);
};

server.use('/api', router)

const PORT = process.env.MOCK_PORT || 3000;
server.listen(PORT, () => {
  console.log('JSON Server is running on PORT: ', PORT);
});
