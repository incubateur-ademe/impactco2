import axios from 'axios'
import fs from 'fs'
import values from '../utils/Equivalent/values.json'

const getEquivalentsImage = async () => {
  const slugs = Object.keys(values)
  for (const index in slugs) {
    const slug = slugs[index]
    const response = await axios.get(`http://localhost:3000/api/dynamics/equivalents/${slug}`, {
      responseType: 'stream',
    })
    response.data.pipe(fs.createWriteStream(`./public/meta/${slug}.png`))
  }
}

getEquivalentsImage()
