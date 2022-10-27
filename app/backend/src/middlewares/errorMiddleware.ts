import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (err, req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  }
  console.log(err);
  // if (err.message === 'invalid token') {
  //   return res.status(401).json({ message: 'Token must be a valid token' });
  // }
  return res.status(500).json({ message: err.message });
};

export default errorMiddleware;
