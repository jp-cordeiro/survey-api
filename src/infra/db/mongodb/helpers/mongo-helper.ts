import { AccountModel } from '@/domain/models/account'
import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as String,
  async connect(url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(url)
  },
  async disconnect(): Promise<void> {
    this.client.close()
    this.client = null
  },
  async getCollection(name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.url)
    }
    return this.client.db().collection(name)
  },
  map(account: any): AccountModel {
    const { _id, ...accountData } = account
    return { id: _id, ...accountData }
  }
}
