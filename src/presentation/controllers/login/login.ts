import { Authentication } from '@/domain/useCases/authentication'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import {
  badRequest,
  ok,
  serverError,
  unauthorizedError
} from '@/presentation/helpers/http-helper'
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly authetication: Authentication
  ) {
    this.emailValidator = emailValidator
    this.authetication = authetication
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      const { email, password } = httpRequest.body
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authetication.auth(email, password)
      if (!accessToken) {
        return unauthorizedError()
      }
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
