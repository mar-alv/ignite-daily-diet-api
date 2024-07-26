<h1 align='center'>🚧 Ignite Daily Diet API in progress... 🚧</h1>

<div align='center'>

  ![project-img](.github/cover.jpg)
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

  [🇬🇧 English](#en) / [🇧🇷 Português](#pt-br)

</div>

## <a id='en' style='text-decoration: none; color: inherit;'>🇬🇧 English</a>

### 📚 Summary
- [❕ About](#en-about)
- [📖 Instructions](#en-instructions)
  - [📥 Install](#en-install)
  - [🚀 Run Locally](#en-locally)
  - [🏁 Run End-To-End Tests](#en-e2e-tests)
- [⚡ Endpoints](#en-endpoints)
- [📂 Structure](#en-structure)

#### <a id='en-about' style='text-decoration: none; color: inherit;'>❕ About</a>
This is my implementation of the challenge project "Daily Diet API" from the second Node.js module of [Ignite](https://www.rocketseat.com.br/ignite), an intermediate and advanced course in various programming languages and technologies offered by [Rocketseat](https://www.rocketseat.com.br/).

#### <a id='en-instructions' style='text-decoration: none; color: inherit;'>📖 Instructions</a>
##### <a id='en-instalar' style='text-decoration: none; color: inherit;'>📥 Install</a>
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

##### <a id='en-locally' style='text-decoration: none; color: inherit;'>🚀 Run Locally</a>
Paste the command into a terminal, the server will be accessable through the port 3001
```sh
npm run dev
```

##### <a id='en-e2e-tests' style='text-decoration: none; color: inherit;'>🏁 Run End-To-End Tests</a>
Paste the command into a terminal, they will be exectued one after the other mentioning if there were failed tests
```sh
npm run test
```

#### <a id='en-endpoints' style='text-decoration: none; color: inherit;'>⚡ Endpoints</a>
In order to make requests to the server with 🥧 HTTPie directly from the terminal, you would have to follow its CLI [installation guide](https://httpie.io/docs/cli/main-features)
##### Create user
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

##### Get user
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

##### Create plate
Creates a new plate for a specific user
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

##### Get plates
Gets all plates added by a specific user
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
    "plates": [
        {
            "createdAt": "2024-07-22 23:34:30",
            "description": "A fresh salad with grilled chicken, mixed greens, and a light vinaigrette.",
            "id": "dd2786d7-c0e7-4dd1-a435-100728774102",
            "inDiet": true,
            "name": "Grilled Chicken Salad",
            "updatedAt": "2024-07-22 23:34:30"
        }
    ]
}

# When not having plates created

HTTP/1.1 200 OK
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "plates": []
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

##### Get a plate
Gets a specific plate created by a specific user
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

##### Update plate
Update a specific plate's data of a specific user
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

##### Delete plate
Deletes a specific plate created by a specific user
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

##### Non existing route
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

#### <a id='en-structure' style='text-decoration: none; color: inherit;'>📂 Structure</a>
```
│ @types/
│   └── ... custom typing for the database tables
│ db/
│   ├── migrations/
│   │     └── ... generated database migrations
│   └── ... database of each enviroment
│ httpie/
│   └── ... files to easily test the endpoints from the terminal
│ src/
│   ├── errors/
│   │     └── ... custom error classes
│   ├── middlewares/
│   │     └── ... functions to intercept and modify the requests and responses
│   ├── routes/
│   │     └── ... grouped server's routes
│   └── ...
│ tests/
│   └── ... end-to-end tests
```

## <a id='pt-br' style='text-decoration: none; color: inherit;'>🇧🇷 Português</a>

### 📚 Sumário
- [❕ Sobre](#pt-br-sobre)
- [📖 Instruções](#pt-br-instrucoes)
  - [📥 Instalar](#pt-br-instalar)
  - [🚀 Rodar Localmente](#pt-br-localmente)
  - [🏁 Rodar Testes End-To-End](#pt-br-testes-e2e)
- [⚡ Endpoints](#pt-br-endpoints)
- [📂 Estrutura](#pt-br-estrutura)

#### <a id='pt-br-sobre' style='text-decoration: none; color: inherit;'>❕ Sobre</a>
Esta é a minha implementação do desafio "Daily Diet API" do segundo módulo de Node.js do [Ignite](https://www.rocketseat.com.br/ignite), um curso intermediário e avançado de diversas linguagens de programação e tecnologias oferecido pela [Rocketseat](https://www.rocketseat.com.br/).

#### <a id='pt-br-instrucoes' style='text-decoration: none; color: inherit;'>📖 Instruções</a>
##### <a id='pt-br-instalar' style='text-decoration: none; color: inherit;'>📥 Instalar</a>
Cole o 1º comando em um terminal aberto dentro da pasta de sua preferência para clonar o projeto
```sh
git clone https://github.com/mar-alv/ignite-daily-diet-api.git
```

Em seguida rode uma das versões do 2º comando para instalar as dependências
```sh
npm i
```
```sh
npm install
```

##### <a id='pt-br-localmente' style='text-decoration: none; color: inherit;'>🚀 Rodar Localmente</a>
Cole o comando em um terminal, o servidor estará acessível pela porta 3001
```sh
npm run dev
```

##### <a id='pt-br-testes-e2e' style='text-decoration: none; color: inherit;'>🏁 Rodar Testes End-To-End</a>
Cole o comando em um terminal, eles serão executados um após o outro apontando se houve testes falhos
```sh
npm run test
```

##### <a id='pt-br-endpoints' style='text-decoration: none; color: inherit;'>⚡ Endpoints</a>
Para fazer requisições ao servidor com 🥧 HTTPie diretamente do terminal, é necessário seguir o [guia de instalação](https://httpie.io/docs/cli/main-features) da CLI
##### Criar usuário
Cria um novo usuário
```sh
curl -X POST http://localhost:3001/users -h "Content-Type: application/json" -d '{"name": "mar alv","age": 30,"height": 210,"weight": 100,"sex": "masculine"}'
```

Com 🥧 HTTPie
```sh
http POST http://localhost:3001/users < httpie/create-user.json
```

Respostas
```
# Ao fazer isso com sucesso

HTTP/1.1 201 Created
Connection: keep-alive
set-cookie: sessionId=39cad374-1d58-48e3-bb3b-e63cdaf76163; Max-Age=604800; Path=/

{
    "userId": "dfb402ec-7962-4bb3-a6e2-b1d674430dbd"
}

# Ao não enviar um atributo

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

# Ao enviar um nome muito curto

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

# Ao enviar uma idade abaixo de 12 anos

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

# Ao enviar uma idade acima de 100 anos

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

# Ao enviar uma altura abaixo de 130cm

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

# Ao enviar uma altura acima de 270cm

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

# Ao enviar um peso abaixo de 30kg

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

# Ao enviar um sexo inválido

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

##### Buscar usuário
Retorna um usuário através do seu id
```sh
curl -X GET "http://localhost:3001/users/245f1c46-101d-471a-976f-74878e61c819" -H "Cookie: sessionId=1384df4b-bc5c-400f-9ae4-8dd841aafc3e"
```

Com 🥧 HTTPie
```sh
http GET http://localhost:3001/users/245f1c46-101d-471a-976f-74878e61c819 "Cookie:sessionId=1384df4b-bc5c-400f-9ae4-8dd841aafc3e"
```

Respostas
```
# Ao fazer isso com sucesso

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

# Ao enviar um id inválido

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

# Ao não encontrar o usuário

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "User not found"
}

# Ao não estar autorizado

HTTP/1.1 401 Unauthorized
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Unauthorized"
}
```

##### Criar refeição
Cria uma nova refeição para um usuário específico
```sh
curl -X POST http://localhost:3001/users/835fc927-94e8-4bda-be46-db2f12dca0f9/plates -h "Content-Type: application/json" -d '{"name":"Salada de Frango Grelhado","description":"Uma salada fresca com frango grelhado, folhas verdes e um vinagrete leve.","inDiet":true}'
```

Com 🥧 HTTPie
```sh
http POST http://localhost:3001/users/835fc927-94e8-4bda-be46-db2f12dca0f9/plates < httpie/create-plate.json
```

Respostas
```
# Ao fazer isso com sucesso

HTTP/1.1 201 Created
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "plateId": "8a07b00e-e396-4f03-b3f0-d2e850fc177e"
}

# Ao não enviar um atributo

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

# Ao enviar um id de usuário inválido

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

# Ao enviar um nome muito curto

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

# Ao enviar uma especificidade inválida da refeição pertencer à dieta

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

# Ao não estar autorizado

HTTP/1.1 401 Unauthorized
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Unauthorized"
}

# Ao não encontrar o usuário

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "User not found"
}
```

##### Buscar refeições
Retorna todas as refeições adicionadas por um usuário específico
```sh
curl -X GET "http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates" -H "Cookie: sessionId=1384df4b-bc5c-400f-9ae4-8dd841aafc3e"
```

Com 🥧 HTTPie
```sh
http GET http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates "Cookie:sessionId=c0c01f92-f54b-4b1f-a294-d8876267203c; Max-Age=604800; Path=/"
```

Respostas
```
# Ao fazer isso com sucesso

HTTP/1.1 200 OK
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "plates": [
        {
						"createdAt": "2024-07-22 23:34:30",
						"description": "Uma salada fresca com frango grelhado, folhas verdes e um vinagrete leve.",
						"id": "dd2786d7-c0e7-4dd1-a435-100728774102",
						"inDiet": true,
						"name": "Salada de Frango Grelhado",
						"updatedAt": "2024-07-22 23:34:30"
        }
    ]
}

# Ao não ter refeições adicionadas

HTTP/1.1 200 OK
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "plates": []
}

# Ao enviar um id de usuário inválido

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

# Ao não encontrar o usuário

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "User not found"
}

# Ao não estar autorizado

HTTP/1.1 401 Unauthorized
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Unauthorized"
}
```

##### Buscar refeição
Retorna uma refeição específica criada por um usuário específico
```sh
curl -X GET "http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates/dd2786d7-c0e7-4dd1-a435-100728774102" -H "Cookie: sessionId=1384df4b-bc5c-400f-9ae4-8dd841aafc3e"
```

com 🥧 HTTPie
```sh
http GET http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates/dd2786d7-c0e7-4dd1-a435-100728774102 "Cookie:sessionId=c0c01f92-f54b-4b1f-a294-d8876267203c; Max-Age=604800; Path=/"
```

Respostas
```
# Ao fazer isso com sucesso

HTTP/1.1 200 OK
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "plate": {
				"createdAt": "2024-07-22 23:34:30",
				"description": "Uma salada fresca com frango grelhado, folhas verdes e um vinagrete leve.",
				"id": "dd2786d7-c0e7-4dd1-a435-100728774102",
				"inDiet": true,
				"name": "Salada de Frango Grelhado",
				"updatedAt": "2024-07-22 23:34:30"
    }
}

# Ao enviar um id de usuário inválido

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

# Ao enviar um id de refeição inválido

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

# Ao não encontrar o usuário

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "User not found"
}

# Ao não encontrar a refeição

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Plate not found"
}

# Ao não estar autorizado

HTTP/1.1 401 Unauthorized
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Unauthorized"
}
```

##### Atualizar refeição
Atualiza os dados de uma refeição de um usuário
```sh
curl -X PUT http://localhost:3001/users/835fc927-94e8-4bda-be46-db2f12dca0f9/plates/2b5d459e-55c3-48a7-ac21-86dc8c1049b7  -h "Content-Type: application/json" -d '{"name":"Salada de Frango Grelhado","description":"Uma salada fresca com frango grelhado, folhas verdes e um vinagrete leve.","inDiet":true},"createdAt":"2024-07-25T00:00:00.000Z"}'
```

Com 🥧 HTTPie
```sh
http PUT http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates/2b5d459e-55c3-48a7-ac21-86dc8c1049b7 "Cookie:sessionId=c0c01f92-f54b-4b1f-a294-d8876267203c; Max-Age=604800; Path=/" < httpie/update-plate.json
```

Respostas
```
# Ao fazer isso com sucesso

HTTP/1.1 204 No Content
Connection: keep-alive

# Ao enviar um id de usuário inválido

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

# Ao enviar um id de refeição inválido

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

# Ao enviar um nome muito curto

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

# Ao enviar uma especificidade inválida da refeição pertencer à dieta

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

# Ao enviar uma data no futuro

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

# Ao não estar autorizado

HTTP/1.1 401 Unauthorized
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Unauthorized"
}

# Ao não encontrar o usuário

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "User not found"
}

# Ao não encontrar a refeição

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "PLate not found"
}
```

##### Remover refeição
Remove uma refeição específica criada por um usuário específico
```sh
curl -X DELETE http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates/99a10a6e-6dbe-4223-829b-f8ed97c34ad8 -h "Content-Type: application/json"
```

Com 🥧 HTTPie
```sh
http DELETE http://localhost:3001/users/7e04dcd0-8619-4602-bbe3-d9194790ae51/plates/99a10a6e-6dbe-4223-829b-f8ed97c34ad8 "Cookie:sessionId=c0c01f92-f54b-4b1f-a294-d8876267203c; Max-Age=604800; Path=/"
```

Respostas
```
# Ao fazer isso com sucesso

HTTP/1.1 204 No Content
Connection: keep-alive

# Ao enviar um id de usuário inválido

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

# Ao enviar um id de refeição inválido

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

# Ao não encontrar o usuário

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "User not found"
}

# Ao não encontrar a refeição

HTTP/1.1 404 Not Found
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Plate not found"
}

# Ao não estar autorizado

HTTP/1.1 401 Unauthorized
Connection: keep-alive
content-type: application/json; charset=utf-8

{
    "error": "Unauthorized"
}
```

##### Rota não existente
Ao tentar acessar uma rota que não existe no servidor

Resposta
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

#### <a id='pt-br-estrutura' style='text-decoration: none; color: inherit;'>📂 Estrutura</a>
```
│ @types/
│   └── ... tipagem customizada para as tabelas do banco de dados
│ db/
│   ├── migrations/
│   │     └── ... migrações geradas do banco de dados
│   └── ... banco de dados de cada ambiente
│ httpie/
│   └── ... arquivos para facilmente testar os endpoints pelo terminal
│ src/
│   ├── errors/
│   │     └── ... classes customizadas de erro
│   ├── middlewares/
│   │     └── ... funções para interceptar e modificar as requisições e respostas
│   ├── routes/
│   │     └── ... rotas agrupadas do servidor
│   └── ...
│ tests/
│   └── ... testes end-to-end
```

## 🧰 Technologies
### Back-end Framework
[![Fastify](https://img.shields.io/badge/fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

### Database
[![Knex](https://img.shields.io/badge/knex-ff5722?style=for-the-badge&logo=knex&logoColor=white)](https://knexjs.org/)
[![SQLite](https://img.shields.io/badge/sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)](https://www.sqlite.org/)

### Testing
[![Vitest](https://img.shields.io/badge/vitest-506E10?style=for-the-badge&logo=vitest&logoColor=FCC72B)](https://vitest.dev/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)

### Utilities
[![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=.env&logoColor=black)](https://github.com/motdotla/dotenv)
[![ESLint](https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![TSX](https://img.shields.io/badge/tsx-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.npmjs.com/package/tsx)
[![Zod](https://img.shields.io/badge/Zod-007ACC?style=for-the-badge&logo=superman&logoColor=white)](https://zod.dev/)

## Author
<div style='display: flex; align-items: center;'>
    <img src='https://github.com/mar-alv.png' alt='Marcelo Alvarez GitHub profile picture' style='width: 150px; border-radius: 50%; margin-right: 20px;'>
    <div>
        <strong>Marcelo Alvarez</strong>
        <br>
        <em>Front-end Developer</em><br>
        <span>"Some AI generated funny quote here 😗"</span><br>
        <a href='https://www.linkedin.com/in/marcelo-dos-santos-alvarez-474406180/'>LinkedIn</a> |
        <a href='/'>Portfolio</a>
    </div>
</div>

## License
Licensed under [MIT](./LICENSE)
