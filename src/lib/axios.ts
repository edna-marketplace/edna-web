import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJlZG5hIiwic3ViIjoiZTBlM2FlODQtYzA4YS00ZjQwLTgwNjMtZjc0YmViYmZlZTIxIiwiZXhwIjoxNzQ1OTI0OTA2LCJpYXQiOjE3NDU4ODg5MDZ9.DTbz_crfZs-GsfzFnBtako3UnFp6ue3hwdt6-l5jv8HeGdNak8euxdpb1lArOpz8Ba3m1HbicJ_VHL4su8JLYJsEMwMCdXzB14Xs7XZ7Tn9FopIo2aHFdtoADtRNs1m9aP2Q2EKqM7aipw_sR9zoESdqsUYoYcMZk_kkeQ3VFIsL5gwpv_AWskqqgN9ngefW2aH6-GYwUf7P0uHWpkyeSxcCetCOHJTN9JsgnPkKnXUn8XJrUipsUfiIvsvU9hNReBvo5vci03KqI5lfmX1MtXb5J2Uu76q5Mh3Q48786hRxzmqp-Z1pmy9gGA0VbdFBKvu87wQZwyFRYbnBOlQWYw`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
