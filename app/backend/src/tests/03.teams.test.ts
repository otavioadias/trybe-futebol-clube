import * as express from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { teams } from './mocks/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /teams', () => {
describe('Requisição GET da rota /teams ', () => {
  it('Deve retornar o status 200 ', async () => {
    const httpResponse = await chai
       .request(app)
       .get('/teams')
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(teams);
  });
});
});