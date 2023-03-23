# GymBro API

## Run locally

The first thing to do is to clone the repository:

```sh
git clone https://github.com/ogaaabriel/gymbro_api.git
cd gymbro_api
```

Create an `.env` file with the same variables as `.env_sample`.  
Then install the dependencies:

```sh
npm install
```

Once npm has finished downloading the dependencies:

```sh
npx prisma migrate dev
npm run dev
```

You can use the `requests.http` file to test the api endpoints. To do it you must install the vscode extension `REST Client Api`.
