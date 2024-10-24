FILE_NAME = 'data.json'
DEFAULT_DATA = {
    tasks: ["task1", "task2", "task3", "task4"],
    data:[]
}

exports.readFileFromDisk = () => {
    const fs = require('fs')
    fs.readFile(FILE_NAME, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
            return DEFAULT_DATA
        }
        console.log(data)
    })
}

exports.saveFileToDisk = (data) => {
    const fs = require('fs')
    fs.writeFile(FILE_NAME, data, (err) => {
        if (err) {
            console.error(err)
            return
        }
    })
}