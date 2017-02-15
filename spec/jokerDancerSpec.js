describe('jokerDancer', function() {

  var jokerDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    jokerDancer = new MakeJokerDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(jokerDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that makes it rotate', function() {
    sinon.spy(jokerDancer.$node, 'toggleClass');
    jokerDancer.step();
    expect(jokerDancer.$node.toggleClass.called).to.be.true;
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(jokerDancer, 'step');
      expect(jokerDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(jokerDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(jokerDancer.step.callCount).to.be.equal(2);
    });
  });
});
