import { Controller, HttpRequest } from '@/presentation/protocols'
import { Request, RequestHandler, Response } from 'express'

export const adaptRoutes = (controller: Controller): RequestHandler<any> => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode >= 300) {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
      return
    }
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
