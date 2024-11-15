$(document).ready(function () {
  var fv = $("#fullview").fullView({
    //Navigation
    dots: true,
    dotsPosition: "right",
    dotsTooltips: true,

    //Scrolling
    easing: "swing",
    backToTop: true,

    // Accessibility
    keyboardScrolling: true,

    // Callback
    onScrollEnd: function (currentView, preView) {
      console.log("Current", currentView);
      console.log("Previus", preView);
    }
  });

  $("#down").click(function () {
    // To Scroll Down 1 Section
    fv.data("fullView").scrollDown();

    // To Scroll Up 1 Section
    // fv.data('fullView').scrollDown();
  });

  $("#select").change(function () {
    // To Scroll to Specfic Section
    fv.data("fullView").scrollTo($(this).val());
  });
});