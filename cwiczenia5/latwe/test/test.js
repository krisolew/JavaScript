//Source: https://codeforgeek.com/2015/07/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
 
// This agent refers to PORT where program is runninng.
 
var server = supertest.agent("http://localhost:3000");
 
// UNIT test begin
describe('GET /', function() {
      it('respond with html', function(done) {
         server
         .get('/')
         .expect('1+3=4')
         .end(done);
      });
});

describe('GET /add/1/2', function() {
    it('respond with html', function(done) {
       server
       .get('/add/1/2')
       .expect('1+2=3')
       .end(done);
    });
});