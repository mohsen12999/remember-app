// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

// const project_config = require("./package.json");

// contextBridge.exposeInMainWorld('versions', {
//   // node: () => process.versions.node,
//   // chrome: () => process.versions.chrome,
//   // electron: () => process.versions.electron
//   app_version: () => project_config.version
//   // we can also expose variables, not just functions
// })

contextBridge.exposeInMainWorld("electronAPI", {
  saveData: (data) => ipcRenderer.send("save-data", data),
  loadData: (callback) => ipcRenderer.on("load-data", callback),
});
