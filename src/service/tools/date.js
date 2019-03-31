export default {
	//时间戳格式化
	mills2datetime: function(num) {
		var date = new Date(num);
		return (
			date.getFullYear() +
			"-" +
			_formatLenth(date.getMonth() + 1) +
			"-" +
			_formatLenth(date.getDate()) +
			" " +
			_formatLenth(date.getHours()) +
			":" +
			_formatLenth(date.getMinutes()) +
			":" +
			_formatLenth(date.getSeconds())
		);
	},
	/**
	 * 计算两个日期之间天数差
	 * @param  {[type]} sDate1 [支持“yyyy-mm-hh”、‘yyyy.mm.hh’、‘yyyy/mm/dd’时间格式]
	 * @return {[type]} [description]
	 */
	daysBetween: function(sDate1, sDate2) {
		//Date.parse() 解析一个日期时间字符串，并返回1970/1/1 午夜距离该日期时间的毫秒数
		var time1 = Date.parse(new Date(sDate1));
		var time2 = Date.parse(new Date(sDate2));
		var nDays = parseInt((time2 - time1) / 1000 / 3600 / 24);
		return nDays;
	},
	//时间戳格式化,如：1441672045568  -->  "2015-09-08 08:27:25:568"
	mills2timestamp: function(num) {
		var date = new Date(num),
			hmsStr = "";
		return (
			date.getFullYear() +
			"-" +
			_formatLenth(date.getMonth() + 1) +
			"-" +
			_formatLenth(date.getDate()) +
			" " +
			hmsStr
		);
	},
	//时间转时间戳
	dateTime2mills: function(datetime) {
		var timestamp2 = Date.parse(new Date(datetime));
		return timestamp2 / 1000;
	},
	//判断输入字符串是否为空或者全部都是空格
	isNullSpac: function(str) {
		if (str == "") return true;
		var regu = "^[ ]+$";
		var re = new RegExp(regu);
		return re.test(str);
	},
	//merge两个对象，深拷贝
	merge: function(dist, extra) {
		var obj = extra || {};
		//遍历外层传入的参数
		for (var key in extra) {
			if (extra.hasOwnProperty(key)) {
				//判断类型是 arr、object、null等
				if (typeof extra[key] === "object") {
					//遍历到 extra[key] 的最内层
					var dataType = Object.prototype.toString.call(extra[key]);
					if (dataType === "[object Null]") {
						dist[key] = null;
					} else if (dataType === "[object Array]") {
						if (!dist[key]) dist[key] = [];
						extra[key].forEach(function(item, pos) {
							dist[key][pos] = item; //mergeObj(dist[key][pos], item);
						});
					} else {
						if (!dist[key]) dist[key] = {};
						dist[key] = mergeObj(dist[key], extra[key]);
					}
				} else if (typeof extra[key] === "string") {
					dist[key] = extra[key] + "";
				} else if (typeof extra[key] === "number") {
					dist[key] = extra[key] + 0;
				} else if (typeof extra[key] === "boolean") {
					dist[key] = !!extra[key];
				} else if (typeof extra[key] === "undefined") {
					dist[key] = extra[key];
				} else if (typeof extra[key] === "function") {
					dist[key] = extra[key];
				}
			}
		}
		return dist;
	}
};
