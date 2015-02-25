var objEql = require('./')
var should = require('should')
var sinon = require('sinon')
var Immutable = require('immutable')

describe('objEql()', function() {
  it('returns true when a and have the same identity', function() {
    objEql(1, 1).should.be.true
  })

  it('returns true with arrays with the same values', function() {
    objEql([1, 2, 3], [1, 2, 3]).should.be.true
  })

  it('returns false with arrays with different values', function() {
    objEql([1, 2, 3], [1, 2, 4]).should.be.false
  })

  it('returns true with objects with the same key/values', function() {
    objEql({a: 1, b: 2}, {a: 1, b: 2}).should.be.true
  })

  it('returns false with objects with different key/values', function() {
    objEql({a: 1, b: 2}, {a: 1, c: 2}).should.be.false
  })

  describe('with custom comparison function', function() {
    it('calls comp with each of the matching values', function() {
      var comp = sinon.stub().returns(true)
      var a = [1, 2, 3]
      var b = [1, 2, 3]
      objEql(comp, a, b)
      a.forEach(function(v, i) {
        sinon.assert.calledWithExactly(comp, v, b[i])
      })
    })

    it('returns true when each comp returns true', function() {
      var comp = sinon.stub().returns(true)
      objEql(comp, [1, 2, 3], [2, 3, 4]).should.be.true
    })
  })

  describe('objEql.deep()', function() {
    it('returns true if two nested objects have the same values', function() {
      var a = {a: {b: [1, 2, 3]}}
      var b = {a: {b: [1, 2, 3]}}
      objEql.deep(a, b).should.be.true
    })

    it('returns false if two nested objects have different values', function() {
      var a = {a: {b: [1, 2, 3]}}
      var b = {a: {b: [1, 2, 4]}}
      objEql.deep(a, b).should.be.false
    })
  })

  describe('Immutable.is comparison function', function() {
    it('returns true if both objects have equal immutable values', function() {
      var map1 = Immutable.Map({a:1, b:1, c:1});
      var map2 = Immutable.Map({a:1, b:1, c:1});
      var a = {a: map1}
      var b = {a: map2}
      objEql(Immutable.is, a, b).should.be.true
    })

    it('returns false if objects have different immutable values', function() {
      var map1 = Immutable.Map({a:1, b:1, c:1});
      var map2 = Immutable.Map({a:1, b:1, c:2});
      var a = {a: map1}
      var b = {a: map2}
      objEql(Immutable.is, a, b).should.be.false
    })
  })
})

