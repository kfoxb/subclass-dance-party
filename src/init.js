$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $('body').height() * Math.random(),
      $('body').width() * Math.random(),
      400
    );
    window.dancers.push(dancer);
    $('body').append(dancer.$node);
  });

  $('.lineupButton').on('click', function(event) {

    //debugger;
    var topForBatman = 0;
    var topForJoker = 0;
    for (var i = 0; i < window.dancers.length; i++) {
      var dancer = window.dancers[i];
      if (dancer.constructor === MakeBatmanDancer) {
        var styleSettings = {
          top: topForBatman * 80,
          right: 50,
          left: '90%'
        };
        topForBatman++;
        dancer.$node.css(styleSettings);
      }
      if (dancer.constructor === MakeJokerDancer) {
        var styleSettings = {
          top: topForJoker * 80,
          left: 0
        };
        topForJoker++;
        dancer.$node.css(styleSettings);
      }
    }
  });

  $('body').on('mouseenter', '.joker', function() {
    $(this).hide();
    //debugger;
    //var oldJoker = $(this);
    //console.log($(this));
    var joker = $(this)[0];

    var topString = joker.style.top;
    var top = Number(topString.substring(0, topString.length - 2));

    var leftString = joker.style.left;
    var left = Number(leftString.substring(0, leftString.length - 2));

    // debugger;
    var batman = new MakeBatmanDancer(top, left, 400);
    console.log(batman.$node[0]);
    window.dancers.push(batman);
    $('body').append(batman.$node);
  });


  $('body').on('mouseenter', '.sidetoside', function() {
    $(this).hide();
    console.log(this);
    var batman = $(this)[0];

    var topString = batman.style.top;
    var top = Number(topString.substring(0, topString.length - 2));

    var leftString = batman.style.left;
    var left = Number(leftString.substring(0, leftString.length - 2));

    var joker = new MakeJokerDancer(top, left, 400);
    //console.log(joker.$node[0]);
    window.dancers.push(joker);
    $('body').append(joker.$node);
  });
});

