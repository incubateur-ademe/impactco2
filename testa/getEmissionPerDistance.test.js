import server from 'nextjs-http-supertest'
import request from 'supertest'

describe.skip('getEmissionPerDistance', () => {
  afterAll(() => {
    server.close()
  })

  it('200: Should call the getEmissionPerDistance', async () => {
    const r = await request(server)
      .get('/api/getEmissionPerDistance')
      .query({ km: '3', fields: 'description', transportations: '14' })
    expect(r.statusCode).toEqual(200)
  })
})
