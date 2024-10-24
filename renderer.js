const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

console.log("hello from renderer");


const fileFunctions = require('./file-functions.js')
const fileData = fileFunctions.readFileFromDisk()
