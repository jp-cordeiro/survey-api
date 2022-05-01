import { JwtAdapter } from '@/infra/criptography/jwt-adapter'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign: (): string => {
    return 'any_token'
  }
}))

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

  test('should return a token on sign success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.encrypt('any_id')
    expect(accessToken).toBe('any_token')
  })

  test('should throw if sign throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const accessToken = sut.encrypt('any_id')
    await expect(accessToken).rejects.toThrow()
  })
})
