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

describe('Bcrypt Adapter', () => {
  test('should call bcrypt with correct value', async () => {
    const { sut } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })
})
