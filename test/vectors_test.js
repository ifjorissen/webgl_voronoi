var Vector = require("../scripts/vector")
// var Vector = require("../node_modules/chai/chai")
// var Vector = require("../node_modules/mocha/mocha")

describe("Vector", function() {
  describe("init", function() {
    it("should have default values", function() {
      var vec = Object.create(Vector);
      vec.init()
      expect(vec.x).to.equal(0);
    });

    it("should set the x,y,z if provided", function() {
      var vec = Object.create(Vector);
      vec.init(1,2,3)
      expect(vec.y).to.equal(2);
    });
  });
});