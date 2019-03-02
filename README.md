# shapenet-node

Quick setup demoing a project structure that could work well for our project.

## Install

    npm install

## Project structure
    
entrypoint (argument parsing, etc)

    src/index.js

server-side model / data processing:

    tools/objprocessor.js

express server (three.js visualization)
    
    visualization-server/viz-server.js

web client (three.js visualization)

    visualization-client/index.js

server-side tensorflow training (TBD)

    tensorflow-server/tf-server.js

Theoretically the express server + tensorflow server would communicate somehow. `tools/` would handle data processing, and would include both functions to do data processing both on individual files and directories / obj globs (in which case it would spin up nodejs clusters / thread workers), and utility functions that could be imported by the tensorflow server and client-side renderer to do various things.

Most sub-components would be capable of spinning up concurrent processes / threads: child processes (viz-server), clusters / thread workers (tools, tensorflows), though tools could -also- operate in a lightweight manner (ie. for batch processing by some other script) when just passed in single files.

## Run stuff

This actually works (just doesn't do anything, haha).

do processing on a single file / for testing:

    npm run process
        => generates data/params/test-model.json
           from      data/models/test-model.obj

    npm run reconstruct
        => generates data/reconstructed-models/test-model.obj
           from      data/params/test-model.json

visualize this data

    npm run visualize

visualize / browse through all source / reconstructed / generated data

    npm run visualize-all

train tensorflow model

    npm run tf-train

generate data using current tensorflow model (no training)
    
    npm run tf-generate

visualize tensorflow model while training

    npm run visualize-training

visualize generated data from current tensorflow models (no training)

    npm run visualize-generation

I went a bit nuts with options and stuff, but at least some of this is implementable.
