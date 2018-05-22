var storage = window.sessionStorage;

//获取登录用户的token和设备类型
function getToken(){
	return {
		Token			: 	storage.getItem('XX-Token'),
		DeviceType		:	storage.getItem('XX-Device-Type'),
	}
}

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

export {
	getToken,
	timestampToTime,
}
