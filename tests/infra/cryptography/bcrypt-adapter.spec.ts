import { BcryptAdapter } from '@/infra/criptography/bcrypt-adapter'
import bcrypt from 'bcrypt'
interface SutTypes {
  sut: BcryptAdapter
}
const SALT = 12

const makeSut = (): SutTypes => {
  const sut = new BcryptAdapter(SALT)
  return {
    sut
  }
}

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct value', async () => {
    const { sut } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })
  test('should call bcrypt with correct value', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
