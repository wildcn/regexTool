var jsonData = {
	'email': {
		id: 'emailtext',
		required: 'true',
		success: {
			serverresponse: function(i, obj) {},
			tips: '服务器，成功！'
		},
		failure: {
			tips: '验证失败'
		},
		fu: function(booleans) {}
	},
	'mobile': {
		id: 'mobileyz',
		fu: function(booleans) {}
	},
	'ip': {
		id: 'ipyz',
		required: 'true'
	},
	'chinese': {
		id: 'zwyz',
		txtlength: '2-10'
	},
	'telephone': {
		id: 'ghyz',
		required: 'true'
	},
	'qq': {
		id: 'qqyz'
	},
	'identitycard': {
		id: 'sfzyz'
	},
	'smscode6': {
		id: 'dxyz'
	},
	'customword': {
		id: 'shortword',
		wordlength: '{2,10}',
		fn: function() {}
	},
	http: {
		id: 'http'
	},
	'videoname': {
		id: 'vname',
		custom: 'true',
		success: {
			tips: '自定义对'
		},
		failure: {
			tips: "自定义错了"
		},
		fu: function(i, obj) {
			regex.output(true,i);
		}
	}
};
! function() {
	var initData = {
		vcity: [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 91],
		idInt: [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
		idCh: ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
	};
	var primaryExp = {
		'require': '.+',
		'email': '^[a-z0-9]+([\\._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\\.){1,63}[a-z0-9]+$',
		'number': '^\\d+$',
		'mobile': '^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$',
		'qq': '^[1-9][0-9]{4,}$',
		'ip': '^((?:(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d)))\\.){3}(?:25[0-5]|2[0-4]\\d|((1\\d{2})|([1-9]?\\d))))$',
		'chinese': '[\\u4e00-\\u9fa5]+',
		'telephone': '^((\\(?0\\d{2,3}\\)?)|(0\\d{2,3}-))\\d{7,8}(-\\d{1,6})?$',
		'identitycard': 'identitycard',
		'smscode6': '^\\d{6}$',
		'customword': '^[\\u4e00-\\u9fa5a-zA-Z0-9]',
		'http': '^(\\w+:\\/\\/)?[\\w-/\\.]+\\.[a-zA-Z]{2,3}(:[\\d+])?([\\w-/]+)?$'
	};
	var regexTool = function(data, btn) {
		if (!data) {
			return;
		}
		this.init(data, btn);
	};
	regexTool.prototype = {
		init: function(data, btn) {
			var _this = this;
			this.btn = btn ? document.getElementById(btn) : null;
			this.resultHash = {};
			var _i, _target, _vaule;
			for (var s in jsonData) {
				if (jsonData[s].required) {
					_this.resultHash[s] = jsonData[s];
					_this.resultHash[s].complete = 0;
					_this.resultHash[s].cname = document.getElementById(jsonData[s].id).className;
				}
			}
			if (this.btn) {
				this.btn.onclick = function() {
					_this.complete();
				};
			}
			for (var i in data) {
				var _data_ = data[i];
				if (!primaryExp[i]) {
					for (var ifun in _data_) {
						if (typeof _data_[ifun] == 'function') {
							var extandObj = document.getElementById(_data_.id);
							extandObj.onblur = function() {
								_data_[ifun](i, extandObj);
							};
						}
					}
					return;
				}
				data[i].used = false;
				_i = data[i].id;
				_target = _this._target = document.getElementById(_i);
				_target.onblur = function(i, _target) {
					return function() {
						_vaule = _this.value = _target.value;
						// 身份证特殊处理
						if (primaryExp[i] == 'identitycard') {
							return _this.identitycard(i);
						}
						// 自定义长度
						if (jsonData[i].wordlength && !data[i].used) {
							primaryExp[i] = primaryExp[i] + jsonData[i].wordlength + '$';
							data[i].used = true;
						}
						// 正则验证

						var patt1 = jsonData[i].myexp ? new RegExp(jsonData[i].myexp) : new RegExp(primaryExp[i]);
						console.log(patt1 + '  ' + _vaule);
						patt1.test(_vaule) ? _this.output(true, i) : _this.output(false, i);
					};
				}(i, _target);
			}
		},
		identitycard: function(i) {
			var __vaule = this.value = document.getElementById(jsonData[i].id).value;
			if (/^\d{15}$/.test(__vaule)) {
				this.value = this.fixId(__vaule);
				this.checkExp(i, fixValue);
			} else if (/^\d{17}(\d|X)$/.test(__vaule)) {
				this.checkExp(i, __vaule);
			} else {
				this.output(false, i);
			}
		},
		fixId: function(card) {
			var cardTemp = 0,
				i;
			card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
			for (i = 0; i < 17; i++) {
				cardTemp += card.substr(i, 1) * initData.idInt[i];
			}
			card += initData.idCh[cardTemp % 11];
			return card.length == 18 ? card : false;
		},
		checkExp: function(i) {
			var card = this.value;
			this.year = card.substr(6, 4);
			var year = new Date().getFullYear() - this.year;
			var province = initData.vcity.join();
			var exp = new RegExp(Number(card.substr(0, 2)));
			if (exp.test(province) && year >= 3 && year <= 100 && this.jiaoyanma(card)) {
				this.output(true, i);
			} else {
				this.output(false, i);
			}
		},
		jiaoyanma: function(card) {
			var cardTemp = 0,
				i, valnum;
			for (i = 0; i < 17; i++) {
				cardTemp += card.substr(i, 1) * initData.idInt[i];
			}
			valnum = initData.idCh[cardTemp % 11];
			if (valnum == card.substr(17, 1)) {
				return true;
			}
			return false;
		},
		output: function(result, i) {
			var _this = this;
			var data = jsonData[i];
			var obj = document.getElementById(data.id);
			this.stips = '验证成功！';
			this.ftips = '验证失败！';
			var serverresponse = true;
			this.callfn = function() {};

			if (!data.custom) {
				for (var x in data) {
					if (typeof data[x] == 'function') {
						this.callfn = data[x];
					}
				}
			}
			var span = document.createElement('span');
			span.className = 'pushtips';
			span.innerHTML = "";
			var _parent = obj.parentNode;
			var hastips = _parent.getElementsByTagName('span'),
				haslen = hastips.length;
			if (haslen > 0) {
				for (var s = 0; s < haslen; s++) {
					if (/pushtips/.test(hastips[s].className)) {
						hastips[s].parentNode.removeChild(hastips[s]);
					}
				}
			}
			if (data.success) {
				this.stips = data.success.tips;
				if (data.success.serverresponse) {
					serverresponse = data.success.serverresponse(i, obj) || true;
				}
			}
			this.ftips = data.failure ? data.failure.tips : this.ftips;
			if (result && serverresponse) {
				if (i == 'http' && !/.+:\/\//.test(obj.value)) {
					obj.value = 'http://' + obj.value;
				}
				obj.className = data.cname;
				data.result = true;
				if (data.required) {
					_this.resultHash[i].complete = 1;
				}
				span.className += ' success';
				span.innerHTML = this.stips;
				!data.custom ? this.callfn(true) : '';
			} else {
				data.result = false;
				if (data.required) {
					_this.resultHash[i].complete = 0;
				}
				span.className += ' false';
				span.innerHTML = this.ftips;
				!data.custom ? this.callfn(false) : '';
			}
			obj.parentNode.appendChild(span);
		},
		callfn: function() {},
		complete: function() {
			var json = this.resultHash;
			var hash = [];
			var obj;
			for (var i in json) {
				obj = document.getElementById(json[i].id);
				if (json[i].complete === 0) {
					obj.className = json[i].cname;
					if (!/undone/.test(obj.className)) {
						obj.className += ' undone';
					}
				} else if (json[i].complete === 1) {
					obj.className = json[i].cname;
				}
				hash.push(json[i].complete);
			}
			if (!/0/.test(hash.join(''))) {
				return true;
			} else {
				return false;
			}
		}
	};
	window["regexTool"] = regexTool;
}();
