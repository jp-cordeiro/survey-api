import { Collection, MongoClient, Document } from 'mongodb'

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
  mapData(result: Document): any {
    const data = { id: result._id.toHexString(), ...result }
    return data
  },
  async allDataByCollection(collection: Collection<Document>, result: Document): Promise<any> {
    const dataResult = await collection.findOne({
      _id: result.insertedId.toHexString
    })
    const { _id, ...rest } = dataResult
    const data = { id: _id, ...rest }
    return data
  }
}
