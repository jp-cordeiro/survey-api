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
  },
  async compare(): Promise<boolean> {
    return await new Promise(resolve => resolve(true))
  }
}))

describe('Bcrypt Adapter', () => {
  test('should call hash with correct value', async () => {
    const { sut } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', SALT)
  })

  test('should return a valid hash on hash success', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })

  test('should throw if bcrypt throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('should call compare with correct value', async () => {
    const { sut } = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('should return true when coompare succeeds', async () => {
    const { sut } = makeSut()
    const hash = await sut.compare('any_value', 'any_hash')
    expect(hash).toBeTruthy()
  })

  test('should return false when coompare fails', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
    const hash = await sut.compare('any_value', 'any_hash')
    expect(hash).toBeFalsy()
  })
})
