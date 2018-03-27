const isDev = Boolean(process.env.NODE_ENV !== 'production')

const urls = {
  api: {
    local: 'http://localhost:3030',
    remote: 'https://api.pokedex.wdmtech.co.uk'
  }
}
export default {

  // Main API server
  connection: isDev
    ? urls.api.local
    : urls.api.remote

}
