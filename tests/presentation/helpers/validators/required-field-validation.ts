import { MissingParamError } from '@/presentation/errors'
import { RequiredFieldValidation } from '@/presentation/helpers/validators'

describe('RequiredField Validation', () => {
  test('should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({})
    expect(error).toEqual(new MissingParamError('field'))
  })
})
