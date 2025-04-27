import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJlZG5hIiwic3ViIjoiNDkwZjgyOTQtNWQzZi00NDQwLWFiNDctYWNlNGRjY2M5OTY1IiwiZXhwIjoxNzQ1ODExNDE5LCJpYXQiOjE3NDU3NzU0MTl9.YRGOXwpPj3plLi8ovUz6yKkZwBvTASq1GLVfGTBYKYUuc1998Jb3V9YiyLyb4LV3sgHzWQ0gCSHQbIL4IqQafVHaew2Dd3oRV0s6fVSEzDwy31hkoYEnQ5MJ9Y-126hU0bQppe39DQLAGwDzJ3EZq8PogYeva0f7nTzb-khYcmjVhvL3gPgoWOPKfTBfkCDy5iXFaRJsUAFs0UZa2h9KSkYfP-Ve138ebcC0r6mjdo8EtOe64gD6Jzcdbh0wf8y566fwADdE213Cw49BgOnuXu7G1uppCKTT6KjYd3Zm9j3fOdVT-t-72V5_Sff08TzOEPuM-b-G0eBckz_Q2vujUQ`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)