import server from 'nextjs-http-supertest'
import request from 'supertest'

describe.skip('Hello', () => {
  afterAll(() => {
    server.close() // don't forget to close your server after your tests
  })

  it('200: Should call a simple "hello" API', async () => {
    const r = await request(server).get('/api/hello').query({ nantes: 'n' })
    console.log('r: ', r)
    expect(r.statusCode).toEqual(200)
  })
})
