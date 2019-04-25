$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var imageHtml = message.is_image_present ? `<img src="${message.image}" class= 'lower-message__image'> ` : ''
    var html = `<div class="right-content__messages__message" data-id="${message.id}" >
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

  function buildErrorHTML(){
    var html = `<div class="right-content__messages__message">
                  <p class="right-content__messages__message__user-message">
                    メッセージを正常に取得できませんでした。
                  </p>
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
    .done(function(message) {
      var html = buildHTML(message);
      $('.right-content__messages').append(html);
      $('.input-box__text').val('');
      $('.right-content__messages').animate({scrollTop:$('.right-content__messages')[0].scrollHeight});
      $('.input-submit').attr('disabled', false);
    })
    .fail(function() {
      alert('メッセージを正常に送れませんでした。');
      $('.input-submit').attr('disabled', false);
    })
  });

  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    var reloadMessages = function() {
      var location_url = location.href;
      var group_id_url = location_url.match(/\/\d+/)
      var last_message_id = $('.right-content__messages__message:last').data('id');
      
      $.ajax({
        url: '/groups' + group_id_url +'/api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(message) {
          message.forEach(function(message){
          var insertHTML = buildHTML(message); 
          $('.right-content__messages').append(insertHTML);
          $('.right-content__messages').animate({scrollTop:$('.right-content__messages')[0].scrollHeight});
        })
      })
      .fail(function() {
        var errorMessage = buildErrorHTML();
        $('.right-content__messages').append(errorMessage);
      });
    };

    $(function(){
      setInterval(reloadMessages, 5000);
    });

  } else {
    clearInterval(reloadMessages, 5000);
  }

});
