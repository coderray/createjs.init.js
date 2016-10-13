// 2016.7.25
// xck
var loading = (function(c){
	var loadType = [
		{'type':'ball-pulse','nodes':3},
		{'type':'ball-grid-pulse','nodes':9},
		{'type':'ball-clip-rotate','nodes':1},
		{'type':'ball-clip-rotate-pulse','nodes':2},
		{'type':'square-spin','nodes':1},
		{'type':'ball-clip-rotate-multiple','nodes':2},
		{'type':'ball-pulse-rise','nodes':5},
		{'type':'ball-rotate','nodes':1},
		{'type':'cube-transition','nodes':2},
		{'type':'ball-zig-zag','nodes':2},
		{'type':'ball-zig-zag-deflect','nodes':2},
		{'type':'ball-triangle-path','nodes':3},
		{'type':'ball-scale','nodes':1},
		{'type':'line-scale','nodes':5},
		{'type':'line-scale-party','nodes':4},
		{'type':'ball-scale-multiple','nodes':3},
		{'type':'ball-pulse-sync','nodes':3},
		{'type':'ball-beat','nodes':3},
		{'type':'line-scale-pulse-out','nodes':5},
		{'type':'line-scale-pulse-out-rapid','nodes':5},
		{'type':'ball-scale-ripple','nodes':1},
		{'type':'ball-scale-ripple-multiple','nodes':3},
		{'type':'ball-spin-fade-loader','nodes':8},
		{'type':'line-spin-fade-loader','nodes':8},
		{'type':'triangle-skew-spin','nodes':1},
		{'type':'pacman','nodes':5},
		{'type':'ball-grid-beat','nodes':9},
		{'type':'semi-circle-spin','nodes':1}
	];
	c.create = function(config){
		var loading_dom = document.getElementById(config.parsents)?document.getElementById(config.parsents):document.createElement("div");
		var str = '';
		var type,index;
		if(config.type != undefined && config.type < 28){
			type = loadType[ config.type ].type;
			index = config.type;
		}else{
			type = loadType[22].type;
			index = 22;
		}
		with(loading_dom){
	        addEventListener('touchstart',function(e){
	             e.preventDefault();
	         });
	            addEventListener('touchmove',function(e){
	             e.preventDefault();
	         });
	            addEventListener('touchend',function(e){
	             e.preventDefault();
	         });
	    }
		loading_dom.className = "loading";
		for (var i = 0;i < loadType[ index ].nodes;i++) {
			str += '<div></div>';
		}
		loading_dom.innerHTML = '<div class="loader">' + 
							        '<div class="loader-inner '+type+'">' +
							          str +
							      	'</div>' + 
						        '</div>'+
								'<p class="progress">'+
									'<span id="pro">0</span><span>%</span>'+
								'</p>';
		
		var first=document.body.firstChild; //得到第一个元素
		document.body.insertBefore(loading_dom,first);
		config.callback && config.callback.call(this);
	}
	return c;
})(window.loading || {})
//'type'根据你要的load类型选择相应的下标(0~27,默认为22) 参考loading类型(下标从左到右由上往下)：http://demo.lanrenzhijia.com/2015/load0409/;
//'callback'是回调函数
loading.create({'type':22,"callback":function(){}});
$(function(){
	FastClick.attach(document.body);
	//获取URL指定参数的值
	function checkPar(str){
		var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)", "i"); 
		var par = window.location.search.substr(1).match(reg); 
		var str = par ? par[2] : false;
		return str;
	}
	//loading
	var pro = $('.loading').find('#pro');
	if(preLoadSource){
		sourceArr=preLoadSource;
		new mo.Loader(sourceArr,{
			loadType : 0,
			minTime : 300,
			onLoading : function(count,total){
				var r = Math.round(count/total*100);
				pro.text(r);
			},
			onComplete : function(time){
				setTimeout(function(){
					$('.loading').remove();
					$('.wrap').css('visibility','visible');
					delete mo.Loader;
					preLoadSource='';
					if(checkPar("rank") == "rank"){
						console.log("输出rank参数值");
					}
				},300)
			}
		});
	}
})

