import { LoadAccountByEmailRepository } from '@/data/protocols/load-account-by-email-repository'
import { DbAuthentication } from '@/data/usecases/db-authentication'
import { AccountModel } from '@/domain/models/account'

const makeFakeAccount = (): AccountModel => {
  return {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }
}

const makeLoadAccountByEmailRespository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRespositoryStub implements LoadAccountByEmailRepository {
    async load(email: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
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
    await sut.auth(makeFakeAccount())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
