import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'
import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/useCases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const accountResult = await accountCollection.findOne({
      _id: result.insertedId.toHexString
    })
    const account = MongoHelper.map(accountResult)
    return account
  }
}
