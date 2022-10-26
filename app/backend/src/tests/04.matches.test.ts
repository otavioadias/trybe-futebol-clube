import * as express from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import { matches } from './mocks/matches';
import { matchesTrue } from './mocks/matchesTrue';
import { matchesFalse } from './mocks/matchesFalse';



chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /matches', () => {
describe('Requisição GET da rota /matches ', () => {
  beforeEach(() => sinon.stub(Model, 'findAll').resolves(matches as []));
  afterEach(() => sinon.restore());
  it('Deve retornar o status 200 ', async () => {
    const httpResponse = await chai
       .request(app)
       .get('/matches')
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(matches);
  });
});

describe('Requisição GET da rota /matches?inProgress=true ', () => {
  beforeEach(() => sinon.stub(Model, 'findAll').resolves(matchesTrue as []));
  afterEach(() => sinon.restore());
  it('Deve retornar o status 200 ', async () => {
    const httpResponse = await chai
       .request(app)
       .get('/matches?inProgress=true')
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(matchesTrue);
  });
});

describe('Requisição GET da rota /matches?inProgress=true ', () => {
  beforeEach(() => sinon.stub(Model, 'findAll').resolves(matchesFalse as []));
  afterEach(() => sinon.restore());
  it('Deve retornar o status 200 ', async () => {
    const httpResponse = await chai
       .request(app)
       .get('/matches?inProgress=false')
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(matchesFalse);
  });
});
});