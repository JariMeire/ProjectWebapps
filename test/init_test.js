var expect = require('chai').expect;
//expect is library in chai
describe('Init', function(){
	it('starts a new testing env', function(done){
		//Hierbinnen kan je controles uitvoeren
		//Bijvoorbeeld of strings gelijk zijn
		expect('test').to.equal('test');
		done();
	});
});