import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota inicial', () => {
  describe('Quando a requisição é feita com sucesso', () => {
    it ('Deve retornar o status 200', async () => {
      const httpResponse = await chai.request(app).get('/');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal({ ok: true });
    })
  })
});
