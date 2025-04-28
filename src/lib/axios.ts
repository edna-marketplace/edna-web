import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJlZG5hIiwic3ViIjoiYTk2OWZmZDAtYTdlNS00OTU3LWJiODUtMWUwMmI3Mjg2OTQ0IiwiZXhwIjoxNzQ1ODUyNTMyLCJpYXQiOjE3NDU4MTY1MzJ9.eD_pC-bCvrU0BGJ9nWUtwL-uW2bURV4j4atKLJQomJD_slqwa7TxwCxsVXAn-mythJsJotOe4ZwQP7NB1bsYIZB8l4e2qWDzZ-uIEzJ2NaSf2p0OVYUPbI3vK81nqgq-xu_GRVoEodSBS0L74QkA3saqxbX4-VL3g6-f-ZrvVBM49c7SkuY6TDP7QAHfMkKSKqXDaShaTgy2S9Z3sTuz9n2hjpEidKp_0g22cwqhKm5mAmG0P1lfFdcNG8Erp9zkvoJqBGnLEB_6ecd4ccp4KzuF97qlan4LiOOtqNGvOJyVgp_Jb2t5eV0o-kqbtMhkTE1GuHpAHNd-ne5ZQo63aA`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
