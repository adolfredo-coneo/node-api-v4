import { Request, Response } from 'express';
import * as UserController from '../user';

describe('User Handler', () => {
  it('should create a new user', async () => {
    const req = {
      body: {
        username: 'test',
        password: 'test',
      },
    } as Request;

    const res = {
      json({ token }) {
        expect(token).toBeDefined();
      },
    } as Response;

    const next = jest.fn();

    await UserController.createNewUser(req, res, next);
  });
});
