// api.js
import axios, { type AxiosRequestConfig } from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json'
  }
})

const ApiService = {
  fetchData(param: AxiosRequestConfig<any>) {
    return new Promise((resolve, reject) => {
      apiClient(param)
        .then((response) => {
          resolve(response.data)
        })
        .catch((errors) => {
          reject(errors)
        })
    })
  }
}

export default ApiService
