# lattice-outwithrest-workshop
A GraphQL Lattice Workshop Demo

## Overview

This workshop or demo is intended to be done as a live coding exercise. It is
built on a `create-react-app` shell for the client and some `express` boiler
plate for the server.

GraphQL Lattice was added in to the server component and is used by the client.
For demonstration purposes, Lattice is configured to use the Facebook reference
implementation. It is also, however, compatible with Apollo Server.

To learn more about GraphQL Lattice, take a look at
[http://www.graphql-lattice.com] or [https://github.com/nyteshade/graphql-lattice]

## Getting the files

You will want to download the code to get started. This might take a little bit
and depending on the speed of the local wi-fi, you may want to just follow
along in the background.

Grab the repo and install the dependencies

```bash
git clone https://github.com/nyteshade/lattice-outwithrest-workshop
cd latice-outwithrest-workshop
npm install
```

## Layout

This repo consists of both a client as well as a server side component. The
client side is based on `create-react-app` and the server side is based on
some hand written and pared down `express` code with `GraphQL Lattice` bits
added on.

If you wish to run both parts at the same time, you will want to open two
terminal windows.

### Starting the client

To start the client side portion, simply type

```bash
npm run start
```

The client runs on port 3000 and will reference the server running on port
9000 as seen below to fetch its information from. In an effort to dogfood
the product, the client relies on GraphQL to serve its content.

### Starting the server component

The server is started as easily using the following command

```bash
npm run server
```

The server runs on port 9000. When it starts up, it will pull in all
the GraphQL parts you wrote to make up your schema. It will then spit out
this schema in the console for easy reference and note any parts it failed
to consume on startup.

