export default function handler(req, res) {
  let headers = req.headers;
  let query = req.query;
  let queryString = new URLSearchParams(query).toString();
  // let host = req.headers.host;
  // let params = req.headers["x-invoke-query"];
  // let q = JSON.parse(decodeURIComponent(params));
  // res.status(200).json({ h: host, q: q, d: queryString });
  res.status(200).json({ h: headers, q: query, qs: queryString });
}
