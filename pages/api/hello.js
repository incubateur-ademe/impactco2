export default function handler(req, res) {
  // let host = req.headers.host;
  // let params = req.headers["x-invoke-query"];
  // let q = JSON.parse(decodeURIComponent(params));
  // let queryString = new URLSearchParams(q).toString();
  // res.status(200).json({ h: host, q: q, d: queryString });
  res.status(200).json({ h: req.headers });
}
