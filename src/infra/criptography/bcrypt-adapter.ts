import { Hasher } from '@/data/protocols/hasher'
import bcrypt from 'bcrypt'

export class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) {
    this.salt = salt
  }

  async encrypt(value: string): Promise<string> {
    const hashed = await bcrypt.hash(value, this.salt)
    return hashed
  }
}
