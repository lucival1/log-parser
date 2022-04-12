# Beamy technical test

## Guidelines

- Solve the levels in ascending order
- Only do one commit per level and include the `.git` when submiting your test

Please do the simplest thing that could work for the level you're currently solving.

For higher levels we are interested in seeing code that is:

- Clean
- Extensible
- Reliable
- Reproducible on every environment (using docker for example)

We should be able to run each level running only **one command** (using Makefile for example), and you should provide us clear guideline on how to run your code.
If you think that you need tests, do not hesitate to add some !

If you don't succeed to solve a level, explain us how you would have done it

## Challenge

The challenge needs to be resolved in Typescript.
Each level depends on one Node v12.19 executable and one to many libraries that you'll have to use.
**You can't modify them.**
Your solution to each level needs to live in the `level{N}` directory.

The purpose of the whole project is to handle logs, these logs look like this:

```
id=0060cd38-9dd5-4eff-a72f-9705f3dd25d9 service_name=api process=api.233 sample#load_avg_1m=0.849 sample#load_avg_5m=0.561 sample#load_avg_15m=0.202
```

## Level 1

Before everything, you'll need to do a `npm install`.

Here you need to write a simple HTTP server that will listen to POST requests on the port 3000 and that will receive logs one by one.

It will parse each sent log and write the result to a JSON file in `./parsed/#{id}.json`. You need to write a JSON in the following format:

```
{
  "id": "2acc4f33-1f80-43d0-a4a6-b2d8c1dbbe47",
  "service_name": "web",
  "process": "web.1089",
  "load_avg_1m": "0.04",
  "load_avg_5m": "0.10",
  "load_avg_15m": "0.31"
}
```

To write a simple HTTP server look at [Express](https://expressjs.com/) or [Fastify](https://www.fastify.io/).

Then you can launch the `npm run emit_logs` command, it will send log messages to the server you have build.

**An important point to consider is that in this command, the POST requests will timeout after 500ms.**

## Level 2

This time your HTTP server need to parse the logs and send them to a Redis `LIST` on a local Redis instance (redis://localhost:6379).

Your HTTP server, after parsing the logs, needs to enrich them with a library called `slow_computation`. Each computation done via this operation should last some time, here more than 1 second.

To understand how to use this library, you can look at the `exampleCompute.js` file.

You’ll send the resulting JSON in a redis LIST.

Again, you can launch the `npm run emit_logs` command, it will have the same timeout constraint.

### CI/CD (Bonus)

If you succeed in the previous levels you can implement a CI/CD pipeline using github actions.
We don't provide further indications for this exercice, implement the pipeline you think is relevant for this code.
If you don't have enough time, no worry just explain us the steps you would have add in this pipeline.


## How to run

#### 1. Clone the project from this repository.
#### 2. Open the terminal and move into the project root directory.
#### 3. Run the Makefile command `make level_n`, n being the level you want to execute. This will install the necessary modules, build and initiate the correspondent server.
#### 4. As the server will take control of the current terminal, we need to open a new terminal window/tab (in the project root directory) and run emit_logs command (using npm or make). The level should make the output as designed.
#### 5. To start a different level you must stop the current server (if any is running) and use the make `level_n` command to start the desired level.
#### 6. There is no Docker implementations. I have tried to implement Docker and make the project work, I got the images to docker and was able to initiate the server, but I had no success in making the objective of each level work (lvl1 save on parsed folder and lvl 2 save on redis - the communication didn't work as expected).
#### 7. As part of the CI/CD pipeline I tried to implement a flow that once a PR is merged to master the code integration tests are run. However, the Redis service hangs on during the test phase as there is no env variable to differentiate dev from prod
#### 8. Another flow that would like to implement is one where the Docker image is built and published, the code can then be pushed to a cloud host and finally deployed. This flow would depend on the first one being completed.
