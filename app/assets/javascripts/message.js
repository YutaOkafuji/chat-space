$(function(){
  $('message-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: '/groups/:group_id/messages',
      type: 'POST',
      data: formData,
      datatype: 'json',
      processData: false,
      contentType: false
    })
  });
});