var storage = window.sessionStorage;

//获取登录用户的token和设备类型
function getToken(){
	return {
		Token			: 	storage.getItem('XX-Token'),
		DeviceType		:	storage.getItem('XX-Device-Type'),
	}
}

export {
	getToken
}
