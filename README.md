# TECH::EXPERT　応用カリキュラム

# database設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|e_mail|string|null: false, unique: true|
|password|string|null: false, unique: true|
|name|string|null:false|index: true|

### Association

- has_many :groups, through: :group_users
- has_many :group_users
- has_many :messages


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null :false|

### Association

- has_many :user, through: :group_users
- has_many :group_users
- has_many :messages


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null :false, foreign_key: true|

### Association

- belongs_to :user
- belongs_to :group


## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null :false, foreign_key: true|

### Association

- belongs_to :group
- belongs_to :user


