console.log('service worker start ?')

onmessage = function(e) {
	function fetchLocal(url) {
		return new Promise(function(resolve, reject) {
			var xhr = new XMLHttpRequest
			xhr.onload = function() {
				resolve()
				eval(xhr.responseText)

				console.log('A', e.data.src.length)
				let img = atob( e.data.src.match('data:image/png;base64,(.+)')[1] )
				// let convolution = new Convolution(e.data)

				let res = btoa(img)

				console.log('B', res.length)
				postMessage(res)
			}
			xhr.onerror = function() {
				reject(new TypeError('Local request failed'))
			}
			xhr.open('GET', url)
			xhr.send(null)
		})
	}

	fetchLocal('./__image.js').then( () => console.log('service worker end ?')
)
}
