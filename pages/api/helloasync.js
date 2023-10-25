import axios from 'axios'

export default async function handler(req, res) {
  // const products = await fetch(`https://dummyjson.com/products/1`);
  const products = await axios.get(`https://dummyjson.com/products/1`).then((resp) => ({
    statusCode: 200,
    body: resp.data,
  }))
  res.status(200).json({ products: products })
}
