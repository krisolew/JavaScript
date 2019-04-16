var expect = chai.expect;
 
describe('digits() function', function() {
  it('Returns 15 for 12345', function() {
    expect(digits("12345")).to.equal(15);
  });
  it('Returns 0 for abcde', function() {
    expect(digits("abcde")).to.equal(0);
  });
  it('Returns 9 for abc45', function() {
    expect(digits("abc45")).to.equal(9);
  });
  it('Returns 6 for 123de', function() {
    expect(digits("123de")).to.equal(6);
  });
  it('Returns 0 for ""', function() {
    expect(digits("")).to.equal(0);
  });
});

describe('letters() function', function() {
  it('Returns 0 for 12345', function() {
    expect(letters(12345)).to.equal(0);
  });
  it('Returns 5 for abcde', function() {
    expect(letters("abcde")).to.equal(5);
  });
  it('Returns 3 for abc45', function() {
    expect(letters("abc45")).to.equal(3);
  });
  it('Returns 2 for 123de', function() {
    expect(letters("123de")).to.equal(2);
  });
  it('Returns 0 for ""', function() {
    expect(letters("")).to.equal(0);
  });
 
 });

 describe('The sum() function', function() {
  it('Returns 12345 for 12345', function() {
    expect(sum("12345")).to.equal(12345);
  });
  it('Returns 0 for abcde', function() {
    expect(sum("abcde")).to.equal(0);
  });
  it('Returns 0 for abc45', function() {
    expect(sum("abc45")).to.equal(0);
  });
  it('Returns 123 for 123de', function() {
    expect(sum("123de")).to.equal(123);
  });
  it('Returns 0 for ""', function() {
    expect(sum("")).to.equal(0);
  });
 });