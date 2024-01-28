const parseEnv = () => {
    let output = '';

    for (let key in process.env) {
        if (key.startsWith('RSS_')) {
            output += `${key}=${process.env[key]}; `;
        }
    }

    console.log(output.slice(0, -2))
};

parseEnv();