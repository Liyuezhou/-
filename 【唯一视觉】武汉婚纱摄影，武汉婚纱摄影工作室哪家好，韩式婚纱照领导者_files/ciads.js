
/*
	*名称: caids.js
	*日期: 2012-3-08
	*功能: 影楼/企业网站浏览器动效程式
	*作者: 武汉奕创互动广告有限公司前端架构团队
	*版权: 武汉奕创互动广告有限公司(http://www.ciads.net http://www.ciads.com)保留
 */

$(function(){
	$(".h_news li .s1 img").each(function(){
		$(this).data("smallsrc",$(this).attr("data-src"));
		$(this).data("bigsrc",$(this).attr("data-img"));
	});
	loadimages(); // 图片加载
	foot(); // 底部动画
	photo2();
	
	$(".h_news a").hover(function(){
		$(this).find(".s1 img").stop().animate({"top":"-450px"},300);
	},function(){
		$(this).find(".s1 img").stop().animate({"top":"0"},500);
	});
	
	$(".ciads_leftf .u1 li").hover(function(){
		$(this).find(".d1").show().stop().animate({"width":"90px"},300);
	},function(){
		$(this).find(".d1").stop().animate({"width":"0px"},300,function(){
			$(this).hide();
		});
	});
	
	
		
	$(".z_nav .scroll").scrollable({size:4,items:".z_nav .scroll ul",loop:true});
	
	$(".z_themefr .d1 .scroll").scrollable({size:1,items:".z_themefr .d1 .scroll",loop:true}).autoscroll({autoplay:true,interval:5000,steps:1}).navigator({navi:".u1",naviItem:"li",activeClass:"focus"});	
	
	$(window).scroll(function(){
		var scroH = $(this).scrollTop();

		if(scroH < 250){
			$('.float_top').slideUp(500);			
		}else if(scroH > 250){
			$('.float_top').slideDown(500);			
		};
	});
	
	var menutime;
	if( $(".c_menu2").length>0 )
	{
		$(".c_menu2,.c_menu3").hover(function(){
			clearTimeout(menutime);
		},function(){
			menutime=setTimeout(function(){
				$(".c_menu2 a").removeClass("hover");
				$(".c_menu3").stop().animate({"height":"0px"},300,function(){
					$(this).hide();
				});
			},200);
			
		})
		
		$(".c_menu2 a").hover(function(){
			var cs=$(this).parent().attr("class");
			$(".c_menu2 a").removeClass("hover");
			$(this).addClass("hover");
			if($(".c_menu3").find("."+cs).length>0)
			{
				$(".c_menu3").show().stop().animate({"height":"45px"},300);
				$(".c_menu3 ul .li0").css({"padding-left":$(this).offset().left-($(window).width()-$(".wrap").width())/2-50});
				$(".c_menu3 ul").stop().animate({"margin-top":(-45)*($(".c_menu3").find("."+cs).prevAll().length)},300);
			}
			else
			{
				$(".c_menu3").stop().animate({"height":"0px"},300,function(){
					$(this).hide();
				});
			}
		},function(){
			
		});
	}
	
	if($(".sc01").length>0)
	{
		$(".sc01").scrollable({size:3,items:".sc01 ul",loop:true});
	};
	
	if($(".h_sc1").length>0)
	{
		$(".h_sc1").scrollable({size:4,items:".h_sc1 ul",loop:true,vertical:true});
	};
	
	if( $(".ciads_leftf").length>0 )
	{
		$(".ciads_leftf").height($(window).height());
		setInterval(function(){
			$(".ciads_leftf .li6 a").css({"color":"#ffee35"});
			setTimeout(function(){
				$(".ciads_leftf .li6 a").removeAttr("style");
			},250);
		},500);
	}
	
		if( $(".c_head2").length>0 )
	{
		setInterval(function(){
			$(".c_head2 .c_menu3 a.amt").css({"color":"#ffee35"});
			setTimeout(function(){
				$(".c_head2 .c_menu3 a.amt").removeAttr("style");
			},250);
		},500);
	}
	
	$(".h_events li a").hover(function(){
		$(".h_events li a").removeClass("hover");
		$(this).addClass("hover");
		if( $(this).parents("li").siblings().length>0 )
		{
			$(this).siblings().stop().animate({"opacity":"0.3"},500);
		}
		$(this).parents("li").siblings().find("a:not(.hover)").stop().animate({"opacity":"0.3"},500);
	},function(){
		$(".h_events li a").stop().animate({"opacity":"1"},500);
	});
	
	
	$(".z_love_s li a").hover(function(){
		
		$(".z_love_s li a").removeClass("hover");
		$(this).addClass("hover");
		if( $(this).parents("li").siblings().length>0 )
		{
			$(this).siblings().stop().animate({"opacity":"0.3"},500);			
		}
		$(this).parents("li").siblings().find("a:not(.hover)").stop().animate({"opacity":"0.3"},500);
	},function(){
		$(".z_love_s li a").stop().animate({"opacity":"1"},500);

	});

	
	$(".z_thlist li a").hover(function(){
		$(this).parents("li").siblings().find("i").stop().animate({"opacity":"1"},500);
		},function(){
		$(".z_thlist li a").find("i").stop().animate({"opacity":"0"},500);
		})
		

	
	
	
	$(".ciads_messagesubmit").click(function(){
		if( $(".ciads_message").val()!="" )
		{
			$.ajax({
				url: '/php/ciadsajax.php',
				type: 'POST',
				data:{"action":"message","parent":$(".ciads_id").val(),"content":$(".ciads_message").val(),"type":$(".ciads_type").val()},
				dataType: 'json',
				success: function(r){
					if( r.error == 0 )
					{
						$(".ciads_message").val("");
						alert("评价成功！");
						return false;
					}
					else( r.error == 1 )
					{
						$(".ciads_message").val("");
						alert("您已经评论过了哦。");
						return false;
					}
				}				
			});
		}
		else
		{
			alert("评论不能为空哦！");
			$(".ciads_message").focus();
			return false;
		}
	});
	
		$(".ciads_ajax_input_submit2").live("click",function(){

			$.ajax({
				url: '/php/ciadsajax.php',
				type: 'POST',
				data:{"action":"member","name":$(".ciads_ajax_input_name2").val(),"qq":$(".ciads_ajax_input_qq2").val(),"tel":$(".ciads_ajax_input_tel2").val(),"type":$(".ciads_ajax_input_type2").val()},
				dataType: 'json',
				success: function(r){
					if( r.error == 0 )
					{   
						$(".ciads_ajax_input_name2").val("");
						$(".ciads_ajax_input_tel2").val("");
						alert("注册成功！");
						return false;
					}
					else( r.error == 1 )
					{
						$(".ciads_ajax_input_name2").val("");
						$(".ciads_ajax_input_tel2").val("");
						alert("您已经注册过了哦。");
						return false;
					}
				}				
			});

		
	});
	
	$(".ciads_ilike").click(function(){
		var ilike=$(this).parents("[data-ilike]").find("[data-likecount='ciads']");
		var id =$(this).attr("data-id");
		var $this=$(this);
		$.ajax({
			type: "GET",
			url: "/php/ciadsajax.php?action=ilike&id="+id+"&runtime="+Math.random(),
			dataType: "JSON",
			success: function(msg){
				if(msg.error==0)
				{
					if( ilike.length>0)
					{
						ilike.text(msg.ilike);
					}
					showlikesbox($this,$(msg.html),"您已经喜欢成功了！");
				}
				else if (msg.error==1)
				{
					showlikesbox($this,$(msg.html),"您已经喜欢过了！");
				}
			}
		});
		return false;
	});
	
	$(".n_newslist:last").css({"border-bottom":"0"})
	
	$("a[href*='53kf.com']").live("click",function(){
		var myDate = new Date();
		var h=myDate.getHours();
		if( h>6 )
		{
			window.open($(this).attr("href"),'_blank','height=473,width=703,top=200,left=200,status=yes,toolbar=no,menubar=no,resizable=yes,scrollbars=no,location=no,titlebar=no');
		return false;
		}
		else
		{
			$(".ciads_ajax_53kf").remove();
			var html='<div class="ciads_ajax_box ciads_ajax_53kf"><a href="#1" class="ciads_ajax_box_close">✕</a><h2 class="fmyh">亲！现在是凌晨,本店已打烊！<br />客服人员都睡觉啦 ^-^ </h2><p class="p1 fmyh">请在下方留下您的姓名及电话号码！以便客服明日及时与您沟通！</p><ul class="u1 ciads_ajax_input"><li><input type="text" value="请输入您姓名" data-value="请输入您姓名" class="ciads_ajax_input_name begin" /></li><li><input type="text" value="请输入您的电话号码" data-value="请输入您的电话号码" class="ciads_ajax_input_tel begin" /><input type="hidden" value="" class="ciads_ajax_input_qq" /><input type="hidden" value="6" class="ciads_ajax_input_type" /></li></ul><p class="ciads_ajax_input_load p3">正在努力提交中...</p><p class="p2"><input type="button" value="提交" class="ciads_ajax_input_submit"  data-ok="提交成功！" data-error="您已经提交过了，我们会尽快联系您！" /></p><div class="zz ciads_ajax_input_alert"><h3 class="fmyh"><strong>谢谢您的此次访问！<br />我们会尽快与您取得联系!</strong></h3><ul class="u2 fmyh"><li><a href="/day.html">今日最新客照绚丽登场</a></li><li><a href="/news/27.html">大家都乐疯了, 最新火热活动火热进行中...</a></li><li><a href="/witness.html">看看大家怎么评价我们!!!</a></li></ul></div></div>';
			$("body").append($(html));
			$(".ciads_ajax_53kf").css({"left":($(window).width()-560)/2,"top":$(document).scrollTop()+($(window).height()-330)/2,"opacity":"0"}).show().stop().animate({"opacity":"1"},500);
			return false;
		}
	});
	
	$(".ciads_ajax_input input").live("focus",function(){
		$(this).addClass("ciads_input_active");
		if( $(this).val()==$(this).attr("data-value") )
		{
			$(this).val("");
		}
	});
	$(".ciads_ajax_input input").live("blur",function(){
		$(this).removeClass("ciads_input_active");
		if( $(this).val()=="" )
		{
			$(this).val($(this).attr("data-value"));
		}
	});
	
	$(".ciads_ajax_box_close").live("click",function(){
		$(".ciads_ajax_box").stop().animate({opacity:0},200,function(){
			$(this).remove();
		});
	});
	
	$(".ciads_ajax_input_submit").live("click",function(){
		var t=1;
		$this=$(this);
		$(".ciads_ajax_input_load").show();
		
		$(".ciads_ajax_input input:text").each(function(){
			if( $(this).val()=="" || $(this).val()==$(this).attr("data-value") ){
				alert($(this).attr("data-value"));
				$(".ciads_ajax_input_load").hide();
				t=0;
				return false;
			}
		});
		if( t==1 )
		{
			$.ajax({
				url: '/php/ciadsajax.php',
				type: 'POST',
				data:{"action":"member","name":$(".ciads_ajax_input_name").val(),"qq":$(".ciads_ajax_input_qq").val(),"tel":$(".ciads_ajax_input_tel").val(),"type":$(".ciads_ajax_input_type").val()},
				dataType: 'json',
				success: function(r){
					if( r.error == 0 )
					{   
						alert($this.attr("data-ok"));
						if( $(".ciads_ajax_input_alert").length>0 )
						{
							$(".ciads_ajax_input_alert").show();
						}
						else
						{
							$(".ciads_ajax_box").stop().animate({opacity:0},200,function(){
								$(this).remove();
							});
						}
						return false;
					}
					else( r.error == 1 )
					{
						alert($this.attr("data-error"));
						$(".ciads_ajax_box").stop().animate({opacity:0},200,function(){
							$(this).remove();
						});
						return false;
					}
				}				
			});
		}
		
	});
	
	resize();
	member(); // 注册网络会员
	$(window).resize(function(){
		resize();
	});
	
});

function resize()
{
	home_h_thlist(); // 首页作品
	home_h_news(); //首页新闻
	
	$(".n_6yt").removeAttr("style");
	$(".n_6yt").css({"padding-left":($(".wrap").width()-$(".n_6yt").width())/2});
	
	if( $(".ciads_leftf").length>0 )
	{
		$(".ciads_leftf").height($(window).height());
		if( parseInt($(window).height())<=700 )
		{
			$(".ciads_leftf").addClass("ciads_leftf2");
		}
		else
		{
			$(".ciads_leftf").removeClass("ciads_leftf2");
		}
	}
	
}


function home_h_thlist(){ // 首页作品
	if( parseInt($(".wrap").width())==1800 )
	{
		$(".h_thlist a").unbind("hover");
	}
	else if( parseInt($(".wrap").width())==1400 )
	{
		$(".h_thlist a").hover(function(){
			$(this).find(".s1 img").stop().animate({"marginTop":"0","marginLeft":"0","width":"100%"},500);
		},function(){
			$(this).find(".s1 img").stop().animate({"marginTop":"-5%","marginLeft":"-3%","width":"106%"},500);
		});
	}
	else if( parseInt($(".wrap").width())==1200 )
	{
		$(".h_thlist a").hover(function(){
			$(this).find(".s1 img").stop().animate({"marginTop":"0","marginLeft":"0","width":"100%"},500);
		},function(){
			$(this).find(".s1 img").stop().animate({"marginTop":"-5%","marginLeft":"-3%","width":"106%"},500);
		});
	}
}

function home_h_news(){
	if( parseInt($(".wrap").width())==1800 )
	{
		$(".h_news li").removeClass("lit").show();
		$(".h_news li .s1 img").each(function(i){
			if( i!=3 && i!=4 )
			{
				$(this).attr("data-src",$(this).data("smallsrc"));
				$(this).attr("src",$(this).data("smallsrc"));
			}
			else
			{
				$(this).parents("li").addClass("lit");
				$(this).attr("data-src",$(this).data("bigsrc"));
				$(this).attr("src",$(this).data("bigsrc"));
			}
		});
	}
	else if( parseInt($(".wrap").width())==1400 )
	{
		$(".h_news li").removeClass("lit").show();
		$(".h_news li .s1 img").each(function(i){
			if( i!=2 )
			{
				$(this).attr("data-src",$(this).data("smallsrc"));
				$(this).attr("src",$(this).data("smallsrc"));
			}
			else
			{
				$(this).parents("li").addClass("lit");
				$(this).attr("data-src",$(this).data("bigsrc"));
				$(this).attr("src",$(this).data("bigsrc"));
			}
		});
		$(".h_news li:last").hide();
	}
	else if( parseInt($(".wrap").width())==1200 )
	{
		$(".h_news li").removeClass("lit").show();
		$(".h_news li .s1 img").each(function(i){
			if( i!=2 )
			{
				$(this).attr("data-src",$(this).data("smallsrc"));
				$(this).attr("src",$(this).data("smallsrc"));
			}
			else
			{
				$(this).parents("li").addClass("lit");
				$(this).attr("data-src",$(this).data("bigsrc"));
				$(this).attr("src",$(this).data("bigsrc"));
			}
		});
		$(".h_news li:last").hide();
		$($(".sc01").length>0)
		{
			$(".sc01").scrollable({size:4,items:".sc01 ul",loop:true});
		};
	}
};
function menu(){var url=getFileName();if(url!=""){$(".menu ul li a[href*='"+url+"']").addClass("hover");}else{$(".menu ul li:first a").addClass("hover");}};
function getFileName(){var url = this.location.href;var pos = url.lastIndexOf("/");if(pos == -1){ pos = url.lastIndexOf("\\");}var filename = url.substr(pos+1,3);return filename;}

function loadimages()
{
	/**
	$("img").each(function(){
		$(this).data("data-src",$(this).attr("src"));
		$(this).attr("load",0);
		$(this).attr("src","theme/bg/load.gif")
	});
	**/
	loadimages2();
	$(window).scroll(function(){
		loadimages2();
	});
}

function loadimages2()
{ 
	$("img[load=0],img[load!=1]").each(function(){
		if( parseInt($(this).offset().top)<=parseInt($(document).scrollTop())+parseInt($(window).height())+400 )
		{
			$(this).attr("src",$(this).attr("data-src"));
			$(this).removeAttr("data-src");
			$(this).attr("load",1);
			if( $('.ciads_pubu').length>0 )
			{
				$(this).load(function(){
					$('.ciads_pubu').masonry('reload');
				})
			}
		}
	});
}

function showlikesbox($this,$html,$info)
{
	$(".ciads_likebox").remove();
	$(".ciads_ajax_show").removeClass("ciads_ajax_show");
	$this.addClass("ciads_ajax_show");
	$html.find(".ciads_ajax_close").click(function(){
		$(".ciads_likebox").remove();
		$(".ciads_ajax_show").removeClass("ciads_ajax_show");
	});
	$html.find(".ciads_ajax_list a").fancybox({
		'transitionIn': 'elastic',
		'transitionOut': 'elastic',
		'cyclic': true,
		'padding': 7,
		'overlayColor': '#000',
		'overlayOpacity': 0.6,
		'titlePosition': 'outside'
	});
	$html.find(".ciads_ajax_submit").click(function(){
		if( $html.find(".ciads_ajax_content").val()!="" )
		{
			$.ajax({
				url: '/php/ciadsajax.php',
				type: 'POST',
				data:{"action":"message","parent":$html.find(".ciads_ajax_id").val(),"content":$html.find(".ciads_ajax_content").val(),"type":1},
				dataType: 'json',
				success: function(r){
					if( r.error == 0 )
					{
						$html.find(".ciads_ajax_content").val("");
						alert("评价成功！");
						return false;
					}
					else( r.error == 1 )
					{
						$html.find(".ciads_ajax_content").val("");
						alert("您已经评论过了哦。");
						return false;
					}
				}				
			});
		}
		else
		{
			alert("评论不能为空哦！");
			$(".ciads_message").focus();
			return false;
		}
	});
	$html.find(".ciads_ajax_info").html($info);
	$html.css({"left":$this.offset().left-242,"top":$this.offset().top+$this.height()+40,"opacity":"0"});
	$("body").append($html);
	$html.stop().animate({"opacity":"1"},500);
}


function member(){
	$("a[href*='member.html']").live("click",function(){
		$(".ciads_ajax_member").remove();
		var html='<div class="ciads_ajax_member ciads_ajax_box"><a href="#1" class="ciads_ajax_box_close">✕</a><h2><img src="/theme/bg/13.jpg" alt="" /></h2><ul class="u1 ciads_ajax_input"><li><input type="text" value="请输入您姓名" data-value="请输入您姓名" class="ciads_ajax_input_name begin" /></li><li><input type="text" value="请输入您QQ号码" data-value="请输入您QQ号码" class="ciads_ajax_input_qq begin" /></li><li><input type="text" value="请输入您的电话号码" data-value="请输入您的电话号码" class="ciads_ajax_input_tel begin" /><input type="hidden" value="5" class="ciads_ajax_input_type" /></li></ul><p class="p1"><input type="button" value="提交信息" class="ciads_ajax_input_submit" data-ok="注册成功！" data-error="您已经注册过了，无需重复注册！" /><span class="ciads_ajax_input_load">正在努力提交中...</span></p><p class="p2"><img src="theme/bg/14.jpg" alt="" /></p></div>';
		$("body").append($(html));
		$(".ciads_ajax_member").css({"left":($(window).width()-420)/2,"top":$(document).scrollTop()+($(window).height()-435)/2,"opacity":"0"}).show().stop().animate({"opacity":"1"},500);
		return false;
	});
}

function foot()
{
	if( $(".c_foot").length>0 )
	{
		$(window).scroll(foots);
	}
}

function foots(){
	var winH=parseInt($(window).height());
	var docT=parseInt($(document).scrollTop());
	var fT=parseInt($(".c_foot").offset().top);
	if( (winH+docT)-(winH/2)>=fT )
	{
		$(".fmenu li").each(function(i){
			$(this).stop().animate({"opacity":1,"top":0,"left":0},500*i);	
		});
		setTimeout(function(){
			$(".c_phone li").each(function(i){
				$(this).stop().animate({"top":0},500*(i+1));
			});
		},1500);
		
		setTimeout(function(){
			$(".z_copy").each(function(i){
				$(this).stop().animate({"top":0},500*(i+2));
			});
		},2000);
		
		$(window).unbind("scroll",foots);
	}
}

function photo2()
{
	if( $(".h_sds").length>0 )
	{
		$(window).scroll(photo);
	}
}

function photo(){
	var winH=parseInt($(window).height());
	var docT=parseInt($(document).scrollTop());
	var fT=parseInt($(".h_sds").offset().top);
	if( (winH+docT)-(winH/2)>=fT )
	{

		$(".h_sds p i").each(function(i){
			var numid=$(this).attr("rel");	
			var	numid2=(numid)*(-175);	
									
			var num=0;								
			$(this).stop().animate({"background-position":"0 "+numid2+""},100*i);	
			
		});
		
		
		
		$(window).unbind("scroll",photo);
	}
}


function fRandomBy(under, over){
    switch(arguments.length){
        case 1: return parseInt(Math.random()*under+1);
        case 2: return parseInt(Math.random()*(over-under+1) + under); 
        default: return 0;
    }
}