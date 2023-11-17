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
    expect(JSON.parse(r.data)).toStrictEqual({
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    })
  })
})
