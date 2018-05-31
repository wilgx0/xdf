var storage = window.sessionStorage;
String.prototype.trim = function(){		//去除二边空格
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

//获取登录用户的token和设备类型
function getToken(){
	return {
		Token			: 	storage.getItem('XX-Token'),
		DeviceType		:	storage.getItem('XX-Device-Type'),
	}
}

//时间戳装换日期格式
function timestampToTime(timestamp) {
	var Y,M,D,h,m,s;
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D+h+m+s;
}

//从json字符串中提取字段
function getFieldsByJsonstr(Data,fields){
	if(!Data){
		return '';
	}
	Data = JSON.parse(Data);
	if(Data[fields]){
		return Data[fields];
	} else {
		return '';
	}
}

/**
 * 验证类
 * @param val  需要验证的值
 * @param rule	验证规则及需要调用的函数
 */
function myValidate (val,rule){
	var _arg = arguments;

    var  isString = function(v){				//判断是否字符串
        return Object.prototype.toString.call(v) == '[object String]';
	};

    var getLength = function(str){			//计算字符串的长度
        var len = 0;
        for (var i=0; i<str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                len++;
            }
            else {
                //len+=2;
                len++;
            }
        }
        return len;
	}

    var isNumber = function(v){				//是否是数值
        var regPos = /^\d+(\.\d+)?$/; //非负浮点数
        var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
        if(regPos.test(v) || regNeg.test(v)){
            return true;
        }else{
            return false;
        }
    }

	var required = function (){			//验证必填
		if(isString(val) || isNumber(val)){
            return val.trim() != '';
		} else {
            return false;
		}
	}

	var isIdCard = function(){			//判断身份证
        if(isString(val) || isNumber(val)){
        	var _val = val.trim();
        	var reg = /^\d{15}(\d{2}[A-Za-z0-9])?$/;
        	if(reg.test(_val)){
        		return true;
			} else {
        		return false;
			}
		} else {
        	return false;
		}
	}

	var maxLength = function (){			//判断是否超过最大长度
		//console.log(_arg[2]);
		var length = _arg[2];
        if(isString(val) || isNumber(val)){
        	console.log(getLength(val));
            return getLength(val) <= length;
		} else {
        	return false;
		}
	}

	return {
        required,
        isIdCard,
        maxLength,
    }[rule]();
}



export {
	getToken,
	timestampToTime,
	getFieldsByJsonstr,
    myValidate,

}
