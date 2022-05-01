import { Authentication, AuthenticationModel } from '@/domain/useCases/authentication'
import { HashComparer, Encrypter } from '../protocols/criptography'
import { LoadAccountByEmailRepository, UpdateAccessTokenRepository } from '../protocols/db'

export class DbAuthetication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(authenticationModel: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authenticationModel.email)
    if (account) {
      const { id, password } = account
      const isValid = await this.hashComparer.compare(authenticationModel.password, password)
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(id)
        await this.updateAccessTokenRepository.updateAccessToken(id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
