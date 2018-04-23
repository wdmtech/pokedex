import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import config from './config'

const socket = io(config.connection, { transports: ['websocket'] })

const feathersClient = feathers()
  .configure(socketio(socket), { timeout: 30000 })
  .configure(auth({ storage: window.localStorage }))

export default feathersClient
