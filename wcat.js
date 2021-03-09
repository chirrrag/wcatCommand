const fs = require('fs');
// const { write } = require('node:fs');
const path = require('path');


let input = process.argv.slice(2);
// console.log(input);


function isFileOrNot(src) {
    return fs.existsSync(src);
}
function isSymbol(symbol) {
    if(symbol == ">" || symbol == ">>") {
        return true;
    }
    return false;
}
function readContent(src) {
    // reads content of file in string format!!!
    return fs.readFileSync(src, "utf-8");
}

function writeContent(src, contents) {
    // will write the content into src file 
    return fs.writeFileSync(src, contents);
}



function wcat(arr) {
    let src = arr[0];

    let checkFile = isFileOrNot(src);
    if(checkFile == true) {
        // first element of array is file???
        let symbol = arr[1];
        if(isSymbol(symbol) == true) {
            let secondFile = arr[2];
            symbolSolver(symbol, secondFile, src); 
        }
        else if(isFileOrNot(symbol) == true ) {
            fileSolver(arr);

        }
        else if(symbol == undefined) {
            // no second element exist
            let content = readContent(src);
            console.log(content);
            // console.log("error");
        }
        else {
            console.log("Error, WRONG SYMBOL ENTERED");
        }
        
    }
    else {
        let firstFile = arr[1];
        let secondFile = arr[2];
        if(src == '-s') {
            if(secondFile == undefined) {
                // removes the big line break!!!!
                SpaceManager(firstFile);
                console.log(readContent(firstFile));
            }
            else {
                if(secondFile == ">" || secondFile == ">>>") {
                    // second idx in array is a symbol
                    let thirdFile = arr[3];
                    symbolSolver(symbol, thirdFile, firstFile);
                    SpaceManager(firstFile);
                    console.log(readContent(firstFile));

                }
                else {
                    if(secondFile == '-n' || secondFile == '-b'){
                        // do it
                    }
                }
            }
        } else if(src == '-n') {
           if(secondFile == undefined) {
               // read the file line by line
               readLines(firstFile);
           }
           else {

           }
        } else if(src == '-b') {
            // fill the non empty lines...
            if(secondFile == undefined) {
                removeblankline(firstFile);
            }
            else {
                
            }
        }
    }
}

function readLines(path) {
    let data = readContent(path);
    let lines = data.split(/\r?\n/);
    console.log(lines);
    for(let i = 0; i < lines.length; i++) {
        console.log(i + 1, lines[i]);
    }
}


function SpaceManager(src) {
    let content = readContent(src);

    content = content.replace(/\s+/g, " ").trim();

    writeContent(src, content);
    // console.log(readContent(src));
}

function symbolSolver(symbol, secondFile, src) {
    // second element of array is symbol > || >>
    let firstFile = src;
    
    // check whether second file exist or not
    // check extension of first file
    // let extension = path.basename(firstFile).split(".").pop();
    // console.log(extension);
    // secondFile += extension;
    // if(fs.existsSync(secondFile) == false) {
    //     fs.writeFileSync(secondFile);
    // }
    if(symbol === ">") {
        // put all the content of fname1 into fname 2 by overriding, if fname2 doesnot exist, create 1
        let firstFileContent = readContent(firstFile);
        // fs.writeFileSync(secondFile, firstFileContent);
        writeContent(secondFile, firstFileContent);
        // console.log("Heyyy");
        console.log(readContent(secondFile));

    }
    else if(symbol == ">>") {
        // append all the content of fname1 into fname 2;
        let firstFileContent = readContent(firstFile);
        fs.appendFileSync(secondFile, firstFileContent);
        console.log(readContent(secondFile));

    }
}

function fileSolver(arr) {
    // console.log(symbol);
    // second element of array is also file
    let reader = "";
    for(let i = 0; i < arr.length; i++) {
        //  is file or not
        if(arr[i] != undefined)
        {
            reader += readContent(arr[i]);
            // console.log(readContent(arr[i]));
            // readContent(arr[i]);
        }
    }
    console.log(reader);
}

function removeblankline(path) {
    let data = fs.readFileSync(path, "utf8");
  
    let lines = data.split(/\r?\n/);
    let p = 0;
    for (i = 0; i < lines.length; i++) {
      let data = lines[i];
      if (data.length > 0) {
        console.log(p + 1, data);
        p = p + 1;
      }
    }
  }

wcat(input);