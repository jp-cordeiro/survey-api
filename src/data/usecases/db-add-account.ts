import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/useCases/add-account'
import { Hasher } from '../protocols/criptography'
import { AddAccountRepository } from '../protocols/db'

export class DbAddAccount implements AddAccount {
  constructor(private readonly hasher: Hasher, private readonly addAccountRepository: AddAccountRepository) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.encrypt(accountData.password)
    const account = await this.addAccountRepository.add({
      ...accountData,
      password: hashedPassword
    })
    return account
  }
}
