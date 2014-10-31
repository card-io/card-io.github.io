
// When ready...
window.addEventListener("load",function() {
  // Set a timeout...
  setTimeout(function(){
    // Hide the address bar!
    window.scrollTo(0, 1);
  }, 0);
});


var CardIO = {};

CardIO.date = {
  parseDateString: function(dateString) {
    var dateParts = dateString.split('-');
    year = parseInt(dateParts[0], 10);
    month = parseInt(dateParts[1], 10) - 1;
    day = parseInt(dateParts[2], 10);
    return Date.UTC(year,month,day,0,0,0,0);
  }
};

CardIO.forms = (function () {
  return {
    selectForm: function () {
      var errorInputs = $(".error:first :input").select();
      if(!errorInputs.length) {
        $(":input:visible:enabled:first").select();
      }
    },

    updateButtonOnSubmit: function (options) {
      if(!options) {
        options = {};
      }
      var opts = $.extend({
        'form': $("form"),
        'input': $("form input[type=submit]"),
        'text': 'Processing...',
        'class': 'processing'
      }, options);
      if(opts.form.length && opts.input.length) {
        opts.form.submit(function () {
          opts.input.addClass(opts['class'])
        });
      }
    }

  }
}());


CardIO.slideshow = (function () {

  var slides = [

    // "m1.jpg"
    "m2.jpg"
  , "m3.jpg"
  , "m4.jpg"
  , "m5.jpg"
  , "m6.jpg"
  // , "m7.jpg"
  // , "m8.jpg"
  // , "cardio.jpg"

  // , "c1.jpg"
  , "c2.jpg"
  , "c3.jpg"
  , "c4.jpg"
  , "c5.jpg"
  // , "c6.jpg"
  // , "c7.jpg"
  // , "cardio.jpg"

  // , "r1.jpg"
  , "r2.jpg"
  , "r3.jpg"
  , "r4.jpg"
  , "r5.jpg"
  , "r6.jpg"
  // , "r7.jpg"
  // , "r8.jpg"
  , "cardio.jpg"

  ];

  var slideTimes = {};
  slideTimes[slides.length - 1] = 3000;
  var defaultTime = 1500;

  var calculateTimeout = function (currElement, nextElement, opts, isForward) {
      var t = slideTimes[opts.currSlide];
      if (t === undefined) {
        t = defaultTime;
      }
      return t;
  };

  var createImages = function ($container, baseImageURL) {
    $.each(slides, function (i, v) {
      var img = new Image();
      img.src = baseImageURL + v;
      $container.append(img);
    });
  };

  var startSlideshow = function (baseImageURL) {
    if (!$("#phone").is(":visible")) {
      return;
    }
    var $container = $("#phoneScreens");
    createImages($container, baseImageURL);
    $container.cycle({
      speed:  400,
      timeout: 3000,
      timeoutFn: calculateTimeout,
      next: '#phone'
    });
    $(window).unbind('resize');
  }

  return {
    init: function (baseImageURL) {
      $(window).resize(function () {
        startSlideshow(baseImageURL);
      });
      startSlideshow(baseImageURL);
    }
  }

}());

