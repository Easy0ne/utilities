/*-------------------
*Description:        By www.yiwuku.com
*Website:            https://app.zblogcn.com/?id=1130
*Author:             尔今 erx@qq.com
*update:             2016-10-08(Last:2017-11-10)
-------------------*/
$(function() {
	//mobile && other
	var mbpwidth = $(window).width();
	$(window).resize(function() {
		mbpwidth = $(window).width();
	});
	if($(".pager").length){
		if(!$(".pager a").length){
			$(".pager").hide();
		}
	}
	//search
	var searchway = SN_getCookie("searchway");
	if(searchway == 5){
		cu_sbtn(5);
	}else if(searchway == 4){
		cu_sbtn(4);
	}else if(searchway == 3){
		cu_sbtn(3);
	}else if(searchway == 2){
		cu_sbtn(2);
	}else if(searchway == 1){
		cu_sbtn(1);
	}else{
		cu_sbtn(0);
	}
	function cu_sbtn(n){
		$(".serch-box .btns button:eq("+n+")").addClass("ascbg").prepend('<i class="fa fa-check-square"></i>').siblings().removeClass("ascbg").find(".fa").remove();
		var sword = $(".serch-box .btns button:eq("+n+")").text();
		$("#top-box .serch-box .sint").attr("placeholder","请输入"+sword+"关键词");
	}
	$(".serch-box .btns button").click(function(){
		var ifa = $(this).find(".fa").length;
		var index = $(this).index();
		var sword = $(this).text();
		SN_setCookie("searchway",index);
		if(ifa < 1){
			$(this).addClass("ascbg").prepend('<i class="fa fa-check-square"></i>').siblings().removeClass("ascbg").find(".fa").remove();
		}
		var swd = $(".serch-box .sint").val();
		var surl = $(this).attr("data-url");
		if(swd != ""){
			if(index == 0){
				location.href=surl+swd;
			}else{
				window.open(surl+swd);
			}
		}else{
			$(".serch-box .sint").focus();
			$("#top-box .serch-box .sint").attr("placeholder","请输入"+sword+"关键词");
		}
	})
	function serchEnter(){
		var index = $(".serch-box .btns button.ascbg").index();
		var swd = $(".serch-box .sint").val();
		var surl = $(".serch-box .btns button.ascbg").attr("data-url");
		if(swd != ""){
			if(index == 0){
				location.href=surl+swd;
			}else{
				window.open(surl+swd);
			}
		}else{
			$(".serch-box .sint").focus();
		}
	}
	$(".serch-box .sbtn").click(function(){
		serchEnter();
	})
	$(".serch-box .sint").focus(function(){
		document.getElementById("serchwd").onkeydown = function(e){
			e = e?e:window.event;
			if(13==e.keyCode){
				serchEnter();
			}
		}
	});
	//Main-Nav
	$(".main-nav>ul>li").append('<i class="dot"></i>');
	$(".main-nav>ul>li:has('ul')").mouseenter(function(){
		$(this).children("ul").stop(true,true).slideDown(200);
	}).mouseleave(function(){
		$(this).children("ul").stop(true,true).slideUp(200);
	});
	if($(".sn_navico").length){
		var sn_navico = $(".sn_navico").text().split("|");
		$(".main-nav>ul>li").each(function(i){
			if(sn_navico[i] != "" && sn_navico[i] != undefined){
				$(this).children("a").prepend('<i class="fa '+sn_navico[i]+'"></i>');
			}
		});
	}
	//weather+date
	$("#sitenav_from").mouseenter(function(){
		if(location.protocol == "http:"){
			$(this).html("查看天气");
		}
	}).mouseleave(function(){
		sn_From();
	});
	$("#sitenav_from").click(function(){
		if(location.protocol == "http:"){
			SN_oShow(3,"天气预报");
			$(".sn-box-weather iframe:eq(0)").attr("src","http://i.tianqi.com/index.php?c=code&id=7")
			$(".sn-box-weather iframe:eq(1)").attr("src","http://i.tianqi.com/index.php?c=code&id=8&num=3")
		}
	})
	$('#j_date').html(Calendar.day() + Calendar.cnday());
	//scrollnews
	var $sntcon = $(".header_rt .htt"); 
	var scrollTimer; 
	$sntcon.hover(function(){ 
		clearInterval(scrollTimer); 
	},function(){ 
		scrollTimer = setInterval(function(){ 
			scrollNews($sntcon); 
		},3000); 
	}).trigger("mouseout");
	function scrollNews(obj){ 
		var $self = obj.find("ul:first"); 
		var lineHeight = $self.find("li:first").height(); 
		$self.animate({ "margin-top" : -lineHeight +"px" },600 , function(){ 
			$self.css({"margin-top":"0px"}).find("li:first").appendTo($self); 
		}) 
	}
	//index-list
	if($(".sn_cmstii").length){
		var sn_cmstii = $(".sn_cmstii").text().split("|");
		$(".list-index").each(function(i){
			if(sn_cmstii[i] != "" && sn_cmstii[i] != undefined){
				$(this).find(".hat .ti i").replaceWith('<i class="fa '+sn_cmstii[i]+'"></i>');
			}
		});
	}
	var listtip = "此处精彩已折叠，点击这里展开&rarr;";
	$(".list-index .hat .arr").click(function(){
		var index = $(this).parent().parent().index();
		var click = SN_getCookie("snc"+index);
		if(click != 1 || click == null){
			$(this).addClass("cu").prev().hide();
			$(this).parent().append('<div class="tip">'+listtip+'</div>');
			$(this).parent().next().slideUp();
			$(this).find("i").addClass("rot");
			SN_setCookie("snc"+index,1);
		}else{
			$(this).removeClass("cu").prev().show();
			$(this).parent().find(".tip").remove();
			$(this).parent().next().slideDown();
			$(this).find("i").removeClass("rot");
			SN_setCookie("snc"+index,0);
		}
	})
	var listoped = [];
	var listnum = $(".list-index").length;
	for(var i=0;i<=listnum;i++){
		listoped[i] = SN_getCookie("snc"+i);
		if(listoped[i] != 1 || listoped[i] == null){
			$(".list-index:eq("+i+") .hat ul").show();
			$(".list-index:eq("+i+") .hat").find(".tip").remove();
			$(".list-index:eq("+i+") .hat").next().show();
			$(".list-index:eq("+i+") .hat .arr").removeClass("cu").find("i").removeClass("rot");
		}else{
			$(".list-index:eq("+i+") .hat ul").hide(0);
			$(".list-index:eq("+i+") .hat").append('<div class="tip">'+listtip+'</div>');
			$(".list-index:eq("+i+") .hat").next().hide(0);
			$(".list-index:eq("+i+") .hat .arr").addClass("cu").find("i").addClass("rot");
		}
	}
	$(".index-hot .item li:has(div), .list-index .item li:has(div)").mouseenter(function(){
        $(this).addClass("cu").find("div").fadeIn(300);
	}).mouseleave(function(){
		$(this).removeClass("cu").find("div").fadeOut(100);
	});
	$(".top-show a,.list-box .item li a,.post-content .ma").click(function(){
		var IsUrl = $(this).attr("onclick");
		if(typeof(IsUrl)!="undefined"){
			return false;
		}
	});
	$(".list-box .item li .io").append('<i class="fa fa-angle-right"></i>');
	//fixside
	var fstatus = SN_getCookie("fstatus");
	var fsclick = 0;
	if(fstatus == 1){
		fsclick = 1;
		$(".fixside").addClass("normal");
	}
	if(mbpwidth >= 1080){
		$(".fixside").mouseenter(function(){
			$(this).children(".fa").fadeIn(200);
		}).mouseleave(function(){
			$(this).children(".fa").fadeOut(200);
		});
	}
	$(".fixside>.fa").click(function(){
		$(this).hide();
		if(fsclick == 0){
			$(this).parent().addClass("normal");
			SN_setCookie("fstatus",1);
			fsclick = 1;
		}else{
			$(this).parent().removeClass("normal");
			SN_setCookie("fstatus",0);
			fsclick = 0;
		}
	})
	$(".fixside li:first a").click(function(){
		$("html, body").animate({ scrollTop: 0 },300);
	})
	$(".fixside li:last a").click(function(){
		$("html, body").animate({ scrollTop: document.body.clientHeight },300);
	})
	$(".fixside li:not(#s_login) a").click(function(){
		return false;
	})
	//fixside-open
	$(".fixside #s_nav a").click(function(){
		var title = $(this).find("span").text();
		SN_oShow(0,title);
	})
	$(".fixside #s_admin a").click(function(){
		var title = $(this).find("span").text();
		SN_oShow(2,title);
	})
	$(".fixside #s_share a").click(function(){
		var title = $(this).find("span").text();
		SN_oShow(1,title);
	})
	function SN_oShow(i, title) {
		var closei = $(".sn-box:eq("+i+")").children(".fa").length;
		$("body").append('<div class="sn-over-bg"></div>');
		$(".sn-box:eq("+i+")").animate({top:0,opacity:1},500);
		if(closei < 1){
			$(".sn-box:eq("+i+")").prepend('<div class="sn-box-ti">'+title+'</div><i class="fa fa-times-circle"></i>');
		}
	}
	$("body").delegate(".sn-over-bg,.sn-box .fa,.sn-box-con a","click",function(){
		$(".sn-box").animate({top:"-100%",opacity:0},800);
		$(".sn-over-bg").remove();
	})
	$("#pageurl").text(window.location.href);
	var tagColor = ["#333","#f06","#F3A745","#E2C93E","#666","#69B33B","#0593B9","#B0CF2D","#2BAFAE","#06f","#3DABB6","#333"];
	$(".sn-box-nav .foot-tags a").each(function(){
		var tCrand=getRandomNum(0,tagColor.length);
		$(this).css({color:tagColor[tCrand]});
	}); 
	//fixside-rand-vist
	var ima_num = $(".list-box .item li a").length;
	var ima_rand=getRandomNum(0,ima_num);
	var fsrandata = $(".list-box .item li:eq("+ima_rand+")").html();
	$(".fixside #s_rand a").replaceWith(fsrandata);
	$(".fixside #s_rand a").removeAttr("style").html('<i class="fa fa-random" title="随机访问"></i><span>随机访问</span>');
	$(".fixside #s_rand").find("div").remove();
	$(".fixside #s_rand a").click(function(){
		var IsUrl = $(this).attr("onclick");
		if(typeof(IsUrl)!="undefined"){
			return false;
		}else{
			return true;
		}
	})
	//links
	$(".foot-wrap ul").each(function(){
		if($(this).has("li").length){
			$(this).prepend('<li>友情链接：</li>');
		}else{
			$(this).hide();
		}
	});
	//comment
	if($("#divCommentPost").length){
		var cpostop = $("#divCommentPost").offset().top;
		$(".fixside #s_msg a").click(function(){
			$("html, body").animate({ scrollTop: cpostop },300);
			$("#txaArticle").focus();
		});
		$(".cpost .fa-plus").click(function(){
			$("#txaArticle").animate({ height: "+=100px" },300);
		})
		$(".cpost .fa-reply").click(function(){
			$("#txaArticle").val("").focus().animate({ height: "80px" },300);
		});
		document.getElementById("txaArticle").onkeydown = function(e){
			e = e?e:window.event;
			if(e.ctrlKey && 13==e.keyCode){
	   			zbp.comment.post();
			}
		}
	}else{
		$(".fixside #s_msg").hide();
	}
});
function getRandomNum(lbound, ubound) {
	return (Math.floor(Math.random() * (ubound - lbound)) + lbound);
}
function SN_Go(str) {
	window.open(str);
}
//Cookie
function SN_setCookie(name, value) {
	var exp = new Date();
	exp.setTime(exp.getTime() + 900 * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+";path=/";
}
function SN_getCookie(name) {
	var arr,
	reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)) return (arr[2]);
	else return null
}
//Comment
zbp.plugin.unbind("comment.reply", "system");
zbp.plugin.on("comment.reply", "SiteNav", function(i) {
	$("#inpRevID").val(i);
	var frm = $('#divCommentPost'),
		cancel = $("#cancel-reply"),
		temp = $('#temp-frm');
	var div = document.createElement('div');
	div.id = 'temp-frm';
	div.style.display = 'none';
	frm.before(div);
	$('#AjaxComment' + i).before(frm);
	frm.addClass("reply-frm");
	cancel.show();
	cancel.click(function() {
		$("#inpRevID").val(0);
		var temp = $('#temp-frm'),
			frm = $('#divCommentPost');
		if (!temp.length || !frm.length) return;
		temp.before(frm);
		temp.remove();
		$(this).hide();
		frm.removeClass("reply-frm");
		return false;
	});
	try {
		$('#txaArticle').focus();
	} catch (e) {}
	return false;
});
zbp.plugin.on("comment.get", "SiteNav", function(postid, page) {
	$('span.commentspage').html("Waiting...");
});
zbp.plugin.on("comment.got", "SiteNav", function(formData, data, textStatus, jqXhr) {
	$('#AjaxCommentBegin').nextUntil('#AjaxCommentEnd').remove();
	$('#AjaxCommentEnd').before(data);
	$("#cancel-reply").click();
});
zbp.plugin.on("comment.postsuccess", "SiteNav", function () {
	$("#cancel-reply").click();
});
//日期
var tools = {
	format: function(_, B) {
		if (arguments.length > 1) {
			var F = tools.format,
				H = /([.*+?^=!:${}()|[\]\/\\])/g,
				C = (F.left_delimiter || "{").replace(H, "\\$1"),
				A = (F.right_delimiter || "}").replace(H, "\\$1"),
				E = F._r1 || (F._r1 = new RegExp("#" + C + "([^" + C + A + "]+)" + A, "g")),
				G = F._r2 || (F._r2 = new RegExp("#" + C + "(\\d+)" + A, "g"));
			if (typeof(B) == "object") return _.replace(E, function(_, A) {
				var $ = B[A];
				if (typeof $ == "function") $ = $(A);
				return typeof($) == "undefined" ? "" : $
			});
			else if (typeof(B) != "undefined") {
				var D = Array.prototype.slice.call(arguments, 1),
					$ = D.length;
				return _.replace(G, function(A, _) {
					_ = parseInt(_, 10);
					return (_ >= $) ? A : D[_]
				})
			}
		}
		return _
	},
	dateFormat: function(format) {
		var now = new Date((new Date).getTime() + 864E5);
		var o = {
			"M+": now.getMonth() + 1,
			//month 
			"d+": now.getDate(),
			//day 
			"h+": now.getHours(),
			//hour 
			"m+": now.getMinutes(),
			//minute 
			"s+": now.getSeconds(),
			//second 
			"q+": Math.floor((now.getMonth() + 3) / 3),
			//quarter 
			"S": now.getMilliseconds() //millisecond 
		}

		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (now.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
			}
		}
		return format;
	}

}
var Calendar = (function() { /*农历日历*/
	var lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63];
	var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
	var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
	var now = new Date();
	var SY = now.getFullYear();
	var SM = now.getMonth();
	var SD = now.getDate();
	function cyclical(num) {
		return (Gan[num % 10] + Zhi[num % 12])
	}
	function lYearDays(y) {
		var i, sum = 348;
		for (i = 0x8000; i > 0x8; i >>= 1) sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
		return (sum + leapDays(y))
	}
	function leapDays(y) {
		if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
		else return (0)
	}
	function leapMonth(y) {
		return (lunarInfo[y - 1900] & 0xf)
	}
	function monthDays(y, m) {
		return (lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29
	}
	function Lunar(objDate) {
		var i, leap = 0,
			temp = 0;
		var baseDate = new Date(1900, 0, 31);
		var offset = (objDate - baseDate) / 86400000;
		this.dayCyl = offset + 40;
		this.monCyl = 14;
		for (i = 1900; i < 2050 && offset > 0; i++) {
			temp = lYearDays(i);
			offset -= temp;
			this.monCyl += 12
		}
		if (offset < 0) {
			offset += temp;
			i--;
			this.monCyl -= 12
		}
		this.year = i;
		this.yearCyl = i - 1864;
		leap = leapMonth(i);
		this.isLeap = false;
		for (i = 1; i < 13 && offset > 0; i++) {
			if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
				--i;
				this.isLeap = true;
				temp = leapDays(this.year)
			} else {
				temp = monthDays(this.year, i)
			}
			if (this.isLeap == true && i == (leap + 1)) {
				this.isLeap = false
			}
			offset -= temp;
			if (this.isLeap == false) {
				this.monCyl++
			}
		}
		if (offset == 0 && leap > 0 && i == leap + 1) {
			if (this.isLeap) {
				this.isLeap = false
			} else {
				this.isLeap = true;
				--i;
				--this.monCyl
			}
		}
		if (offset < 0) {
			offset += temp;
			--i;
			--this.monCyl
		}
		this.month = i;
		this.day = offset + 1
	}
	function cDay(m, d) {
		var nStr1 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
		var nStr2 = ['初', '十', '廿', '卅'];
		var s;
		if (m > 10) {
			s = '十' + nStr1[m - 10]
		} else {
			s = nStr1[m]
		}
		if (s == '一') {
			s = '正';
		}
		s += '月';
		switch (d) {
		case 10:
			s += '初十';
			break;
		case 20:
			s += '二十';
			break;
		case 30:
			s += '三十';
			break;
		default:
			s += nStr2[Math.floor(d / 10)];
			s += nStr1[parseInt(d % 10)]
		}
		return (s)
	}
	function solarDay2() {
		var lDObj = new Lunar(new Date(SY, SM, SD));
		var tt = cDay(lDObj.month, lDObj.day);
		return (tt)
	}
	function showToday() {
		var weekStr = "日一二三四五六";
		var template = '<span>#{YY}-#{MM}-#{DD}</span> 星期#{week}';
		var day = tools.format(template, {
			YY: SY,
			MM: SM + 1,
			DD: SD,
			week: weekStr.charAt(now.getDay())

		});
		return day;
	}
	function showdate() {
		SD = SD + 1;
		var m = SM < 9 ? ('0' + (SM + 1)) : SM + 1;
		var d = SD + 1 < 10 ? ('0' + SD) : SD;
		return (SY + '-' + m + '-' + d);
	}
	function cncal() {
		var cacal = '(' + solarDay2() + ')'; //农历
		return cacal;
	}
	return {
		day: showToday,
		cnday: cncal,
		date: showdate
	}
})();
//jsload
var SN_jsload={head:document.getElementsByTagName("body")[0]||document.documentElement,Myload:function(B,A){this.done=false;B.onload=B.onreadystatechange=function(){if(!this.done&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){this.done=true;A();B.onload=B.onreadystatechange=null;if(this.head&&B.parentNode){this.head.removeChild(B)}}}},getScript:function(A,C,Z){var B=function(){};if(C!=undefined){B=C}var D=document.createElement("script");D.setAttribute("type","text/javascript");D.setAttribute("src",A);D.setAttribute("charset",Z);this.head.appendChild(D);this.Myload(D,B)}}
if(document.getElementById("myFocus")){ 
	SN_jsload.getScript('../zb_users/theme/SiteNav/js/myfocus-2.0.4.min.js',function(){
		myFocus.set({
		    id:'myFocus',
		    pattern:'mF_liquid'
		});
	},'utf-8');
}
if(document.getElementById("sitenav_from")){
	function sn_From(){
		SN_jsload.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function () {
		    if(remote_ip_info.city==remote_ip_info.province) remote_ip_info.province="";
		    document.getElementById("sitenav_from").innerHTML=remote_ip_info.province+remote_ip_info.city;
		},'utf-8');
	}
	sn_From();
}
if(document.getElementById("serchwd")){
	SN_jsload.getScript('http://www.baidu.com/js/opensug.js',function(){},'gbk'); //搜索词提示
}

//Tips:以上js代码已尽最大努力简写和优化，如无绝对把握，切勿擅自修改  —— wwww.yiwuku.com 尔今(erx@qq.com)