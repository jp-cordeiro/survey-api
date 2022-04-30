import { LoadAccountByEmailRepository } from '@/data/protocols/db/load-account-by-email-repository'
import { DbAuthetication } from '@/data/usecases/db-authentication'
import { AccountModel } from '@/domain/models/account'

describe('DbAuthetication UseCase', () => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      const account: AccountModel = {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
      return await new Promise(resolve => resolve(account))
    }
  }
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthetication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
