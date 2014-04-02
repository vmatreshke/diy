/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */


$(document).ready(function() {

	_.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };
	// clicking nav
	$('.nav a').click(function(event) {
		gotoslide = $(this).data('slide');
		goto(gotoslide,500);
		return false;
	});
	function goto(n, time){
		$('.nav a').removeClass('is-active');
		$('.nav a:nth-child('+n+')').addClass('is-active');
		slide = $('#slide'+n);
		  $('html, body').animate({
	        scrollTop: slide.offset().top
	    }, time);
		
	}
	function next(){
		cur = $('.nav .is-active').data('slide');
		if(cur<7){
			console.log(cur);
			goto(cur+1,500)
		}
	}
	function prev(){
		cur = $('.nav .is-active').data('slide');
		if(cur>0){
			console.log(cur);
			goto(cur-1,500)
		}
	}
	prevv = _.debounce(prev, 1000, true)
	nextt = _.debounce(next, 1000, true)
	// on rezize stick to slide
	$(window).resize(function(event) {
		gotoslide = $('nav .is-active').data('slide');
		goto(gotoslide,100);
	});


	var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x

	// function scrollme(){
	// 	console.log('aaa');
	// }
	// $('body').bind(mousewheelevt, $.debounce(1000, scrollme ));
	$('body').bind(mousewheelevt, function(e){

	    var evt = window.event || e //equalize event object     
	    evt = evt.originalEvent ? evt.originalEvent : evt; //convert to originalEvent if possible               
	    var delta = evt.detail ? evt.detail*(-40) : evt.wheelDelta //check for detail first, because it is used by Opera and FF

	    if(delta > 0) {
	        prevv();
	    }
	    else{
	        nextt();
	    }   
	    return false;
	});
});