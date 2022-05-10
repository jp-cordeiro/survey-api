import { LoadAccountByEmailRepository } from '@/data/protocols/db'
import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/useCases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await MongoHelper.allDataByCollection(accountCollection, result)
    return account
  }

  async loadByEmail(email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.findOne({ email })
    if (!result) {
      return null
    }
    const account = await MongoHelper.mapData(result)
    return account
  }
}
