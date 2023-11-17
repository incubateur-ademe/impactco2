import axios from 'axios'

export default async function handler(req, res) {
  const data = await axios.get('https://jsonplaceholder.typicode.com/posts/1').then((resp) => {
    console.log('resp: ', resp)
    return {
      statusCode: 200,
      body: resp.data,
    }
  })
  return res.status(200).json(data?.body || { hello: 'world' })
}
