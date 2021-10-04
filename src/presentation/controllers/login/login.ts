import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers/http-helper'
import {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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
  }
}
