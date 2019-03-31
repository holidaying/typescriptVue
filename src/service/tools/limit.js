export default {
	canRun: true,
	ShakeTimer: null,

	/*: *  函数节流
	 *  函数节流的要点是，声明一个变量当标志位，记录当前代码是否在执行。
	 *  如果空闲，则可以正常触发方法执行。
	 *  如果代码正在执行，则取消这次方法执行，直接return。
	 * */
	FnByFlow: function(timer, callback) {
		if (!this.canRun) {
			return;
		}
		this.canRun = false;
		setTimeout(function() {
			callback && callback();
		}, timer);
	},
	/**
	 *  函数防抖
	 *  函数节流的要点，也是需要一个setTimeout来辅助实现。延迟执行需要跑的代码。
	 *  如果方法多次触发，则把上次记录的延迟执行代码用clearTimeout清掉，重新开始。
	 *  如果计时完毕，没有方法进来访问触发，则执行代码。
	 * */
	FnByShake: function(timer, callback) {
		//清除已经存在的延迟执行定时器
		if (this.ShakeTimer) clearTimeout(this.ShakeTimer);
		this.ShakeTimer = setTimeout(function() {
			callback && callback();
		}, this.timer);
	}
};
