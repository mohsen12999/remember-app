const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("node:path");
const fs = require("fs");

const FILE_NAME = "data.json";
const DEFAULT_DATA = {
  "tasks": ["task1", "task2", "task3", "task4"],
  "data": {},
};

const loadData = () => {
  const currentDate = new Date().toISOString().split("T")[0]; // "2024-12-10"
  const default_data = { ...DEFAULT_DATA, currentDate };

  try {
    const file_data = fs.readFileSync(FILE_NAME, "utf-8");
    const data = JSON.parse(file_data);

    return { ...data, currentDate };
  } catch (error) {
    console.log("error in reading file", err);
    return default_data;
  }
};

const handleSaveData = (event, tasks) => {
  console.log("save data in index js", tasks);

  // fs.writeFile(FILE_NAME, data, (err) => {
  //     if (err) {
  //         console.error(err)
  //         return
  //     }
  // })
};

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // remove menu bar
  mainWindow.menuBarVisible = false;

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Open the DevTools.
  // if (process.env.NODE_ENV != 'development')
  mainWindow.webContents.openDevTools();

  // const dataFromFile = loadData();
  // console.log({ dataFromFile });

  mainWindow.webContents.send("load-data", loadData() );
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.on("save-data", handleSaveData);

  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
