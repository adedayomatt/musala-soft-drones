const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

/**
 * Scan and start all available tasks
 */

fs.readdirSync(__dirname)
    .filter(file => file !== basename && file.slice(-3) === '.js')
    .forEach(file => {
        console.log(`starting ${file}...`);
        const task = require(path.join(__dirname, file));
        if(typeof task.start === "function") {
            task.start()
            console.log(`${file} started...`);
        } else {
            console.log(`${file} could not be started because it is invalid...`);
        }
    });
