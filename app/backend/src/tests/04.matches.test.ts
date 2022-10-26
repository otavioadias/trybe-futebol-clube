import * as express from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import Matches from '../database/models/Matches';
import { matches } from './mocks/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /matches', () => {
describe('Requisição GET da rota /matches ', () => {
  beforeEach(() => sinon.stub(Model, 'findAll').resolves(matches as Matches[]));
  afterEach(() => sinon.restore());
  it('Deve retornar o status 200 ', async () => {
    const httpResponse = await chai
       .request(app)
       .get('/teams')
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(matches);
  });
});
});