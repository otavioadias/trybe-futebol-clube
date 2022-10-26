import * as express from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import { teams } from './mocks/teams';
import Teams from '../database/models/Teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /teams', () => {

describe('Requisição GET da rota /teams/:id ', () => {
  beforeEach(() => sinon.stub(Model, 'findAll').resolves(teams as Teams[]));
  afterEach(() => sinon.restore());
  it('Deve retornar o status 200 ', async () => {
    const httpResponse = await chai
        .request(app)
        .get('/teams/1')
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(teams[0]);
  });
});

describe('Requisição GET da rota /teams ', () => {
  beforeEach(() => sinon.stub(Model, 'findAll').resolves(teams as Teams[]));
  afterEach(() => sinon.restore());
  it('Deve retornar o status 200 ', async () => {
    const httpResponse = await chai
       .request(app)
       .get('/teams')
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(teams);
  });
});
});