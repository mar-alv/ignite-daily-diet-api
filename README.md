<h1 align='center'> Ignite Daily Diet API </h1>

<div align='center'>

  ![project-img](.github/cover.jpg)
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

  [🇵🇹 Português](./docs/README-pt.md)

</div>

## 📚 Summary
- [❕ About](#about)
- [📖 Instructions](#instructions)
  - [📥 Install](#install)
  - [🚀 Run Locally](#locally)
	- [📋 Run Unit Tests](#unit-tests)
- [⚡ Endpoints](#endpoints)
- [📂 Structure](#structure)
- [🧰 Technologies](#technologies)
- [📸 Screenshots and 🎥 Recordings](#screenshots-prints)
- [👤 Author](#author)
- [📄 License](#license)

### <a id='about' style='text-decoration: none; color: inherit;'>❕ About</a>
This is my implementation of the challenge project "Daily Diet API" from the second Node.js module of [Ignite](https://www.rocketseat.com.br/ignite), an intermediate and advanced course in various programming languages and technologies offered by [Rocketseat](https://www.rocketseat.com.br/).

### <a id='instructions' style='text-decoration: none; color: inherit;'>📖 Instructions</a>
#### <a id='instalar' style='text-decoration: none; color: inherit;'>📥 Install</a>
Paste this 1º command into a terminal opened within a folder of your preference to clone the project
```sh
git clone https://github.com/mar-alv/ignite-daily-diet.git
```

Then run one of the versions of the 2º command to install the dependencies
```sh
npm i
```
```sh
npm install
```

#### <a id='locally' style='text-decoration: none; color: inherit;'>🚀 Run Locally</a>
Paste the command into a terminal, the server will be accessable through the port 3001
```sh
npm run dev
```

#### <a id='unit-tests' style='text-decoration: none; color: inherit;'>📋 Run Unit Tests</a>
Paste the command into a terminal, they will be exectued one after the other mentioning if there were failed tests
```sh
npm run test
```

### <a id='endpoints' style='text-decoration: none; color: inherit;'>⚡ Endpoints</a>
In order to make requests to the server with 🥧 HTTPie directly from the terminal, you would have to follow its CLI [installation guide](https://httpie.io/docs/cli/main-features)
#### Create user
Creates a new user
```sh
curl -X POST http://localhost:3001/users -h "Content-Type: application/json" -d '{"name": "mar alv","age": 30,"height": 210,"weight": 100,"sex": "masculine"}'
```

With 🥧 HTTPie
```sh
http POST http://localhost:3001/users < httpie/create-user.json
```

Responses
```
# When successfully doing it

HTTP/1.1 201 Created
Connection: keep-alive
set-cookie: sessionId=39cad374-1d58-48e3-bb3b-e63cdaf76163; Max-Age=604800; Path=/

{
    "userId": "dfb402ec-7962-4bb3-a6e2-b1d674430dbd"
}

# When not providing an attribute

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "age": [
            "Required"
        ],
				...
    },
    "message": "Invalid input"
}

# When providing a name that is too short

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "name": [
            "Name must be at least 3 characters long"
        ]
    },
    "message": "Invalid input"
}

# When providing an age below 12 years

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "age": [
            "Age must be at least 12 years old"
        ]
    },
    "message": "Invalid input"
}

# When providing an age above 110 years

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "age": [
            "Age must be no more than 110 years old"
        ]
    },
    "message": "Invalid input"
}

# When providing a height below 130cm

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "height": [
            "Height must be at least 130 cm"
        ]
    },
    "message": "Invalid input"
}

# When providing a height above 270cm

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "height": [
            "Height must be no more than 270 cm"
        ]
    },
    "message": "Invalid input"
}

# When providing a weight below 30kg

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "weight": [
            "Weight must be at least 30 kg"
        ]
    },
    "message": "Invalid input"
}

# When providing an invalid sex

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "sex": [
            "Please select either "masculine" or "feminine" as your sex"
        ]
    },
    "message": "Invalid input"
}
```

#### Get user
Gets an user by its id
```sh
curl -X GET "http://localhost:3001/users/245f1c46-101d-471a-976f-74878e61c819" -H "Cookie: sessionId=1384df4b-bc5c-400f-9ae4-8dd841aafc3e"
```

With 🥧 HTTPie
```sh
http GET http://localhost:3001/users/245f1c46-101d-471a-976f-74878e61c819 "Cookie:sessionId=1384df4b-bc5c-400f-9ae4-8dd841aafc3e"
```

Responses
```
# When successfully doing it

HTTP/1.1 200 OK
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "user": {
        "age": 30,
        "height": 210,
        "name": "mar alv",
        "sex": "masculine",
        "weight": 100
    }
}

# When sending an invalid uuid

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "id": [
            "Invalid user ID"
        ]
    },
    "message": "Invalid input"
}

# When not finding the user

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "User not found"
}

# When being unauthorized

HTTP/1.1 401 Unauthorized
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Unauthorized"
}
```

#### Get metrics
Gets an user's metrics
```sh
curl -X GET "http://localhost:3001/users/245f1c46-101d-471a-976f-74878e61c819/metrics" -H "Cookie: sessionId=1384df4b-bc5c-400f-9ae4-8dd841aafc3e"
```

With 🥧 HTTPie
```sh
http GET http://localhost:3001/users/245f1c46-101d-471a-976f-74878e61c819/metrics "Cookie:sessionId=1384df4b-bc5c-400f-9ae4-8dd841aafc3e"
```

Responses
```
# When successfully doing it

HTTP/1.1 200 OK
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "bestDietSequence": 1,
		"dietPercentage": 50,
    "platesAmount": 2,
    "platesOnDiet": 1,
    "platesOutOfDiet": 1
}

# When sending an invalid uuid

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "id": [
            "Invalid user ID"
        ]
    },
    "message": "Invalid input"
}

# When not finding the user

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "User not found"
}

# When being unauthorized

HTTP/1.1 401 Unauthorized
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Unauthorized"
}
```

#### Create plate
Creates a new plate for an user
```sh
curl -X POST http://localhost:3001/users/835fc927-94e8-4bda-be46-db2f12dca0f9/plates -h "Content-Type: application/json" -d '{"name":"Grilled Chicken Salad","description":"A fresh salad with grilled chicken, mixed greens, and a light vinaigrette.","inDiet":true}'
```

With 🥧 HTTPie
```sh
http POST http://localhost:3001/users/835fc927-94e8-4bda-be46-db2f12dca0f9/plates < httpie/create-plate.json
```

Responses
```
# When successfully doing it

HTTP/1.1 201 Created
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "plateId": "8a07b00e-e396-4f03-b3f0-d2e850fc177e"
}

# When not providing an attribute

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "userId": [
            "Required"
        ],
				...
    },
    "message": "Invalid input"
}

# When providing an invalid user id

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "userId": [
            "Invalid user ID"
        ]
    },
    "message": "Invalid input"
}

# When providing a name that is too short

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "name": [
            "Name must be at least 2 characters long"
        ]
    },
    "message": "Invalid input"
}

# When providing an invalid specification of the plate belonging to the diet

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "inDiet": [
            "Please specify if the plate is on a diet."
        ]
    },
    "message": "Invalid input"
}

# When being unauthorized

HTTP/1.1 401 Unauthorized
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Unauthorized"
}

# When not finding the user

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "User not found"
}
```

#### Get plates
Gets all plates added by an user
```sh
curl -X GET "http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates" -H "Cookie: sessionId=1384df4b-bc5c-400f-9ae4-8dd841aafc3e"
```

With 🥧 HTTPie
```sh
http GET http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates "Cookie:sessionId=c0c01f92-f54b-4b1f-a294-d8876267203c; Max-Age=604800; Path=/"
```

Responses
```
# When successfully doing it

HTTP/1.1 200 OK
Connection: keep-alive
content-type: application/json; charset=utf-8

{
  "plates": {
    "2024-09-28": [
      {
        "id": "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        "name": "Grilled Chicken Salad",
        "description": "A fresh salad with grilled chicken, mixed greens, and a light vinaigrette.",
        "inDiet": true,
        "createdAt": "2024-09-28T14:30:00.000Z"
      },
      {
        "id": "7h8i9j0k-1l2m-3n4o-5p6q-7r8s9t0u1v2w",
        "name": "Fruit Smoothie",
        "description": "A delicious smoothie made with mixed fruits.",
        "inDiet": true,
        "createdAt": "2024-09-28T15:00:00.000Z"
      }
    ],
    "2024-09-27": [
      {
        "id": "3n4o5p6q-7r8s-9t0u-1v2w-3x4y5z6a7b8c",
        "name": "Pasta Primavera",
        "description": "Pasta with a variety of fresh vegetables.",
        "inDiet": false,
        "createdAt": "2024-09-27T12:15:00.000Z"
      }
    ]
  }
}

# When not having plates created

HTTP/1.1 200 OK
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "plates": {}
}

# When sending an invalid user id

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "userId": [
            "Invalid user ID"
        ]
    },
    "message": "Invalid input"
}

# When not finding the user

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "User not found"
}

# When being unauthorized

HTTP/1.1 401 Unauthorized
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Unauthorized"
}
```

#### Get a plate
Gets a plate created by an user
```sh
curl -X GET "http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates/dd2786d7-c0e7-4dd1-a435-100728774102" -H "Cookie: sessionId=1384df4b-bc5c-400f-9ae4-8dd841aafc3e"
```

With 🥧 HTTPie
```sh
http GET http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates/dd2786d7-c0e7-4dd1-a435-100728774102 "Cookie:sessionId=c0c01f92-f54b-4b1f-a294-d8876267203c; Max-Age=604800; Path=/"
```

Responses
```
# When successfully doing it

HTTP/1.1 200 OK
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "plate": {
				"createdAt": "2024-07-22 23:34:30",
				"description": "A fresh salad with grilled chicken, mixed greens, and a light vinaigrette.",
				"id": "dd2786d7-c0e7-4dd1-a435-100728774102",
				"inDiet": true,
				"name": "Grilled Chicken Salad",
				"updatedAt": "2024-07-22 23:34:30"
		}
}

# When sending an invalid user id

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "userId": [
            "Invalid user ID"
        ]
    },
    "message": "Invalid input"
}

# When sending an invalid plate id

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "plateId": [
            "Invalid plate ID"
        ]
    },
    "message": "Invalid input"
}

# When not finding the user

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "User not found"
}

# When not finding the plate

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Plate not found"
}

# When being unauthorized

HTTP/1.1 401 Unauthorized
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Unauthorized"
}
```

#### Update plate
Update a plate's data of an user
```sh
curl -X PUT http://localhost:3001/users/835fc927-94e8-4bda-be46-db2f12dca0f9/plates/2b5d459e-55c3-48a7-ac21-86dc8c1049b7  -h "Content-Type: application/json" -d '{"name":"Grilled Chicken Salad","description":"A fresh salad with grilled chicken, mixed greens, and a light vinaigrette.","inDiet":true,"createdAt":"2024-07-25T00:00:00.000Z"}'
```

With 🥧 HTTPie
```sh
http PUT http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates/2b5d459e-55c3-48a7-ac21-86dc8c1049b7 "Cookie:sessionId=c0c01f92-f54b-4b1f-a294-d8876267203c; Max-Age=604800; Path=/" < httpie/update-plate.json
```

Responses
```
# When successfully doing it

HTTP/1.1 204 No Content
Connection: keep-alive

# When providing an invalid user id

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "userId": [
            "Invalid user ID"
        ]
    },
    "message": "Invalid input"
}

# When providing an invalid plate id

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "plateId": [
            "Invalid plate ID"
        ]
    },
    "message": "Invalid input"
}

# When providing a name that is too short

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "name": [
            "Name must be at least 2 characters long"
        ]
    },
    "message": "Invalid input"
}

# When providing an invalid specification of the plate belonging to the diet

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "inDiet": [
            "Please specify if the plate is on a diet."
        ]
    },
    "message": "Invalid input"
}

# When providing a creation date that is set in the future

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "createdAt": [
            "The date cannot be in the future."
        ]
    },
    "message": "Invalid input"
}

# When being unauthorized

HTTP/1.1 401 Unauthorized
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Unauthorized"
}

# When not finding the user

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "User not found"
}

# When not finding the plate

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "PLate not found"
}
```

#### Delete plate
Deletes a plate created by an user
```sh
curl -X DELETE "http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates/dd2786d7-c0e7-4dd1-a435-100728774102" -H "Cookie: sessionId=1384df4b-bc5c-400f-9ae4-8dd841aafc3e"
```

With 🥧 HTTPie
```sh
http DELETE http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates/dd2786d7-c0e7-4dd1-a435-100728774102 "Cookie:sessionId=c0c01f92-f54b-4b1f-a294-d8876267203c; Max-Age=604800; Path=/"
```

Responses
```
# When successfully doing it

HTTP/1.1 204 No Content
Connection: keep-alive

# When sending an invalid user id

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "userId": [
            "Invalid user ID"
        ]
    },
    "message": "Invalid input"
}

# When sending an invalid plate id

HTTP/1.1 400 Bad Request
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "errors": {
        "plateId": [
            "Invalid plate ID"
        ]
    },
    "message": "Invalid input"
}

# When not finding the user

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "User not found"
}

# When not finding the plate

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Plate not found"
}

# When being unauthorized

HTTP/1.1 401 Unauthorized
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Unauthorized"
}
```

#### Non existing route
When trying to access a route that doesn't exists in the server

Response
```
HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Not Found",
    "message": "Route POST:/route not found",
    "statusCode": 404
}
```

### <a id='structure' style='text-decoration: none; color: inherit;'>📂 Structure</a>
```
│ .github/
│   └── ...
│ @types/
│   └── ...
│ db/
│   ├── migrations/
│   │     └── ...
│   └── ...
│ docs/
│   └── ...
│ httpie/
│   └── ...
│ src/
│   ├── errors/
│   │     └── ...
│   ├── libs/
│   │     └── ...
│   ├── middlewares/
│   │     └── ...
│   ├── routes/
│   │     └── ...
│   └── ...
│ tests/
│   └── ...
```

### <a id='technologies' style='text-decoration: none; color: inherit;'>🧰 Technologies</a>
#### Back-end Framework
[![Fastify](https://img.shields.io/badge/fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

#### Database
[![Knex](https://img.shields.io/badge/knex-ff5722?style=for-the-badge&logo=knex&logoColor=white)](https://knexjs.org/)
[![SQLite](https://img.shields.io/badge/sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

#### Testing
[![Vitest](https://img.shields.io/badge/vitest-506E10?style=for-the-badge&logo=vitest&logoColor=FCC72B)](https://vitest.dev/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

#### Utilities
[![Day.js](https://img.shields.io/badge/Day.js-FF6F00?style=for-the-badge&logo=dayjs&logoColor=white)](https://day.js.org/)
[![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=.env&logoColor=black)](https://github.com/motdotla/dotenv)
[![ESLint](https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![TSX](https://img.shields.io/badge/tsx-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.npmjs.com/package/tsx)
[![Zod](https://img.shields.io/badge/Zod-007ACC?style=for-the-badge&logo=superman&logoColor=white)](https://zod.dev/)


### <a id='screenshots-prints' style='text-decoration: none; color: inherit;'>📸 Screenshots and 🎥 Recordings</a>
For a longer video demonstration click here and like my post on <a href='https://www.linkedin.com/feed/update/urn:li:activity:7246141307188854784/'>LinkedIn</a>

### <a id='author' style='text-decoration: none; color: inherit;'>👤 Author</a>
<div style='display: flex; align-items: center;'>
		<img src='https://github.com/mar-alv.png' alt='Marcelo Alvarez GitHub profile picture' style='width: 150px; border-radius: 50%; margin-right: 20px;'>
		<div>
				<strong>Marcelo Alvarez</strong>
				<br>
				<em>Front-end Developer</em><br>
				<span>"Some AI generated funny quote here 😗"</span><br>
				<a href='https://www.linkedin.com/in/mar-alv'>
					<img
						alt='LinkedIn'
						src='https://img.shields.io/badge/LinkedIn-Marcelo%20Alvarez-0077B5?logo=linkedin&logoColor=white'
					/>
				</a>
				<a href='https://mar-alv.github.io/'>
					<img
						alt='Portfolio'
						src='https://img.shields.io/badge/Portfolio-Marcelo%20Alvarez-000?style=flat&logo=portfolio&logoColor=white'
					/>
				</a>
		</div>
</div>

### <a id='license' style='text-decoration: none; color: inherit;'>📄 License</a>
Licensed under [MIT](./LICENSE)
