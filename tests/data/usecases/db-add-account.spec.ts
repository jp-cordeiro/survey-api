import { DbAddAccount } from '@/data/usecases/db-add-account'

describe('DbAddAccount Usecase', () => {
  class EncrypterStub {
    async encrypt(value: string): Promise<string> {
      return await new Promise(resolve => resolve('hashed_password'))
    }
  }

  test('should call encrypter with correct password', async () => {
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
