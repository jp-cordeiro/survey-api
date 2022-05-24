import { Router } from 'express'
import { adaptRoutes } from '../adapters/express-routes-adpater'
import { makeSignUpController } from '../factories/signup/signup-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoutes(makeSignUpController()))
}
