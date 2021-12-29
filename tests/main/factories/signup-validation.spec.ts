import { makeSignUpValidation } from '@/main/factories/signup-validation'
import { Validation } from '@/presentation/helpers/validators'
import { RequiredFieldValidation } from '@/presentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '@/presentation/helpers/validators/validation-composite'

jest.mock('@/presentation/helpers/validators/validation-composite')

describe('SignUpValidation factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
