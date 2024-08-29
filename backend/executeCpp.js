const fs = require("fs");
const path = require("path");
const {exec} = require("child_process");

const outputPath = path.join(__dirname, "outputs");

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive: true});
}

const executeCpp = (filePath) => {
    const jobId = path.basename(filePath).split(".")[0]; //name of file
    const filename = `${jobId}.out`;
    const outPath = path.join(outputPath, filename);

    return new Promise((resolve, reject) => {
        exec(`g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${filename}`, 
            (error, stdout, stderr) => {
            if(error){
                reject(error);
            }
            if(stderr){
                reject(stderr);
            }
            resolve(stdout);
        });
    });
};

module.exports={
    executeCpp
};