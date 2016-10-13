var GAME = (function(g,cjs){
	var stage,
		main,
		loader;
	g.init = function(){
		stage = INIT.stage;
		loader = INIT.loader;
		main = new cjs.Container();
		stage.addChild(main);
		g.start();
	}
	g.start = function(){
		var indexBg = new cjs.Bitmap(loader.getResult('indexBg')),
			txt = new createjs.Text("基于createjs的初始化文件","bold 40px Microsoft YaHei","#ffffff");
		txt.lineWidth = 640;
		txt.textAlign = "center";
		txt.x = 320;
		txt.y = 500;
		main.addChild(indexBg,txt);
	}
	g.onProgress = function(p){
		document.getElementById("loading").innerHTML = (p/1*100) + "%";
		console.log("加载中……" + p);
	}
	g.onComplete = function(){
		console.log("加载完毕！");
		$(".loading").hide();
		g.init();//初始化游戏
	}
	return g;
})(window.GAME || {},createjs);
