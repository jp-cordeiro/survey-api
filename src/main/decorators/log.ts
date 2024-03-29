import { LogErrorRepository } from '@/data/protocols/db'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor(private readonly controller: Controller, private readonly logErrorRepository: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepository = logErrorRepository
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode >= 300) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
