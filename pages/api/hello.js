export default function handler(req, res) {
  let headers = req.headers;
  let query = req.query;
  let queryString = new URLSearchParams(query).toString();
  res.status(200).json({ h: headers, q: query, qs: queryString, def: !!process.env.GMAP_API_KEY });
}
