$(function(){
  var search_list = $("#user-search-result");
  var member_list = $('#chat-group-users');

  function appendSearchedUserHTML(user_name) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user_name.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user_name.id}" data-user-name="${user_name.name}" >追加</a>
                </div>`
    search_list.append(html);
  };

  function buildHtml2(name, user_id) {
    var html2 = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                   <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                   <p class='chat-group-user__name'>${name}</p>
                   <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                 </div>`
    member_list.append(html2);
  };

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_list.append(html);
  };

  $('#user-search-field').on('keyup', function(){

    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(user_names){
      $("#user-search-result").empty();
      if (user_names.length !== 0){
        user_names.forEach(function(user_name){
          appendSearchedUserHTML(user_name);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが存在しません。");
      };
    })
    .fail(function(){
      alert('通信に失敗しました');
    })
  });

  $(function(){
    $(document).on('click', '.user-search-add', function() {
      var name = $(this).attr("data-user-name");
      var user_id = $(this).attr("data-user-id");
      $(this).parent().remove();
      buildHtml2(name, user_id);
    });
  });

  $(function(){
    $(document).on('click', '.user-search-remove', function() {
      $(this).parent().remove();
    });
  });
});