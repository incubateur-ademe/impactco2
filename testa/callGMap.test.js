import server from 'nextjs-http-supertest'
import request from 'supertest'

describe.skip('CallGMap', () => {
  afterAll(() => {
    server.close() // don't forget to close your server after your tests
  })

  it('200: Should call the distancematrix API', async () => {
    const r = await request(server).get('/api/callGMap').query({ nantes: 'n' })
    expect(r.statusCode).toEqual(200)
  })
})
