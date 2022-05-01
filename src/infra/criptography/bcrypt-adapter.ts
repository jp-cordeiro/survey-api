import { HashComparer, Hasher } from '@/data/protocols/criptography'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {
    this.salt = salt
  }

  async encrypt(value: string): Promise<string> {
    const hashed = await bcrypt.hash(value, this.salt)
    return hashed
  }

  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }
}
