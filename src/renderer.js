//     const fs = require('fs')



// readFileFromDisk = () => {
//     fs.readFile(FILE_NAME, 'utf-8', (err, data) => {
//         if (err) {
//             console.error(err)
//             return DEFAULT_DATA
//         }
//         console.log(data)
//     })
// }

saveFileToDisk = (data) => {

}

// readFileFromDisk()

const save_btn = document.getElementById('save_btn')

save_btn.addEventListener('click',()=>{

    // find add checkboxes title
    const allTasks = ["task1", "task2" , "task3"]
    // find all checked checkbox and retrieved their title
    const doneTasks = ["task1" , "task3"]

    window.electronAPI.saveData([allTasks, doneTasks])
})


// const information = document.getElementById('info')
// information.innerText = "text"
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`