import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/useCases/add-account'
import { AddAccountRepository } from '../protocols/add-account-repository'
import { Encrypter } from '../protocols/encrypter'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    })
    return account
  }
}
