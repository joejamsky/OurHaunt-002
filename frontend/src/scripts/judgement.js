let condemn = null; // Initially, no choice is made


$('#judgement-condemn').on('click', function() {
    $(this).toggleClass('active');
    $('#judgement-rescue').removeClass('active');
    condemn = $(this).hasClass('active') ? true : null; // Set to true if active, null if not
});

$('#judgement-rescue').on('click', function() {
    $(this).toggleClass('active');
    $('#judgement-condemn').removeClass('active');
    condemn = $(this).hasClass('active') ? false : null; // Set to false if active, null if not
});

