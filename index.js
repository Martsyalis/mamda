const { curry, head, tail, ...ramda } = require("ramda");

const asyncCompose =
    (...functions) =>
    input =>
        functions.reduceRight(
            (chain, func) => chain.then(func),
            Promise.resolve(input)
        );

const trace = curry((message, arg) => {
    console.log(`${message}: `, arg);
    return arg;
});

const mapPromises = async (promises, cb) =>
    !promises.length
        ? []
        : [
              await cb(head(promises)),
              ...(await mapPromises(tail(promises), cb)),
          ];

module.exports = {
    ...ramda,
    asyncCompose,
    trace,
    mapPromises,
};
