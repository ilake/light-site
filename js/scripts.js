jQuery(document).ready(function($) {
  $('#fullpage').fullpage({
    licenseKey: '3C8C1C74-DC98479A-8BD95AE2-E3570D1F',
    scrollingSpeed: 800,
    controlArrows: false,
    scrollHorizontally: true,
    scrollHorizontallyKey: 'INSERT YOUR EXTENSION KEY HERE', //see https://goo.gl/xkUmHS
    // 進入section後加速
    afterLoad: function(origin, destination, direction) {
      var leavingSection = this;

      if (destination.anchor == "s2") {
        $('#fullpage').fullpage.setScrollingSpeed(0);
      } else if (destination.anchor == "s4") {
        $('#fullpage').fullpage.setScrollingSpeed(0);
      } else if (destination.anchor == "s9") {
        $('#fullpage').fullpage.setScrollingSpeed(0);
      } else if (destination.anchor == "s10") {
        $('#fullpage').fullpage.setScrollingSpeed(0);
      } else if (destination.anchor == "s14") {
        $('#fullpage').fullpage.setScrollingSpeed(0);
      } else if (destination.anchor == "s16") {
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
      song.play();
      $('audio').animate({ volume: 1 }, 500);
    } else {
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

    if (customerName == "" || customerEmail == "" || emailContent == "") {
      isValid = false;
    }

    if (isValid) {
      console.log()

      Email.send({
        Host : "smtp.gmail.com",
        Username : "email",
        Password : "password",
        To : customerEmail,
        From : "email",
        Subject : "This is the subject",
        Body : emailContent + '產品頁來源:'+ fullpage_api.getActiveSection().anchor + (fullpage_api.getActiveSlide() ? '&' + fullpage_api.getActiveSlide().index : "")
      }).then(
        message => alert("Sent")
      );
    }
  });

  $("#newletter input.submit").click(function (event) {
    const newsletterEmail = $("#newsletter-email").val();

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
  });
});
