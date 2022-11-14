import * as express from 'express';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Model } from 'sequelize';
import { leaderboardAll } from './mocks/leaderboardAll';
import { leaderboardHome } from './mocks/leaderboardHome';
import { leaderboardAway } from './mocks/leaderboardAway';
import LeaderboardService from '../services/LeaderboardService';



chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota /leaderboard', () => {
describe('Requisição GET da rota /leaderboard ', () => {
  beforeEach(() => sinon.stub(LeaderboardService.prototype, 'leaderboard').resolves(leaderboardAll as []));
  afterEach(() => sinon.restore());
  it('Deve retornar o status 200 ', async () => {
    const httpResponse = await chai
       .request(app)
       .get('/leaderboard')
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(leaderboardAll);
  });
});

describe('Requisição GET da rota /leaderboardHome', () => {
    beforeEach(() => sinon.stub(LeaderboardService.prototype, 'leaderboardHome').resolves(leaderboardHome as []));
    afterEach(() => sinon.restore());
    it('Deve retornar o status 200 ', async () => {
      const httpResponse = await chai
         .request(app)
         .get('/leaderboard/home')
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.deep.equal(leaderboardHome);
    });
  });

  describe('Requisição GET da rota /leaderboardAway', () => {
    beforeEach(() => sinon.stub(LeaderboardService.prototype, 'leaderboardAway').resolves(leaderboardAway as []));
    afterEach(() => sinon.restore());
    it('Deve retornar o status 200 ', async () => {
      const httpResponse = await chai
         .request(app)
         .get('/leaderboard/away')
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.be.an('array');
      expect(httpResponse.body).to.be.deep.equal(leaderboardAway);
    });
  });
});