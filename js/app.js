/**
 * 演示程序当前的 “注册/登录” 等操作，是基于 “本地存储” 完成的
 * 当您要参考这个演示程序进行相关 app 的开发时，
 * 请注意将相关方法调整成 “基于服务端Service” 的实现。
 **/
(function($, owner) {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		 var re=isValidBusCode("loginInfo.account ");
	isIDCard=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/; 
	
	if (loginInfo.account.length==18) {
			if(!isIDCard.test(loginInfo.account)){
		return callback('身份证号错误');
	}
				
		}	else if(loginInfo.account.length==15){
  
   
	   if(re==false){
	   	    mui.toast("营业执照错误")
	   }  
  return;
		}
		else{
			mui.toast("请输入正确长度的账号");
			return;
		}
		
	
	
		if (loginInfo.password.length < 6) {
			return callback('密码不能低于6位');
		
	}
	
		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		var authed = users.some(function(user) {
			return loginInfo.account == user.account && loginInfo.password == user.password;
		});
		if (authed) {
			return owner.createState(loginInfo.account, callback);
		} else {
			return callback('用户名或密码错误');
		}
	};
function isValidBusCode(busCode){  
  var ret=false; 
  if(busCode.length==15){ 
    var sum=0; 
                  var s=[]; 
                  var p=[]; 
                  var a=[]; 
                  var m=10; 
                  p[0]=m; 
    for(var i=0;i<busCode.length;i++){ 
       a[i]=parseInt(busCode.substring(i,i+1),m); 
                     s[i]=(p[i]%(m+1))+a[i]; 
                     if(0==s[i]%m){ 
                       p[i+1]=10*2; 
                     }else{ 
                       p[i+1]=(s[i]%m)*2; 
                      }     
    }     
    alert(s)
    if(1==(s[14]%m)){ 
       //营业执照编号正确! 
                      //alert("营业执照编号正确!"); 
        ret=true; 
    }else{ 
       //营业执照编号错误! 
                      ret=false; 
                      //alert("营业执照编号错误!"); 
           } 
  }else if(""==busCode){ 
  ret=true; 
  } 
         return ret;  
}  
	owner.createState = function(name, callback) {
		var state = owner.getState();
		state.account = name;
		state.token = "token123456789";
		owner.setState(state);
		return callback();
	};

	/**
	 * 新用户注册
	 **/
	
	owner.reg = function(regInfo, callback) {
		
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
	 var phone=document.getElementById("phone");
		regInfo.password = regInfo.password || '';
		regphone=/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
			isIDCard=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/; 
        
	

		if (regInfo.account.length==18) {
			if(!isIDCard.test(regInfo.account)){
		return callback('身份证号错误');
	}
		}
//		else if(account1.value.length==15){
// 
//	   if(re==false){
//	   	    mui.toast("营业执照错误")
//	   }  
//return;
//		}
else{
			mui.toast("请输入正确长度的账号");
			return
		}
	
		if (regInfo.password.length < 6) {
			return callback('密码不能低于6位');
		}
	
		if (!checkEmail(regInfo.email)) {
			return callback('邮箱地址不合法');
		}
		 if(regphone.test(phone.value)==false){
		 	mui.toast("手机号错误")
		 	return false
		 }
		 

		var users = JSON.parse(localStorage.getItem('$users') || '[]');
		users.push(regInfo);
		localStorage.setItem('$users', JSON.stringify(users));
		return callback();
	};

	/**
	 * 获取当前状态
	 **/
	owner.getState = function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	};

	/**
	 * 设置当前状态
	 **/
	owner.setState = function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	};

	var checkEmail = function(email) {
		email = email || '';
		return (email.length > 3 && email.indexOf('@') > -1);
	};

	/**
	 * 找回密码
	 **/
	owner.forgetPassword = function(email, callback) {
				  var re=isValidBusCode("account.value");
	  var account=document.getElementById("account");
			isIDCard=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/; 
		if (account.value.length==18) {
			if(!isIDCard.test(account.value)){
		return callback('身份证号错误');
	
	}
		}
		else if(account.value.length==15){
   
	   if(re==false){
	   	    mui.toast("营业执照错误")
	   }  
return;
		}
else{
			mui.toast("请输入正确长度的账号");
			return
		}
		callback = callback || $.noop;
		if (!checkEmail(email)) {
			return callback('邮箱地址不合法');
		}
		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
	};

	/**
	 * 获取应用本地配置
	 **/
	owner.setSettings = function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	}

	/**
	 * 设置应用本地配置
	 **/
	owner.getSettings = function() {
			var settingsText = localStorage.getItem('$settings') || "{}";
			return JSON.parse(settingsText);
		}
		/**
		 * 获取本地是否安装客户端
		 **/
	owner.isInstalled = function(id) {
		if (id === 'qihoo' && mui.os.plus) {
			return true;
		}
		if (mui.os.android) {
			var main = plus.android.runtimeMainActivity();
			var packageManager = main.getPackageManager();
			var PackageManager = plus.android.importClass(packageManager)
			var packageName = {
				"qq": "com.tencent.mobileqq",
				"weixin": "com.tencent.mm",
				"sinaweibo": "com.sina.weibo"
			}
			try {
				return packageManager.getPackageInfo(packageName[id], PackageManager.GET_ACTIVITIES);
			} catch (e) {}
		} else {
			switch (id) {
				case "qq":
					var TencentOAuth = plus.ios.import("TencentOAuth");
					return TencentOAuth.iphoneQQInstalled();
				case "weixin":
					var WXApi = plus.ios.import("WXApi");
					return WXApi.isWXAppInstalled()
				case "sinaweibo":
					var SinaAPI = plus.ios.import("WeiboSDK");
					return SinaAPI.isWeiboAppInstalled()
				default:
					break;
			}
		}
	}
}(mui, window.app = {}));