import { Authentication, AuthenticationModel } from '@/domain/useCases/authentication'
import { HashComparer } from '../protocols/criptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../protocols/db/load-account-by-email-repository'

export class DbAuthetication implements Authentication {
  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository, private readonly hashComparer: HashComparer) {}
  async auth(authenticationModel: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authenticationModel.email)
    if (account) {
      await this.hashComparer.compare(authenticationModel.password, account.password)
    }
    return null
  }
}
