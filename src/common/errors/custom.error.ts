import { ApolloError } from 'apollo-server-errors';

export class CustomError extends ApolloError {
  constructor(code: number, message: string) {
    super(message, code.toString());

    Object.defineProperty(this, 'name', { value: 'CustomError' });
  }
}
