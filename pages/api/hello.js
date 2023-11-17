export default function handler(req, res) {
  return res.status(200).json({
    hello: 'world',
  })
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1kb',
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5,
}
