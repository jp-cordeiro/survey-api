import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import jwt from 'jsonwebtoken'
describe('Jwt Adapter', () => {
  interface SutTypes {
    sut: JwtAdapter
  }

  const makeSut = (): SutTypes => {
    const sut = new JwtAdapter('secret')
    return { sut }
  }

  test('should call sign with correct values', async () => {
    const { sut } = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })
})
