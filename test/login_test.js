var expect = require('chai').expect;
//app moet in app.js onderaan geëxporteerd staan, we hebben deze nodig in de constructor om op te starten
var app = require('../app');
var request = require('supertest');

//om requests te sturen naar de applicatie
var agent = request.agent(app);
var User = require('../models/Users');

describe('POST /login', function(){
  //als testuser al bestaat, eerst verwijderen
  it('user should be logged in', function(done) {
    //testuser registreren
    agent.post('/login')
    .send({'username': 'test', 'password': 'test'})
    .end(function(err, res){
      if(err) {return done(err);}
      expect(res.statusCode).equal(200);
      expect(res.text).be.json;
      var fetchedData = JSON.parse(res.text);
      //token object wordt geretourneerd
      expect(fetchedData).to.be.an('object');
      expect(fetchedData).to.not.empty;
      expect(fetchedData).to.have.property('token');
      done();
    });
  });
});
