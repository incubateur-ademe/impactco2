import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

export default function useSubscribeEmail() {
  return useMutation((email) =>
    axios.get(`/.netlify/functions/subscribeEmail?email=${email}`)
  )
}
