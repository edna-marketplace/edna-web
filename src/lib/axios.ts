import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJlZG5hIiwic3ViIjoiZDYwMWE3MDgtODBjYy00ZmU2LTlmOTEtM2E1MzQzZjE1YTE0IiwiZXhwIjoxNzQ3NDMxMzA4LCJpYXQiOjE3NDczOTUzMDh9.WULRwvslaUBHhGRV6TFwae2WT4825UjRcIINGpt1mpJH3F8WCK3Kqi34d-WtlUi05cHsP5tu3VGz6dTu9ogU-8TGZdXrLt04HoNwgpOMuITETq3HGqx0acmP18cv9N_e7TwIRYD1QZWFyUvFhYUI6kZItgFxb15NZVsQpYm8JVKUsROLkXEPHbIZyy57o-n-zmU2MioTsq0-Mke8yob0wN9ALcdsLLR7O6KZuGFOo7YSn3lH7dhsfRYHxnu9bnN_zT_g24l8gjdyBXBUfQ-hMMM5SCiSxK0S6U-kvRm9irmgWIJ04x_zl4IgTZGjmTwWrPdAY2psc0ReU2aaEco8Jw`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
