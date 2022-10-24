import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

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
    expect(httpResponse.body).to.be.deep.equal({ error: 'O campo "email" é obrigatório' });
  });
});

describe('Quando o campo password não é informado', () => {
  it('Deve retornar o status 400 ', async () => {
    const httpResponse = await chai
       .request(app)
       .post('/login')
       .send({ email: 'admin@admin.com'})
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'O campo "password" é obrigatório' });
  });
});
});