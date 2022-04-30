import { Authentication, AuthenticationModel } from '@/domain/useCases/authentication'
import { LoadAccountByEmailRepository } from '../protocols/db/load-account-by-email-repository'

export class DbAuthetication implements Authentication {
  constructor(private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {}
  async auth(authenticationModel: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(authenticationModel.email)
    return null
  }
}
