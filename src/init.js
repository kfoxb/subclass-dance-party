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
    //console.log(batman.$node[0]);
    window.dancers.push(batman);
    $('body').append(batman.$node);
  });


  // $('body').on('mouseenter', '.batman', function() {
  //   $(this).hide();
  //   //console.log(this);
  //   var batman = $(this)[0];

  //   var topString = batman.style.top;
  //   var top = Number(topString.substring(0, topString.length - 2));

  //   var leftString = batman.style.left;
  //   var left = Number(leftString.substring(0, leftString.length - 2));

  //   var joker = new MakeJokerDancer(top, left, 400);
  //   //console.log(joker.$node[0]);
  //   window.dancers.push(joker);
  //   $('body').append(joker.$node);
  // });

  $('body').on('mouseenter', '.batman', function() {
    //debugger;
    var min = Infinity;
    var batman = $(this)[0];
    var batmanTopString = batman.style.top;
    var batmanTop = Number(batmanTopString.substring(0, batmanTopString.length - 2));

    var batmanLeftString = batman.style.left;
    var batmanLeft = Number(batmanLeftString.substring(0, batmanLeftString.length - 2));
    var closet = null;

 

    for (var i = 0; i < window.dancers.length; i++) {
      if (window.dancers[i].constructor === MakeBatmanDancer) {
        continue;
      }
      var topString = window.dancers[i].$node[0].style.top;
      var top = Number(topString.substring(0, topString.length - 2));
      var leftString = window.dancers[i].$node[0].style.left;
      var left = Number(leftString.substring(0, leftString.length - 2));
      console.log(top + left);
      var val = (top - batmanTop) * (top - batmanTop) + (left - batmanLeft) * (left - batmanLeft);
      if (val < min) {
        min = val;
        closet = window.dancers[i];
      }
    }
    //debugger;
    if (closet !== null) {
      var jokerTop = Number(closet.$node[0].style.top.substring(0, closet.$node[0].style.top.length - 2));
      var jokerLeft = Number(closet.$node[0].style.left.substring(0, closet.$node[0].style.left.length - 2));

      // $(this).addClass(move);
      var leftDiff = jokerLeft - batmanLeft;
      var topDiff = jokerTop - batmanTop;
     
      var move = {
        'transform': 'translate(' + leftDiff + 'px,' + topDiff + 'px)',
        'transition-duration': '4s'
      };
      $(this).css(move);
      // make joker disappear
      setTimeout(closet.$node.hide.bind(closet.$node), 2000);
      // remove joker from dancers array
      for (var i = 0; i < window.dancers.length; i++) {
        if (window.dancers[i] === closet) {
          window.dancers.splice(i, 1);
        }
      }

      var styleSettings = {
        top: jokerTop,
        left: jokerLeft,
        position: 'absolute',
        height: '160px',
        width: '160px',
        display: 'none'
      };
      var $kapow = $('<img src="img/kapow.png">');
      $kapow.css(styleSettings);
      $('body').append($kapow);
      setTimeout($kapow.show.bind($kapow), 2000);
      setTimeout($kapow.hide.bind($kapow), 3000);
    }
  });
});

