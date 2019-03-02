#!/usr/bin/env node
'use strict';
const ArgumentParser = require('argparse').ArgumentParser;


main();

function main () {
    const parser = new ArgumentParser({ 
        version: '0.0.1', 
        addHelp: true, 
        description: "node-shapenet-utils"
    });
    parser.addArgument([ '-p', '--process' ], { nargs: 2, help: 'run as data processor (process data)' });
    parser.addArgument([ '-r', '--reconstruct' ], { nargs: 2, help: 'run as data processor (reconstruct data)' });
    parser.addArgument([ '-c', '--client', '--visualize' ], { action: 'storeTrue', help: 'run webserver w/ clientside visualization' });

    parser.addArgument([ '-i', '--input' ], { help: 'path to input model' });
    parser.addArgument([ '-o', '--output' ], { help: 'path to output file' });
    parser.addArgument([ '-I', '--input-obj-model-dir' ], { help: 'input directory (obj models)' });
    parser.addArgument([ '-P', '--parameter-data-dir' ], { help: 'input / output directory (obj parameter data)' });
    parser.addArgument([ '-R', '--reconstructed-obj-model-dir' ], { help: 'output directory (reconstructed obj models)' });
    parser.addArgument([ '-G', '--generated-obj-dir' ], { help: 'output directory (generated obj models)' });
    parser.addArgument([ '-V', '--generated-parameter-dir' ], { help: 'output directory (generated parameter data)' });

    parser.addArgument([ '-t', '--tf-train', '--train' ],    { action: 'storeTrue', help: 'run tensorflow training session' });
    parser.addArgument([ '-g', '--tf-generate', '--generate' ], { action: 'storeTrue', help: 'only generate data from tensorflow model' });

    parser.addArgument([ '-l', '--load-tf-model' ], { help: 'load tensorflow model' });
    parser.addArgument([ '-s', '--save-tf-model' ], { help: 'save tensorflow model' });

    const args = parser.parseArgs();
    console.dir(args);

    if (args.process) {
        require('./tools/objprocessor').process(args.process[0], args.process[1]);
    }
    if (args.reconstruct) {
        require('./tools/objprocessor').reconstruct(args.reconstruct[0], args.reconstruct[1]);
    }
    if (args.client) {
        // console.log(`starting client visualization`);
        // if (args.input) { console.log(`with file ${args.input}`); }
        // if (args.idir)  { console.log(`on directory ${args.idir}`); }'
        require('./visualization-server/viz-server.js').launch(args);
    }
    if (args.tf_train) {
        // console.log(`starting tensorflow training`)
        // if (args.load_tf_model) { console.log(`loading model from ${args.load_tf_model}`); }
        // if (args.save_tf_model) { console.log(`will save model to ${args.load_tf_model}`); }
        // if (args.idir) { console.log(`loading data from ${args.idir}`); }
        // if (args.odir) { console.log(`will save generated data to ${args.idir}`); }
        require('./tensorflow-server/tf-server.js').trainer(args)
            .train();
    }
    else if (args.tf_generate) {
        // console.log(`starting tensforflow generation`);
        // if (args.load_tf_model) { console.log(`loading model from ${args.load_tf_model}`); }
        // if (args.odir) { console.log(`will save generated models to ${args.odir}`); }
        require('./tensorflow-server/tf-server.js').generator(args)
            .generate();
    }
}
