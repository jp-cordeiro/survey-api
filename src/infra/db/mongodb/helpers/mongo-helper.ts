import { AccountModel } from '@/domain/models/account'
import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },
  async diconnect(): Promise<void> {
    this.client.close()
  },
  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  },
  map(account: any): AccountModel {
    const { _id, ...accountData } = account
    return { id: _id, ...accountData }
  }
}
