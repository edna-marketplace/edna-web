import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080',
})

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJlZG5hIiwic3ViIjoiOWMwYjQ2NjQtMmRkMy00ODA3LWFiZGItYjg0M2YyNjgxZDIyIiwiZXhwIjoxNzQ3MTc1NTEzLCJpYXQiOjE3NDcxMzk1MTN9.m1MrUO9WAx2Kf_khMzIz0PoKMujaPIpL5raGuVFW6WxVr1RhHOBiOsS8rZN_Kl5AoDNQhBDQEDoLzrPF2JGT1XSpdNllSd7_fyqGJCL8szBwAuHPW7LqhdJyWrAgwDuvXE5WxR4zN_Zc3J4IPo0rP9SUbdJxrk-LaETIto7-iTrVfiRBVtg8CN7sesQCbdMDgf53x423bpkoUALB7_I-q2Z8vYQH-BpvThH7VHhP-Dj2g-mgegtI0ZoOVgBTaNOOyig6kItfEgBPuadPoS9DPxihEYzDtXMQWsNn0P37Q4hdlJhPZMVx05JmVSgCXPOpbYGcIkLSNXaJuZZNcQppPQ`
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
