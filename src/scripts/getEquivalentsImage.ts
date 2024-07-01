import axios from 'axios'
import fs from 'fs'
import values from '../utils/Equivalent/values.json'

const getEquivalentsImage = async () => {
  const slugs = Object.keys(values)
  for (const index in slugs) {
    const slug = slugs[index]
    let response = await axios.get(`http://localhost:3000/api/dynamics/equivalents/${slug}?language=fr`, {
      responseType: 'stream',
    })
    response.data.pipe(fs.createWriteStream(`./public/meta/${slug}-fr.png`))

    response = await axios.get(`http://localhost:3000/api/dynamics/equivalents/${slug}?language=en`, {
      responseType: 'stream',
    })
    response.data.pipe(fs.createWriteStream(`./public/meta/${slug}-en.png`))
  }
}

getEquivalentsImage()
