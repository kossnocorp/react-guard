var reactGuard = function(React, guardFn) {
  var originalCreateClass = React.createClass;

  React.createClass = function(obj) {
    var originalRender = obj.render;
    obj.render = function() {
      try {
        return originalRender.call(this);
      } catch(e) {
        if (typeof guardFn == 'function') {
          return guardFn(e);
        } else {
          return null;
        }
      }
    };

    return originalCreateClass.call(React, obj);
  };
};

module.exports = reactGuard;

