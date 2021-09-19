import request from 'supertest'
import app from '@/main/config/app'

describe('SignUo Routes', () => {
  test('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({ name: 'Luffy', email: 'luffy@op.com', password: 'niku123', passwordConfirmation: 'niku123' })
      .expect(200)
  })
})
