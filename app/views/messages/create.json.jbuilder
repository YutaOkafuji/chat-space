json.user_name  @message.user.name
json.group      @message.group
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.body       @message.body
json.image      @message.image
json.id         @message.id