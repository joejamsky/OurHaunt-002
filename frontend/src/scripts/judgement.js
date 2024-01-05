let condemn = null; // Initially, no choice is made
let confirmed = false

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

$('#judgement-confirm').on('click', function() {
    if (condemn !== null && confirmed !== true) {
        confirmed = true
        console.log('Action confirmed. Condemn:', condemn);
        // Proceed with the confirmed action
    }
});
