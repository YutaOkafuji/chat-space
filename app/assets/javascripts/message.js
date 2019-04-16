$(function(){
  $('#message-form').on('submit', function(e) {
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
    .done(function(data){
      var html = buildHTML(data);
      $('.right-content__messages').append(html);
      $('.input-box__text').val('')
    })
  });
});