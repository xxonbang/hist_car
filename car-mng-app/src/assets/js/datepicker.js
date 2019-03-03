
$( document ).ready(function() {
    $('#dp1').datepicker();
    $('#dp2').datepicker();

    $( ".datepicker" ).datepicker({
        showOn: "button",
        buttonImage: "/assets/images/calendar.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        
    });
});
