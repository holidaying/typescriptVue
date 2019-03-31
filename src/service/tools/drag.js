export default {
	/**
	 * 图片拖拽功能
	 * @param imgId - img元素的id
	 * @param parentId - img元素的父元素id
	 * @param isLimitedDrag - 是否限制边框拖动
	 */
	drag: function(imgId, parentId, isLimitedDrag) {
		var locked = false;
		var lastObj = undefined;
		var $obj = document.getElementById(imgId);
		var $parentObj = isLimitedDrag
			? document.body
			: document.getElementById(parentId) || document.getElementsByClassName(parentId)[0];
		var tempX = 0;
		var tempY = 0;
		var x = 0;
		var y = 0;
		$obj.onmousedown = function(e) {
			e = e ? e : window.event;
			if (!window.event) {
				e.preventDefault();
			}
			/* 阻止标注浏览器下拖动a,img的默认事件 */
			if (isLimitedDrag) {
				if (window.getComputedStyle(e.target, null).getPropertyValue("cursor") === "move") {
					locked = true;
				}
			} else {
				locked = true;
			}

			if (lastObj && lastObj != $obj) {
				/* 多元素拖动时候需要恢复上一次元素的状态 */
				lastObj.style.zIndex = "1";
			}
			lastObj = $obj;
			tempX = $obj.offsetLeft;
			tempY = $obj.offsetTop;
			x = e.clientX;
			y = e.clientY;

			$parentObj.onmousemove = function(e) {
				e = e ? e : window.event;
				if (locked == false) return false;

				if (!isLimitedDrag) {
					$obj.style.position = "absolute";
					$obj.style.zIndex = "100";
					$obj.style.cursor = "move";
					$obj.style.transition = "all 0s ease 0s";
				}

				// 限制拖拽范围
				var tmpObjLeft = tempX + e.clientX - x,
					tmpObjTop = tempY + e.clientY - y;

				if (isLimitedDrag) {
					$obj.style.marginLeft = "auto";
					$obj.style.marginTop = "auto";
					$obj.style.bottom = "auto";
					$obj.style.right = "auto";
					if (tmpObjTop <= 0) {
						tmpObjTop = 0;
					} else if (tmpObjTop + $obj.offsetHeight >= $parentObj.offsetHeight) {
						tmpObjTop = $parentObj.offsetHeight - $obj.offsetHeight + "px";
					}
					if (tmpObjLeft <= 0) {
						tmpObjLeft = 0;
					} else if (tmpObjLeft + $obj.offsetWidth >= $parentObj.offsetWidth) {
						tmpObjLeft = $parentObj.style.offsetWidth - $obj.style.offsetWidth + "px";
					}
				}
				$obj.style.left = tmpObjLeft + "px";
				$obj.style.top = tmpObjTop + "px";

				if (window.event) {
					e.returnValue = false;
				}
				/* 阻止ie下a,img的默认事件 */
			};

			$parentObj.onmouseup = function() {
				locked = false;
				$parentObj.onmousemove = null;
				$parentObj.onmouseup = null;
				if (!isLimitedDrag) {
					$obj.style.cursor = "auto";
				}
			};
		};
	},
	/**
	 * 获取鼠标的位置
	 * @param event - 事件对象上下文
	 * @returns {{x: (Number|number), y: (Number|number)}} - 鼠标的位置
	 */
	getMousePos: function(event) {
		var e = event || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		var x = e.pageX || e.clientX + scrollX;
		var y = e.pageY || e.clientY + scrollY;
		return { x: x, y: y };
	},
	/**
	 * 获取鼠标位置-地图右下角操作栏地图操作时获取鼠标位置用
	 * @param event -事件对象上下文
	 * @return {{x: (Number|number), y: (Nmuber|number)}} -鼠标位置
	 */
	getMousePosOnMap: function(event) {
		var e = event || window.event;
		var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
		var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		var x = e.layerX || e.offsetX || e.pageX || e.clientX + scrollX;
		var y = e.layerY || e.offsetY || e.pageY || e.clientY + scrollY;
		return { x: x, y: y };
	}
};
