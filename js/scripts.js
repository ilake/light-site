jQuery(document).ready(function($) {
  $('#fullpage').fullpage({
    licenseKey: '3C8C1C74-DC98479A-8BD95AE2-E3570D1F',
    scrollingSpeed: 800,
    controlArrows: false,
    scrollHorizontally: true,
    keyboardScrolling: false,
    scrollHorizontallyKey: 'INSERT YOUR EXTENSION KEY HERE', //see https://goo.gl/xkUmHS
    // 進入section後加速
    afterLoad: function(origin, destination, direction) {
      var leavingSection = this;

      if (destination.anchor == "s2") {
        $('#fullpage').fullpage.setScrollingSpeed(0);
      } else if (destination.anchor == "s4") {
        if (!fullpage_api.getActiveSlide().isLast) {
          $("#s4-2 .section-left").fadeOut();
        }

        $('#fullpage').fullpage.setScrollingSpeed(0);
      } else if (destination.anchor == "s9") {
        $('#fullpage').fullpage.setScrollingSpeed(0);
      } else if (destination.anchor == "s10") {
        if (!fullpage_api.getActiveSlide().isLast) {
          $("#s10-2 .section-left").fadeOut();
          $("#s10-3 .section-left").fadeOut();
        }

        $('#fullpage').fullpage.setScrollingSpeed(0);
      } else if (destination.anchor == "s14") {
        $('#fullpage').fullpage.setScrollingSpeed(0);
      } else if (destination.anchor == "s16") {
        if (!fullpage_api.getActiveSlide().isLast) {
          $("#s16-2 img").fadeOut();
        }

        $('#fullpage').fullpage.setScrollingSpeed(0);
      } else {
        $('#fullpage').fullpage.setScrollingSpeed(800);
      }
      if (destination.anchor == "s1") {
        $('#s1-1-1').addClass('active');
        $('#s1-1-2').addClass('active');
      }
      if (destination.anchor == "s1-2") {
        $('#s1-2-1').addClass('active');
        $('#s1-2-2').addClass('active');
      }
      if (destination.anchor == "s17") {
        $('#s17-1').addClass('active');
        $('#s17-2').addClass('active');
      }
      if (destination.anchor == "s18") {
        $('#s18').addClass('active');
        $('#s18-1').addClass('active');
      }
      if (destination.anchor == "s19") {
        $('#s19-1').addClass('active');
        $('#s19-2').addClass('active');
        $('#s19-3').addClass('active');
      }
    },
    // 離開section後減速
    onLeave: function(origin, destination, direction) {
      $.modal.close();
      var leavingSection = this;

      if (destination.anchor == "s2") {
        $('#fullpage').fullpage.setScrollingSpeed(800);
      } else if (destination.anchor == "s9") {
        $('#fullpage').fullpage.setScrollingSpeed(800);
      } else if (destination.anchor == "s14") {
        $('#fullpage').fullpage.setScrollingSpeed(800);
      } else if (destination.anchor == "s16") {
        $('#fullpage').fullpage.setScrollingSpeed(800);
      } else {
        $('#fullpage').fullpage.setScrollingSpeed(800);
      }
    },
    afterSlideLoad: function(section, origin, destination, direction) {
      if (section.anchor == "s4" || section.anchor == "s10") {
        $("#" + origin.item.id + " .section-left").fadeOut();
        $("#" + destination.item.id + " .section-left").fadeIn({duration: 1000});
      }
      else if (section.anchor == "s16") {
        if (origin.item.id !== destination.item.id) {
          $("#" + origin.item.id + " img").fadeOut();
          $("#" + destination.item.id + " img").fadeIn({duration: 1000});
        }
      }
    },
  });

  $(document).keydown(function (e) {
    var shiftPressed = e.shiftKey;
    const currentSlide = fullpage_api.getActiveSlide();

    switch (e.which) {
        //up
      case 38:
      case 33:
        if (currentSlide) {
          if (currentSlide.isFirst) {
            fullpage_api.moveSectionUp()
          }
          else {
            fullpage_api.moveSlideLeft();
          }
        }
        else {
          fullpage_api.moveSectionUp()
        }

        break;

        //down
      case 40:
      case 34:
        if (currentSlide) {
          if (currentSlide.isLast) {
            fullpage_api.moveSectionDown()
          }
          else {
            fullpage_api.moveSlideRight();
          }
        }
        else {
          fullpage_api.moveSectionDown()
        }
        break;

    }
  });

  /**
        Sound button
   **/
  $("a.sound").click(function(event) {
    event.preventDefault();
    var song = $('audio').get(0);
    // song.play();

    if (song.paused) {
      $("a.sound .audio").addClass("play");
      $(".sound-play").show();
      $(".sound-stop").hide();
      song.play();
      $('audio').animate({ volume: 1 }, 500);
    } else {
      $(".sound-play").hide();
      $(".sound-stop").show();
      $("a.sound .audio").removeClass("play");
      $('audio').animate({ volume: 0 }, 500, function() {
        song.pause();
      });
    }
    return false;
  });

  /**
     Product modal button
  **/
  $('.popupBotton a').click(function(event) {
    event.preventDefault();
    const anchor = fullpage_api.getActiveSection().anchor.slice(1);
    const index = fullpage_api.getActiveSlide() ? fullpage_api.getActiveSlide().index + 1 : 1;

    $("#product-modal img").attr("src", "image/pop" + anchor + "-" + index + ".jpg");
    $("#product-modal").modal({
      fadeDuration: 500,
      showClose: false
    });
  });

  /**
     Customer request info submit button
  **/
  $("#product-modal input.submit").click(function (event) {
    event.preventDefault();

    const customerName= $("#customer-name").val();
    const customerEmail = $("#customer-email").val();
    let emailContent = $("#email-content").val();
    var isValid = true;
    var isEmailValid = false;

    if (customerName == "" || customerEmail == "" || emailContent == "") {
      isValid = false;
    }

    isEmailValid = validateEmail(customerEmail);

    if (isValid && isEmailValid) {
      console.log()

      Email.send({
        Host : "smtp.gmail.com",
        Username : "email",
        Password : "password",
        To : customerEmail,
        From : "email",
        Subject : "This is the subject",
        Body : emailContent + '產品頁來源:'+ fullpage_api.getActiveSection().anchor + (fullpage_api.getActiveSlide() ? '&' + fullpage_api.getActiveSlide().index : "")
      }).then((message) => {
        alert("Sent");
        $.modal.close();
      }
      );
    }
    else if (!isEmailValid) {
      alert("Your email is invalid")
    }
  });

  $("#newsletter input.submit").click(function (event) {
    event.preventDefault();

    const newsletterEmail = $("#newsletter-email").val();

    if (validateEmail(newsletterEmail)) {
      Email.send({
        Host : "smtp.gmail.com",
        Username : "email",
        Password : "password",
        To : newsletterEmail,
        From : "email",
        Subject : "This is the subject",
        Body : "Fill body"
      }).then(
        message => alert("Sent")
      );
    }
    else {
      alert("Your email is invalid")
    }
  });


  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
});
