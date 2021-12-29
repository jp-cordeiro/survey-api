export class UnauthorizedError extends Error {
  constructor(stack?: string) {
    super('Internal server error')
    this.name = 'UnauthorizedError'
    this.stack = stack
  }
}
