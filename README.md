# [CODEWORD IntraTalks]

This is a simple GraphQL backend that serves data to the frontend.

It is set up using hot module reloading with Webpack, and typescript.

To run the backend with HMR in development mode, you can run the following two lines of code in two terminals;

To visit the GraphQL playground, you can visit [localhost:4000](http://localhost:4000).

## Running tutorial

1. Install packages and dependencies by typing `yarn`
2. Then by running `yarn build-dev` and `yarn start` in two different terminals, you should be able access the GraphQL Interactive Interface at localhost:4000

If you want to build the production version of this application you can type `yarn build-prod`, and run that with `yarn start`.

When working on GraphQL typedefs, it is important to use the `yarn codegen` command so that the generated _graphql.ts_ file is kept fully updated.

## Enviroment file

To run the backend, you probably want the secret enviroment variables. Under you can see what your _.env_ file should look like.

```env
CLIENT_SECRET=**REDACTED**
CLIENT_ID=**REDACTED**
REDIRECT_URI=**REDACTED**
MONGODB_URL=**REDACTED**
PUBLIC_KEY=**REDACTED**
ADMIN_IDS=**REDACTED**
# The values are stored in a secret channel🤫
```

If you want to disable Mocking when developing you can add

```
MOCK=false
```

in the _.env_ file. By doing this you will use the data residing in our MongoDB server.
