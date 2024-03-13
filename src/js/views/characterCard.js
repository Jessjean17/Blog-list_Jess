import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';

describe('Character Route', function() {
  this.timeout(6000);
  it('should successfully fetch and paginate characters', done => {
    request(app)
      .get(`/api/v1/character?limit=10&sort=race`)
      .set('Authorization', `Bearer ${process.env.API_KEY}`)
      .end((err, res) => {
        const { status, data } = res.body;
        expect(res.status).to.eql(200);
        expect(status).to.eql('success');
        expect(data).to.be.an('object');
        expect(data).to.have.property('docs');
        expect(data.docs).to.be.an('array');
        expect(data.docs).to.have.lengthOf(10);
        expect(data.docs[0].race).to.eql('Ainur');
        done(err);
      });
  });
  it('should successfully paginate characters into pages', done => {
    request(app)
      .get(`/api/v1/character?limit=10&page=2`)
      .set('Authorization', `Bearer ${process.env.API_KEY}`)
      .end((err, res) => {
        const { status, data } = res.body;
        expect(res.status).to.eql(200);
        expect(status).to.eql('success');
        expect(data).to.be.an('object');
        expect(data).to.have.property('docs');
        expect(data.docs).to.be.an('array');
        expect(data.docs).to.have.lengthOf(10);
        expect(data.pages.current).to.be.eql('2');
        expect(data.items.begin).to.be.eql(11);
        expect(data.items.end).to.be.eql(20);
        done(err);
      });
  });
});
