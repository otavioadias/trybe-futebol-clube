import { ErrorRequestHandler } from 'express';
import MissingParamError from '../errors/missing-param-error';

const loginMiddleware: ErrorRequestHandler = (_err, req, res, next) => {
  console.log(req.body);
  if (!req.body.email) {
    throw new MissingParamError('O campo "email" é obrigatório');
  }
  if (!req.body.password) {
    throw new MissingParamError('O campo "password" é obrigatório');
  }
  next();
};

export default loginMiddleware;
