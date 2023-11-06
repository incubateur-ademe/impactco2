import { useMutation } from '@tanstack/react-query'

// import axios from 'axios'

export default function useSubscribeEmail() {
  return useMutation((email) => {
    // return axios.get(`/.netlify/functions/subscribeEmail?email=${email}`)
    console.log('Function is not more in use for email starting with', email[0])
    return
  })
}
