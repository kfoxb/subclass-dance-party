describe('batmanDancer', function() {

  var batmanDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    batmanDancer = new MakeBatmanDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(batmanDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that makes batman scale', function() {
    sinon.spy(batmanDancer.$node, 'toggleClass');
    batmanDancer.step();
    expect(batmanDancer.$node.toggleClass.called).to.be.true;
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(batmanDancer, 'step');
      expect(batmanDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(batmanDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(batmanDancer.step.callCount).to.be.equal(2);
    });
  });
});
