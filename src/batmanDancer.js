var MakeBatmanDancer = function(top, left, timeBetweenSteps) {
  MakeDancer.call(this, top, left, timeBetweenSteps);
  this.timeBetweenSteps = timeBetweenSteps;
  this.$node = $('<img src="img/batman.png" class="batman">');
  this.setPosition(top, left);
};
MakeBatmanDancer.prototype = Object.create(MakeDancer.prototype);
MakeBatmanDancer.prototype.constructor = MakeBatmanDancer;
MakeBatmanDancer.prototype.oldStep = MakeDancer.prototype.step;

MakeBatmanDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  this.$node.toggleClass('sidetoside');
};
