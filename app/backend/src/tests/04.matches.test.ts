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
import { newMatche, sendMatche, unknownTeam, equalTeam } from './mocks/newMatche';
import MatchesService from '../services/MatchesService';



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

describe('Requisição GET da rota /matches?inProgress=true', () => {
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

describe('Requisição POST da rota /matches', () => {
  beforeEach(() => sinon.stub(Model, 'create').resolves(newMatche as any));
  afterEach(() => sinon.restore());
  it('Deve retornar o status 401 para cadastro de nova partida com token inválido', async () => {
    const httpResponse = await chai
       .request(app)
       .post('/matches')
       .send(sendMatche)
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ "message": "Token must be a valid token" });
  });
});

describe('Requisição POST da rota /matches', () => {
  beforeEach(() => sinon.stub(MatchesService.prototype, 'newMatche').resolves(unknownTeam as any));
  afterEach(() => sinon.restore());
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Njg0NTcwNjYsImV4cCI6MTY2OTA2MTg2Nn0.NnA6HUMTs2VC4p9wsQriodbGNxjRwvNu3B5ecNJxSc4';
  it('Deve retornar o status 404 para cadastro de nova partida, com um time desconhecido', async () => {
    const httpResponse = await chai
       .request(app)
       .post('/matches')
       .set('authorization', token)
       .send(unknownTeam)
    const UNKNOWN_TEAM = 'There is no team with such id!';
    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: UNKNOWN_TEAM });
  });
});

describe('Requisição POST da rota /matches', () => {
  beforeEach(() => sinon.stub(MatchesService.prototype, 'newMatche').resolves(equalTeam as any));
  afterEach(() => sinon.restore());
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Njg0NTcwNjYsImV4cCI6MTY2OTA2MTg2Nn0.NnA6HUMTs2VC4p9wsQriodbGNxjRwvNu3B5ecNJxSc4';
  it('Deve retornar o status 422 para cadastro de nova partida, com times iguais', async () => {
    const httpResponse = await chai
       .request(app)
       .post('/matches')
       .set('authorization', token)
       .send(equalTeam)
    const ERROR_EQUAL_TEAMS = 'It is not possible to create a match with two equal teams';
    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: ERROR_EQUAL_TEAMS });
  });
});

describe('Requisição POST da rota /matches', () => {
  beforeEach(() => sinon.stub(MatchesService.prototype, 'newMatche').resolves(sendMatche as any));
  afterEach(() => sinon.restore());
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Njg0NTcwNjYsImV4cCI6MTY2OTA2MTg2Nn0.NnA6HUMTs2VC4p9wsQriodbGNxjRwvNu3B5ecNJxSc4';
  it('Deve retornar o status 422 para cadastro de nova partida, com times iguais', async () => {
    const httpResponse = await chai
       .request(app)
       .post('/matches')
       .set('authorization', token)
       .send(sendMatche)
    expect(httpResponse.status).to.equal(201);
  });
});
});