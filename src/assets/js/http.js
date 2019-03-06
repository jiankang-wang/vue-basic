import 'babel-polyfill'
import flyio from 'flyio'

const local = location.host.includes('localhost')
let http = {}
// const sign = localStorage.token
const sign = '7942c4f3404724e1d8c57c378b7ee31d'
const common = { sign }
const APIS = {
  area: {
    url: `/api/ecses/region`,
    method: 'GET'
  }
}

flyio.config.baseURL = local ? 'http://192.168.2.211:8010' : ''
// flyio.config.withCredentials = true
flyio.config.timeout = 100000
flyio.config.responseType = 'json'

flyio.interceptors.request.use(config => {
  let contentType = 'application/json'
  if (config.method === 'POST' || config.method === 'PATCH') contentType = 'application/x-www-form-urlencoded'
  config.headers['Content-Type'] = contentType
  config.headers['AccessId'] = '1111'
  config.headers['RegionId'] = '22222'
  return config
},
error => {
  return Promise.reject(error)
})

flyio.interceptors.response.use(
  response => {
    return response
  },
  error => {
    switch (error.status) {
      case 401:
        if (!local) {
          location.href = '/loginview'
        }
        break
    }
    return Promise.reject(error)
  }
)

for (let api of Object.keys(APIS)) {
  http[api] = (params) => fetch({
    api,
    params
  })
}

const matchUri = (url, params) => {
  url = url.replace(/\$\w+/, a => {
    const key = a.slice(1)
    const val = params[key]
    delete params[key]
    return val
  })
  return url
}

const fetch = (options) => {
  if (options.constructor !== Object) throw new Error('fetch options must be object!')
  if (!options.api && !options.url) throw new Error('fetch options have no api or url!')

  return new Promise((resolve, reject) => {
    const fromApi = !!options.api
    let { method, url } = fromApi ? APIS[options.api] : options
    if (!method) throw new Error('fetch options have no method!')
    if (url.includes('$')) {
      url = matchUri(url, options.params)
    }

    const params = Object.assign(options.params || {}, common)

    flyio[method.toLowerCase()](url, params, options.configs)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}

export {
  http,
  fetch
}
