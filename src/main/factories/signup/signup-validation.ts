import {
  CompareFieldValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/presentation/helpers/validators'
import { EmailValidation } from '@/presentation/helpers/validators/email-validation'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'
import { Validation } from '@/presentation/protocols'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(
    new CompareFieldValidation('password', 'passwordConfirmation')
  )
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
