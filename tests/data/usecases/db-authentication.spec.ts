import { LoadAccountByEmailRepository } from '@/data/protocols/load-account-by-email-repository'
import { DbAuthentication } from '@/data/usecases/db-authentication'
import { AccountModel } from '@/domain/models/account'

const makeLoadAccountByEmailRespository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRespositoryStub implements LoadAccountByEmailRepository {
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
  return new LoadAccountByEmailRespositoryStub()
}

interface SutTypes {
  sut: DbAuthentication
  loadAccountByEmailRespositoryStub: LoadAccountByEmailRepository
}
const makeSut = (): SutTypes => {
  const loadAccountByEmailRespositoryStub = makeLoadAccountByEmailRespository()
  const sut = new DbAuthentication(loadAccountByEmailRespositoryStub)
  return {
    sut,
    loadAccountByEmailRespositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRespositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRespositoryStub, 'load')
    await sut.auth({
      email: 'any@email.com',
      password: 'any_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('any@email.com')
  })
})
