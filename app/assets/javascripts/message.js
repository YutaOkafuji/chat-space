$(function(){
  function buildHTML(message){
    var imageHtml = message.image == null? "" : `<img src="${message.image}" class= 'lower-message__image'>`
    var html = `<div class="right-content__messages__message>
                  <p class="right-content__messages__message__user-name">
                   ${message.user_name}
                  </p>
                  <a class="right-content__messages__message__created_at">
                   ${message.created_at}
                  </a>
                  <p class="right-content__messages__message__user-message">
                    ${ message.body }
                  </p>
                  ${imageHtml}
                </div>`
    return html;
  }
  $('#message-form').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.right-content__messages').append(html);
      $('.input-box__text').val('');
      $('.right-content__messages').animate({scrollTop:$('.right-content__messages')[0].scrollHeight});
      $('.input-submit').attr('disabled', false);
    })
    .fail(function() {
      alert('error');
      $('.input-submit').attr('disabled', false);
    })
  });
});