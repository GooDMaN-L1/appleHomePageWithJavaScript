var div = null,
	isChange = false,
	login = document.getElementById('login'),
	search = document.getElementById('search'),
	gift = document.getElementById('gift'),
	pic = document.getElementById("pic"),
	pro = document.getElementById('pro'),
	wwdc = document.getElementById('wwdc'),
	boxs = document.getElementById("boxs"),
	nav = document.getElementById("nav"),
	box = boxs.children;

boxs.isAppear = false;
boxs.isOver = false;
search.isCreate = false;
gift.angle = 0;
pic.initHeight = pic.offsetHeight;

nav.onmouseover = function(){
	if(boxs.isAppear == false){
		var i = 0;
		boxs.isAppear = true;
		var outterID = setInterval(function(){
			var nowbox = box[i];
			var innerID = setInterval(function(){
				var newleft = parseInt(getStyle(nowbox, "left")) - 1;
				nowbox.style.opacity = (80 - newleft) * 0.01;
				nowbox.style.left = newleft + "px";
				if(newleft == 0){
					clearInterval(innerID);
					if(parseInt(box[box.length - 1].style.left) == 0){
						boxs.isOver = true;
					}
				}
			}, 5);
			if(++i == box.length){
				clearInterval(outterID);
			}
		},100);
	}
}
for(var i = 0; i < box.length; i ++){
	box[i].onmouseout = function(e){
		e.stopPropagation();
	}
}
boxs.onmouseout = function(){
	console.log("woc");
	if(boxs.isOver == true){
		var i = 0;
		boxs.isOver = false;
		var outterID = setInterval(function(){
			var nowbox = box[i];
			var innerID = setInterval(function(){
				var newleft = parseInt(getStyle(nowbox, "left")) - 1;
				nowbox.style.opacity = (newleft + 80) * 0.01;
				nowbox.style.left = newleft + "px";
				if(newleft == -80){
					clearInterval(innerID);
					nowbox.style.left = -newleft + "px";
					if(parseInt(box[box.length - 1].style.left) == 80){
						boxs.isAppear = false;
					}
				}
			}, 5);
			if(++i == box.length){
				clearInterval(outterID);
			}
		},100);
	}
}
search.onclick = function(){
	if(search.isCreate){
		document.onmousemove = null;
		document.body.removeChild(div);
	}else{
		div = document.createElement("div");
		div.style.position = "absolute";
		div.style.width = "50px";
		div.style.height = "50px";
		div.style.zIndex = "2";
		div.style.background = "url(images/search1.png) no-repeat center center";
		document.body.appendChild(div);
		document.onmousemove = function(e){
			div.style.left = e.pageX + 5 + 'px';
			div.style.top = e.pageY + 5 + 'px';
		}
	}
	search.isCreate = !search.isCreate;
}
login.onclick = function (){
	var account = null;
	var password = null;
	account = prompt('请输入用户名：');
	while(account != null){
		if(account.indexOf('@') != -1){
			password = prompt('请输入密码：');
			while(password != null && password.length == 0){
				password = prompt('密码不合法！请重新输入密码：');
			}
			break;
		}
		account = prompt('用户名不合法！请重新输入用户名：');
	}
	if(account == null || password == null){
		alert("您已取消登录操作");
	}else{
		alert("登陆成功！");
	}
}
gift.onmouseover = function(){
	if(gift.angle <= 0){
		gift.timeid = setInterval(function(){
			gift.style.transform = 'rotate(' + ++gift.angle + 'deg)';
		}, 10);
	}
}
gift.onmouseout = function(){
	clearInterval(gift.timeid);
	gift.angle %= 360;
	gift.timeid = setInterval(function(){
		gift.style.transform = 'rotate(' + --gift.angle + 'deg)';
		if(gift.angle <= 0){
			clearInterval(gift.timeid);
		}
	}, 1);
}
pic.onmouseover = function(){
	var h = pic.offsetHeight;
	pic.style.height = ++h + 'px'
	pic.timeid = setInterval(function() {
		h = pic.offsetHeight;
		(h < 400) ? (pic.style.height = ++h + 'px') : clearInterval(pic.timeid) ;
	}, 20);
}
pic.onmouseout = function() {
	clearInterval(pic.timeid);
	pic.style.height = pic.initHeight + 'px'
}
pro.onclick = change;
wwdc.onclick = change;
function change(){
	if(isChange){
		animate(pro,{left:0});
		animate(wwdc,{left:0});
	}else{
		animate(pro,{left:705});
		animate(wwdc,{left:-705});
	}
	isChange = !isChange;
}		
function getStyle(obj, attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}
function animate(obj,json){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var isOpacity = (attr == 'opacity'),
				style = getStyle(obj, attr),
				now = isOpacity ? parseInt(style * 100) : parseInt(style),
				speed = (json[attr] - now) / 10;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			var cur = now + speed;
			obj.style[attr] = isOpacity ? cur / 100 : cur + 'px';
			if(json[attr] !== cur){
				isStop = false;
			}
		}
	}, 10);
}