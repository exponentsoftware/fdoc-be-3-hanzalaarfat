# Backend Assignment

## TODO List for Users

- Add User collection to store below user information:
  - User name
  - email
  - phone
  - created at
  - updated at
  - role
- Add validation on phone and email from the Mongoose schema itself with error message handling
- Link Todo list with User
- Create api to get TODO list for User
- Create User roles for Admin, App user
- User with Admin role should be able to get all Todos
- User with App user role, should be able to fetch only his Todo list

### Prefered Technologies

| Environment  | Framework  |
| ------------ | ---------- |
| Backend APIs | Express Js |
| Database     | MongoDB    |
| ORM/ODM      | Mongoose   |

all Route

user route :->
Method post user/login
Method post user/signup
Method get user/todo/ user get his all todo
Method get user/todo/?query user get his all todo by category wise
Method get http://localhost:3000/user/todo/61517506064356038a35cd88 user get single todo
Method put http://localhost:3000/user/todo/61516a006bef02d3e6c881c4\
Method delet http://localhost:3000/user/todo/61517506064356038a35cd88

admin Route:->

Method post admin/login
Method post admin/signup
Method get admin/todo admin get all users todo
Method get admin/todo/?query user get his all todo by category wise
Method get http://localhost:3000/admin/todo/61517506064356038a35cd88 admin get any ueser single todo
Method put http://localhost:3000/admin/todo/61516a006bef02d3e6c881c4\ admin update any ueser single todo
Method delet http://localhost:3000/user/todo/61517506064356038a35cd88 admin delete any ueser single todo
