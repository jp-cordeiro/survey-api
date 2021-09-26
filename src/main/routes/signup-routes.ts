import { Router } from 'express'
import { makeSignUpController } from '../factories/signup'
import { adaptRoutes } from '../adapters/express-routes-adpater'

export default (router: Router): void => {
  router.post('/signup', adaptRoutes(makeSignUpController()))
}
