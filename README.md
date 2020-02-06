# `Back End API Documentation`

## Dependencies

- Express
- CORS
- Helmet
- Knex
- SQLite3
- Postgres
- Supertest
- Jest
- Nodemon
- Dotenv
- Cross-env
- BcryptJS
- JSON Web Tokens
- Knex Cleaner

## Download Project and Install Dependencies

- fork and clone this repository.
- **CD into the folder** where you downloaded the repository.
- run `npm i` to download all dependencies.


# `Database Schema`

### Users

| field        | data type        | metadata                                            |
| :----------- | :--------------- | :-------------------------------------------------- |
| id           | unsigned integer | primary key, auto-increments, generated by database |
| username    | string, 128 characters | username, required, unique.        |
| password  | string, hashed | required                                            |

### Projects Schema


| field        | data type        | metadata                                            |
| :----------- | :--------------- | :-------------------------------------------------- |
| project_id           | unsigned integer | primary key, auto-increments, generated by database |
| user_id  | string | joined with users table id, required                                            |
| title    | string, 256 characters | Required.       |
| description  | string | not required                                            |
| goal_amount  | string | not required                                            |
| amount_received  | string | not required                                            |
| funding_completed  | boolean | not required                                            |


# `Endpoints`

    BaseURL: https://sixr-clone.herokuapp.com

## - Project Overview Router

1) Project Overview:

    GET - /api/overview/

## - Auth Router


2) REGISTER:

    POST - /api/auth/register/

        {
            "username":"insert username here", <----required
            "password":"insert password here" <----required
        }

3) LOGIN: 

    POST - /api/auth/login/

        {
            "username":"insert username here", <----required, unique.
            "password":"insert password here" <----required
        }

        * returns a token. Assign token to "Authorization" header.

## - Users Router

4) GET All Users:

        GET - /api/users/

        * requires token from login function set to "Authorization" header.

5) GET A Single User: 

        GET - /api/users/:userId

        * requires token from login function set to "Authorization" header.

6) UPDATE A User: 

        PUT - /api/users/:userId

        {
            "username":"insert username here", <----required
            "password":"insert password here" <----required
        }

7) DELETE A User: 

        DELETE - /api/users/:userId

## - Projects Router

8) GET All Projects for a User :

        GET - /:userId/projects/

        * requires token from login function set to "Authorization" header.

9) GET A Single Project attached to a User : 

        GET - /:userId/projects/:id

        * requires token from login function set to "Authorization" header.

10) ADD A User: 

        POST - /:userId/projects/

        {
            user_id: same # as user.id  <----required
            title: string, required     <----required
            description: string
            goal_amount: integer
            amount_received: integer
            funding_completed: boolean
        }

        * requires token from login function set to "Authorization" header.

11) UPDATE A User: 

        PUT - /:userId/projects/:id

        {
            user_id: same # as user.id  <----required
            title: string, required     <----required
            description: string
            goal_amount: integer
            amount_received: integer
            funding_completed: boolean
        }

        * requires token from login function set to "Authorization" header.

12) DELETE A User: 

        DELETE - /:userId/projects/:id

        * requires token from login function set to "Authorization" header.

# `Developer`

### Stephen Tanksley - Back End API Architect
- http://github.com/stephentanksley
