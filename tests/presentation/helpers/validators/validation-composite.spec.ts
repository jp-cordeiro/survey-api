import { MissingParamError } from '@/presentation/errors'
import {
  Validation,
  ValidationComposite
} from '@/presentation/helpers/validators'

describe('Validation Composite', () => {
  test('should return an error if any validation fails', () => {
    class ValidationStub implements Validation {
      validate(input: any): Error {
        return new MissingParamError('field')
      }
    }
    const validationSut = new ValidationStub()
    const sut = new ValidationComposite([validationSut])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
