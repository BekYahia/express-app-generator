
# Express app generator

## Documentation
[Documentation](https://bekyahia.github.io/blog/express-app-generator-with-tests).
## API Reference

#### Get all users

```http
  GET /api/users
```

#### Create user

```http
  POST /api/users
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required** |
| `email`     | `string` | **Required**. |
| `password`  | `string` | **Required**. |
| `role`      | `string` | **Optional**. default is ``` user``` |


#### Get user

```http
  GET /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of user to fetch |


#### Update user

```http
  UPDATE /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of user to update |


#### Delete user

```http
  DELETE /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `number` | **Required**. Id of user to delete |


#### Authenticate user

```http
  GET /api/users/me
```

| header    | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x-auth-token`       | `string` | **Required**. to identify the user |

  
## Installation
### 1) Environment Variables
rename ``` .env.sample ``` to ``` .env ``` and write your DB credentials

### 2) Dependencies
  ```
  npm i
  ```
  
### 3) Then run on your envirnoment:
#### development

```
  npm run dev
```
#### production

```
  npm start
```

#### test

```
  npm test
```
    
