import { expect } from 'chai';
import request from 'supertest';
import app from '../../app';

describe('Movie Route', function() {
  this.timeout(5000);
  it('should successfully fetch, format and sort movie data', done => {
    request(app)
      .get(`/api/v1/movie?sort=budget`)
      .set('Authorization', `Bearer ${process.env.API_KEY}`)
      .end((err, res) => {
        const { status, data } = res.body;
        expect(res.status).to.eql(200);
        expect(status).to.eql('success');
        expect(data).to.be.an('object');
        expect(data).to.have.property('docs');
        expect(data.docs).to.be.an('array');
        expect(data.docs).to.have.lengthOf(8);
        expect(data.docs[0]).to.have.property('name');
        expect(data.docs[0]).to.have.property('runtimeInMinutes');
        expect(data.docs[0].budgetInMillions).to.include('₦');
        expect(data.docs[0].budgetInMillions).to.be.eql('₦32,550,000,000');
        expect(data.docs[data.docs.length - 1].budgetInMillions).to.be.eql(
          '₦236,250,000,000'
        );
        done(err);
      });
  });
  it('should sort movie data in descending order', done => {
    request(app)
      .get(`/api/v1/movie?sort=-runtime`)
      .set('Authorization', `Bearer ${process.env.API_KEY}`)
      .end((err, res) => {
        const { status, data } = res.body;
        expect(res.status).to.eql(200);
        expect(status).to.eql('success');
        expect(data.docs).to.be.an('array');
        expect(data.docs[0].runtimeInMinutes).to.be.eql(558);
        expect(data.docs[data.docs.length - 1].runtimeInMinutes).to.be.eql(144);
        done(err);
      });
  });
});
