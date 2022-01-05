import {
  RequiredFieldValidation,
  ValidationComposite
} from '@/presentation/helpers/validators'
import { EmailValidation } from '@/presentation/helpers/validators/email-validation'
import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/utils/email-validator-adapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const requiredFields = ['email', 'password']
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
