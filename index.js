const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let win

function createWindow () {
	win = new BrowserWindow({
		width: 800 * 2,
		height: 600 * 2,
		useContentSize: true,
		resizable: true
	})

	win.loadURL(url.format({
		pathname: path.join(__dirname, 'render/index.html'),
		protocol: 'file:',
		slashes: true
	}))

	win.webContents.openDevTools()

	win.on('app-command', (e, cmd) => {
		console.log(e, cmd)
	})

	win.on('closed', () => {
		win = null
	})
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (win === null) {
		createWindow()
	}
})
