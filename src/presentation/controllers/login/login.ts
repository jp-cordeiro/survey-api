import { Authentication } from '@/domain/useCases/authentication'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest, serverError } from '@/presentation/helpers/http-helper'
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
      if (!httpRequest.body.email) {
        return await new Promise(resolve =>
          resolve(badRequest(new MissingParamError('email')))
        )
      }
      if (!httpRequest.body.password) {
        return await new Promise(resolve =>
          resolve(badRequest(new MissingParamError('password')))
        )
      }
      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValidEmail) {
        return await new Promise(resolve =>
          resolve(badRequest(new InvalidParamError('email')))
        )
      }
      await this.authetication.auth(
        httpRequest.body.email,
        httpRequest.body.password
      )
    } catch (error) {
      return serverError(error)
    }
  }
}
