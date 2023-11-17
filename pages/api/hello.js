import axios from 'axios'

export default async function handler(req, res) {
  // Random unused remote API Call
  await axios.get('https://jsonplaceholder.typicode.com/posts')
  // Useful, but still remote API Call
  const data = await axios.get('https://jsonplaceholder.typicode.com/posts/1').then((resp) => {
    return {
      statusCode: 200,
      body: resp.data,
    }
  })
  return res.status(200).json(data?.body || { hello: 'world' })
}
