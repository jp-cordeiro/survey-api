import { Authentication } from '@/domain/useCases/authentication'
import {
  badRequest,
  ok,
  serverError,
  unauthorizedError
} from '@/presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { Validation } from '../signUp/signup-protocols'

export class LoginController implements Controller {
  constructor(
    private readonly authetication: Authentication,
    private readonly validation: Validation
  ) {
    this.authetication = authetication
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
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
