const parseArgs = () => {
    const args = process.argv.reduce((acc, el, ind, arr) => {
        return el.startsWith('--') ? `${acc}${el.slice(2)} is ${arr[ind + 1]}, ` : acc;
    }, '');

    console.log(args.slice(0, -2))
};

parseArgs();