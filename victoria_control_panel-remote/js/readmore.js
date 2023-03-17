$('.hiding').addClass('hide-me');

$('.read-more').on('click', function() {
  $(this).addClass('hide-me');
  $('.hiding').toggle();
  $('.dots').toggle();
});
$('.show-less').on('click', function() {
  $(this).removeClass('hide-me');
  $('.read-more').removeClass('hide-me');
  $('.hiding').toggle();
  $('.dots').toggle();
});