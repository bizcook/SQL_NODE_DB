$(document).ready(function() {

    $('#submit-button').on('click', postData);


});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            console.log(data);
            appendDom(data);
        }
    });
}

function appendDom (data) {
  for(var i = 0; i < data.length; i++) {
  $('#results').append('<ul class = peopleInfo></ul>');
  var $el = $('#results').children().last();
  $el.append('<li>' + data[i].name + '</li>');
  $el.append('<li>' + data[i].address + '</li>');
  $el.append('<li>' + data[i].city + '</li>');
  $el.append('<li>' + data[i].state + '</li>');
  $el.append('<li>' + data[i].zip_code + '</li>');

}
}
