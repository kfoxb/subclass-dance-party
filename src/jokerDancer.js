var MakeJokerDancer = function(top, left, timeBetweenSteps) {
  MakeDancer.call(this, top, left, timeBetweenSteps);
  this.timeBetweenSteps = timeBetweenSteps;
  this.$node = $('<img src="img/Joker.png" class="joker">');
  this.setPosition(top, left);
};

MakeJokerDancer.prototype = Object.create(MakeDancer.prototype);
MakeJokerDancer.prototype.constructor = MakeJokerDancer;
MakeJokerDancer.prototype.oldStep = MakeDancer.prototype.step;

MakeJokerDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  //this.$node.toggleClass('sidetoside');
  this.$node.toggleClass('rotate');
};
