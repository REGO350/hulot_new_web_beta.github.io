/** 
  * Template Name: OsteriaX
  * Version: 1 
  * Template Scripts
  * Author: MarkUps
  * Author URI: http://www.markups.io/  
  * Revised: hulot
**/

var page_num=1;
var groups = {};

jQuery(function($){
  /* ----------------------------------------------------------- */
  /*  1. TOP SLIDER (SLICK SLIDER)
  /* ----------------------------------------------------------- */    

    jQuery('.mu-top-slider').slick({
      dots: true,
      infinite: true,
      arrows: false,
      speed: 500,     
      autoplay: true,
      fade: true,
      cssEase: 'linear'
    });

  /* ----------------------------------------------------------- */
  /*  2. PORTFOLIO POPUP VIEW ( IMAGE LIGHTBOX )
  /* ----------------------------------------------------------- */ 

  $('.mu-imglink').magnificPopup({
    type: 'image',
    mainClass: 'mfp-fade',
    gallery:{
      enabled:true
    }
  });

  /* ----------------------------------------------------------- */
  /*  3. MENU SLIDER
  /* ----------------------------------------------------------- */
  function change_word(){
    if (window.innerWidth < 667) {
      $('#tab-button-2').html('木');
      $('#tab-button-3').html('金');
      $('#tab-button-4').html('土');
      $('#tab-button-5').html('日');
    }else{
      $('#tab-button-2').html('木曜');
      $('#tab-button-3').html('金曜');
      $('#tab-button-4').html('土曜');
      $('#tab-button-5').html('日曜');
    }
  }

  change_word();

  $(window).resize(function () {
    change_word();
  });

  $('#tab-button-1').click(function(){
    page_num = 1;
    $('.tab-slide-'+page_num).fadeOut(1).removeClass('active');
    $('.tab-slide-'+page_num).first().fadeIn(1).addClass('active');
  });
  $('#tab-button-2').click(function(){
    page_num = 2;
    $('.tab-slide-'+page_num).fadeOut(1).removeClass('active');
    $('.tab-slide-'+page_num).first().fadeIn(1).addClass('active');
  });
  $('#tab-button-3').click(function(){
    page_num = 3;
    $('.tab-slide-'+page_num).fadeOut(1).removeClass('active');
    $('.tab-slide-'+page_num).first().fadeIn(1).addClass('active');
  });
  $('#tab-button-4').click(function(){
    page_num = 4;
    $('.tab-slide-'+page_num).fadeOut(1).removeClass('active');
    $('.tab-slide-'+page_num).first().fadeIn(1).addClass('active');
  });
  $('#tab-button-5').click(function(){
    page_num = 5;
    $('.tab-slide-'+page_num).fadeOut(1).removeClass('active');
    $('.tab-slide-'+page_num).first().fadeIn(1).addClass('active');
  });
  $('#right-arrow').click(function(){
    var currentSlide = $('.tab-slide-'+page_num+'.active');
    var nextSlide = currentSlide.next();

    if(nextSlide.length!=0){
      currentSlide.hide(500).removeClass('active');
      nextSlide.show(500).addClass('active');
    }else if(page_num!=5){
      $('#tab-button-'+(page_num+1)).click();
    }else{
      $('#tab-button-1').click();
    }
  });
  $('#left-arrow').click(function(){
    var currentSlide = $('.tab-slide-'+page_num+'.active');
    var prevSlide = currentSlide.prev();

    if(prevSlide.length!=0){
      currentSlide.hide(500).removeClass('active');
      prevSlide.show(500).addClass('active');
    }else if(page_num!=1){
      $('#tab-button-'+(page_num-1)).click();
    }else{
      $('#tab-button-5').click();
    }
  });

  /* ----------------------------------------------------------- */
  /*  4. MENU IMAGES
  /* ----------------------------------------------------------- */
  $('.galleryItem').each(function(){
    var id = parseInt($(this).attr('data-group'), 10);
    if(!groups[id]){
      groups[id] = [];
    }
    groups[id].push( this );
  });

  $.each(groups, function(){
    $(this).magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: true,
      gallery: { enabled: false}
    })
  });

  /* ----------------------------------------------------------- */
  /*  5. GOOGLE MAP
  /* ----------------------------------------------------------- */ 
        
    $('#mu-map').click(function () {
        $('#mu-map iframe').css("pointer-events", "auto");
    });
    
    $("#mu-map").mouseleave(function() {
      $('#mu-map iframe').css("pointer-events", "none"); 
    });
    
  /* ----------------------------------------------------------- */
  /*  6. MENU SMOOTH SCROLLING
  /* ----------------------------------------------------------- */ 
  
    //MENU SCROLLING WITH ACTIVE ITEM SELECTED

      // Cache selectors
      var lastId,
      topMenu = $(".mu-main-nav"),
      topMenuHeight = topMenu.outerHeight()+42, //was 13
      // All list items
      menuItems = topMenu.find('a[href^=\\#]'),
      // Anchors corresponding to menu items
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });

      // Bind click handler to menu items
      // so we can get a fancy scroll animation
      menuItems.click(function(e){
        var text = $(e.target).attr("href").slice(1);
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+32;
        jQuery('html, body').stop().animate({ 
            scrollTop: offsetTop
        }, 1500);   
        jQuery('.navbar-collapse').removeClass('in');  
        menuItems.parent().end().filter("[href=\\#"+text+"]").parent().addClass("active");
      });

      // Bind to scroll
      jQuery(window).scroll(function(){
         // Get container scroll position
         var fromTop = $(this).scrollTop()+topMenuHeight+300; //was +0
         var bottom=false;
         // Get id of current scroll item
         var cur = scrollItems.map(function(){
           if ($(this).offset().top < fromTop)
             return this;
         });
        // Get the id of the current element
        cur = cur[cur.length-1];
        var id = cur && cur.length ? cur[0].id : "";  

         //check if the user has reached the bottom of the page
         if($(window).scrollTop() + $(window).height() == $(document).height()) {
            menuItems.parent().removeClass("active");
            menuItems.parent().end().filter("[href=\\#"+"mu-map"+"]").parent().addClass("active");
            lastId = "mu-map";
         }else{
          if (lastId !== id) { 
            // Set/remove active class
            menuItems.parent().end().filter("[href=\\#"+lastId+"]").parent().removeClass("active");
            menuItems.parent().end().filter("[href=\\#"+id+"]").parent().addClass("active");
            lastId = id;
          }    
         }  
      })
  
  /* ----------------------------------------------------------- */
  /*  7. HOVER DROPDOWN MENU
  /* ----------------------------------------------------------- */ 
  
  // for hover dropdown menu
    jQuery('ul.nav li.dropdown').hover(function() {
      jQuery(this).find('.dropdown-menu').stop(true, true).delay(200).fadeIn(200);
    }, function() {
      jQuery(this).find('.dropdown-menu').stop(true, true).delay(200).fadeOut(200);
    });

    
  /* ----------------------------------------------------------- */
  /*  8. SCROLL TOP BUTTON
  /* ----------------------------------------------------------- */

  //Check to see if the window is top if not then display button

    jQuery(window).scroll(function(){
      if (jQuery(this).scrollTop() > 400) {
        jQuery('.scrollToTop').fadeIn();
      } else {
        jQuery('.scrollToTop').fadeOut();
      }
    });
     
    //Click event to scroll to top

    jQuery('.scrollToTop').click(function(){
      jQuery('html, body').animate({scrollTop : 0},800);
      return false;
    });
  
  /* ----------------------------------------------------------- */
  /*  9. BUTTON SMOOTH SCROLL ( VIEW MY WORK )
  /* ----------------------------------------------------------- */

    $('.mu-reservation-btn').on('click',function (e) {
          e.preventDefault();
          var target = this.hash,
          $target = $(target);
          $('html, body').stop().animate({
              'scrollTop': $target.offset().top
          }, 1000, 'swing', function () {
              window.location.hash = target;
      });
  });
  
});

