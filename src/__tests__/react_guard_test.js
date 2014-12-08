var reactGuard = require('../react_guard');

describe('React guard', function() {
  var FakeReact;
  beforeEach(function() {
    FakeReact = { createClass: function(obj) { return obj } };
  });

  describe('reactGuard function', function() {
    it('accepts React and overrides createClass', function() {
      var originCreateClass = FakeReact.createClass;
      reactGuard(FakeReact);
      expect(FakeReact.createClass).to.be.not.eql(originCreateClass);
    });

    it('keeps original createClass behaviour', function() {
      reactGuard(FakeReact);
      var testObj = {};
      expect(FakeReact.createClass(testObj)).to.be.eql(testObj);
    });
  });

  describe('wrapped createClass', function() {
    it('wrap render into try-catch', function() {
      reactGuard(FakeReact);
      var obj = FakeReact.createClass({
        render: function() { itWillFail() }
      });
      expect(obj.render).to.not.throw(Error);
    });

    it('keeps initial render behavior', function() {
      reactGuard(FakeReact);
      var obj = FakeReact.createClass({
        render: function() { return 42 }
      });
      expect(obj.render()).to.be.eq(42);
    });

    it('pass error instance to guard function', function() {
      var guardFn = sinon.spy();
      reactGuard(FakeReact, guardFn);
      var obj = FakeReact.createClass({
        render: function() { itWillFail() }
      });
      obj.render();
      expect(guardFn).to.be.calledWithMatch(ReferenceError);
    });

    it('returns value returned by guard function', function() {
      var guardFn = function() { return 42 };
      reactGuard(FakeReact, guardFn);
      var obj = FakeReact.createClass({
        render: function() { itWillFail() }
      });
      expect(obj.render()).to.be.eq(42);
    });

    it('returns null if guard function is not defined', function() {
      reactGuard(FakeReact);
      var obj = FakeReact.createClass({
        render: function() { itWillFail() }
      });
      expect(obj.render()).to.be.eq(null);
    });
  });
});

