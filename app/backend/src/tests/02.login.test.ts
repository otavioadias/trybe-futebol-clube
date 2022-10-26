import * as express from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LoginService from '../services/LoginService';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /login', () => {
describe('Quando o campo email não é informado', () => {
  it('Deve retornar o status 400 ', async () => {
    const httpResponse = await chai
       .request(app)
       .post('/login')
       .send({ password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'})
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });
});

describe('Quando o campo password não é informado', () => {
  it('Deve retornar o status 400 ',async () => {
    const httpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'admin@admin.com'})
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });
});

describe('Quando o campo email e password são informados', () => {
  it('Deve retornar o status 201 ', async () => {
    const httpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'admin@admin.com', password: 'secret_admin' })
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.keys('token');
  });
});

describe('Quando o campo email é inválido', () => {
  it('Deve retornar o status 401 ', async () => {
    const httpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'oi@admin.com', password: 'secret_admin' })
    expect(httpResponse.status).to.equal(401);
  });
});

describe('Quando o campo senha é inválido', () => {
  it('Deve retornar o status 401 ', async () => {
    const httpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'admin@admin.com', password: 'secret' })
    expect(httpResponse.status).to.equal(401);
  });
});

describe('Faz a validação e retorna o role', () => {
  beforeEach(() => sinon.stub(LoginService.prototype, 'validateLogin').resolves({ role: 'admin' }));
  afterEach(() => sinon.restore());
  it('Deve retornar o status 200 ', async () => {
    const httpResponse = await chai
       .request(app)
       .get('/login/validate')
       .send({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjY4MTMzODEsImV4cCI6MTY2NzQxODE4MX0.lBHLIEKSpFPweuEMCldZSeDYIKuPUra5r79VMRU4ghI'})
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal({ role: 'admin' });
  });
});
});