import axios from 'axios'
/**
 * options{
 *  url:"地址",
 *  method:'get',
 *  data:params
 * }
 */
export default (window.$http = function(options) {
	var method = (options.type || options.method || 'get').toLowerCase()
	var data = options.data
	var config = {
		url: options.url,
		method: method,
		data: data
	}
	if (data) {
		config.url = config.url.replace(/{\w+}/g, function(v) {
			var key = v.substring(1, v.length - 1)
			var value = data[key]
			delete data[key]
			return value
		})
	}
	var headers = {}
	if (method == 'get') {
		config.params = data
	}
	if (options.formdata) {
		config.transformRequest = [
			function(data) {
				let ret = ''
				for (let it in data) {
					ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
				}
				return ret
			}
		]
		headers['Content-Type'] = 'application/x-www-form-urlencoded'
	} else if (options.multipart) {
		let fromData = new FormData()
		for (let i in data) {
			fromData.append(i, data[i])
		}
		config.data = fromData
		headers['Content-Type'] = 'multipart/form-data'
	} else {
		headers['Content-Type'] = 'application/json;charset=UTF-8'
	}
	config.headers = headers
	if (options.responseType) {
		config.responseType = options.responseType
	}

	return axios(config).then(res => {
		var result = res.data
		if (result.code) {
			if (result.code == 200) {
				return result.data === void 0 ? result : result.data
			} else if (result.code === 401) {
				//
			} else {
				var err = new Error(result.data && result.data.message)
				err.code = result.code
				err.message = (result.data && result.data.message) || result.message
				throw err
			}
		} else {
			return result
		}
	})
})
