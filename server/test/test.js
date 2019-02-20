/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const { expect } = chai;
chai.use(chaiHttp);

describe('Entry Tests', () => {
  describe('GET api/v1/entry', () => {
    it('should get all entries', (done) => {
      chai
        .request(server)
        .get('/api/v1/entry')
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body.status).to.have.string('success');
          expect(res.body.data).to.be.a('array');
          done();
        });
    });
    it('it should return 404 on wrong api call', (done) => {
      chai
        .request(server)
        .get('api/bad')
        .end((err, res) => {
          expect(res.status).to.eql(404);
          done();
        });
    });
  });
});
