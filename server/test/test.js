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
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });
    it('it should return 404 on wrong api call', (done) => {
      chai
        .request(server)
        .get('/api/bad')
        .end((err, res) => {
          expect(res.status).to.eql(404);
          done();
        });
    });
  });
  describe('GET api/v1/entry/:id', () => {
    it('it should return 404 on wrong api call', (done) => {
      chai
        .request(server)
        .get('/api/v1/badentry')
        .end((err, res) => {
          expect(res.status).to.eql(404);
          done();
        });
    });
    it('should check if the correct id is provided', (done) => {
      chai
        .request(server)
        .get('/api/v1/entry/1')
        .end((err, res) => {
          expect(err).to.be.a('null');
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
    it('should respond as error if a wrong id is passed', (done) => {
      chai
        .request(server)
        .get('/api/v1/entry/:wrongid')
        .end((err, res) => {
          expect(res.body.status).to.eql(400);
          expect(res.body.data.message).to.equal('Sorry, no entry with that id found');
          done();
        });
    });
  });
  describe('POST api/v1/entry', () => {
    it('it should return 404 on wrong api call', (done) => {
      chai
        .request(server)
        .post('/api/v1/badentry')
        .end((err, res) => {
          expect(res.status).to.eql(404);
          done();
        });
    });
    it('should not post an entry without body or title', (done) => {
      chai
        .request(server)
        .post('/api/v1/entry')
        .send({ title: 'My test title' })
        .end((err, res) => {
          expect(res.body.status).to.eql(400);
          expect(res.body.data.message).to.have.string('Sorry, all fields must be present');
        });
      chai
        .request(server)
        .post('/api/v1/entry')
        .send({ body: 'My test body' })
        .end((err, res) => {
          expect(res.body.status).to.eql(400);
          expect(res.body.data.message).to.have.string('Sorry, all fields must be present');
        });
      done();
    });
    it('should submit entry', (done) => {
      const diary = {
        title: 'I love tests',
        body: 'Like i said, i love tests',
      };
      chai
        .request(server)
        .post('/api/v1/entry')
        .send(diary)
        .end((err, res) => {
          expect(res.body.status).to.eql(201);
          expect(res.body.data).to.be.an('object');
          expect(res.body.data).to.have.property('title');
          expect(res.body.data).to.have.property('body');
          expect(res.body.data).to.have.property('createdAt');
          expect(res.body.data).to.have.property('updatedAt');
          done();
        });
    });
  });
  describe('PUT api/v1/entry', () => {
    it('it should return 404 on wrong api call', (done) => {
      chai
        .request(server)
        .put('/api/v1/badentry')
        .end((err, res) => {
          expect(res.status).to.eql(404);
          done();
        });
    });
    it('should check if an incorrect id has been passed as params', (done) => {
      chai
        .request(server)
        .put('/api/v1/entry/wrongid')
        .send()
        .end((err, res) => {
          expect(res.body.status).to.eql(400);
          expect(res.body.data.message).to.equal('Sorry, no entry with that id found');
          done();
        });
    });
    it('should check if no id is passed at all', (done) => {
      chai
        .request(server)
        .put('/api/v1/entry')
        .send()
        .end((err, res) => {
          expect(res.status).to.be.eql(404);
          done();
        });
    });
    it('should update the diary when passed correct id', (done) => {
      const diary = {
        title: 'Updated book',
        body: 'Hehe bless',
      };
      chai
        .request(server)
        .put('/api/v1/entry/1')
        .send(diary)
        .end((err, res) => {
          expect(res.body.status).to.eql(200);
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });
  describe('DELETE /api/v1/entry:id', () => {
    it('it should return 404 on wrong api call', (done) => {
      chai
        .request(server)
        .delete('/api/v1/badentry')
        .end((err, res) => {
          expect(res.status).to.eql(404);
          done();
        });
    });
    it('should check if an id is passed at all', (done) => {
      chai
        .request(server)
        .delete('/api/v1/entry/')
        .end((err, res) => {
          expect(res.status).to.eql(404);
          done();
        });
    });
    it('should check for an incorrect id', (done) => {
      chai
        .request(server)
        .delete('/api/v1/entry/wrongid')
        .end((err, res) => {
          expect(res.body.status).to.eql(400);
          expect(res.body.data)
            .have.property('message')
            .eql('Sorry, no entry with that id found');
          done();
        });
    });
    it('delete successfully', (done) => {
      chai
        .request(server)
        .delete('/api/v1/entry/1')
        .end((err, res) => {
          expect(res.body.status).to.eql(200);
          expect(res.body.data)
            .have.property('message')
            .eql('Entry deleted successfully');
          done();
        });
    });
  });
});
