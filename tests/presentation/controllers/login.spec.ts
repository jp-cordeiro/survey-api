import { LoginController } from '@/presentation/controllers/login/login'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helper'

describe('Login Controller', () => {
  const makeSut = (): LoginController => {
    return new LoginController()
  }
  test('should return 400 if no email is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
