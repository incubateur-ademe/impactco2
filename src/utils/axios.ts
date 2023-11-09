import axios from 'axios'

const axiosClient = axios.create({
  baseURL: '/',
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
  },
})

export default axiosClient
