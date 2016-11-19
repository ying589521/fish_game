function init(){
	var oC = document.getElementById('c1');
	var gd = oC.getContext('2d');
	loadImage(sources,function(aResult){
		//游戏代码
		//炮台
		var bottom = new Sprite(aResult.bottom);
		bottom.w = 765;
		bottom.h = 71;
		bottom.x = oC.width/2;
		bottom.y = oC.height-bottom.h/2;
		
		var cannon = new Cannon(aResult,1);
		cannon.x = bottom.x+cannon.w/2+5;
		cannon.y = bottom.y;
		
		//存鱼
		var aFish = [];
		setInterval(function(){
			var fish = new Fish(aResult,rnd(1,6));
			fish.x = -50;
			fish.y = rnd(0,oC.height);
			fish.r = rnd(45,135);
			aFish.push(fish);
		},500);
		
		//鼠标在canvas中移动改变cannon的r
		oC.onmousemove = function(ev){
			var a = ev.pageX-oC.offsetLeft-cannon.x;
			var b = cannon.y-(ev.pageY-oC.offsetTop);
			
			cannon.r = a2d(Math.atan2(a,b));
		};
		//存炮弹
		var aBullet = [];
		
		//点击canvas开炮
		oC.onclick = function(){
			var oA = new Audio();
			oA.src = 'mp3/gunShot.mp3';
			oA.play();
			
			var bullet = new Bullet(aResult.bullet,cannon.type);
			bullet.x = cannon.x;
			bullet.y = cannon.y;
			bullet.r = cannon.r;
			aBullet.push(bullet);
		};
		
					
		//存死鱼
		var aDieFish = [];

		setInterval(function(){
			gd.clearRect(0,0,oC.width,oC.height);
			bottom.draw(gd);
			
			
			//画鱼
			for(var i=0;i<aFish.length;i++){
				aFish[i].move();
				aFish[i].draw(gd);
			}//画炮弹
			for(var i=0;i<aBullet.length;i++){
				aBullet[i].move();
				aBullet[i].draw(gd);
			}
			
			
			//检测炮弹是否出去了。
			for(var i=0;i<aBullet.length;i++){
				if(aBullet[i].x<-100||aBullet[i].x>oC.width+100||aBullet[i].y<-100||aBullet[i].y>oC.height+100){
					aBullet.splice(i,1);
					i--;
				}
			}
			
			//检测鱼是否出去了。
			for(var i=0;i<aFish.length;i++){
				if(aFish[i].x<-100||aFish[i].x>oC.width+100||aFish[i].y<-100||aFish[i].y>oC.height+100){
					aFish.splice(i,1);
					i--;
				}
			}
			for(var i=0;i<aDieFish.length;i++){
				aDieFish[i].draw(gd);
			}
			
			//鱼和炮弹的碰撞检测
			for(var i=0;i<aFish.length;i++){
				for(var j=0;j<aBullet.length;j++){
					if(aBullet[j].collTest(aFish[i])){
						aBullet.splice(j,1);
						var dieFish = new DieFish(aResult,aFish[i].type);
						dieFish.x = aFish[i].x;
						dieFish.y = aFish[i].y;
						dieFish.r = aFish[i].r;
						aDieFish.push(dieFish);
						aFish.splice(i,1);
						j--;
						i--;
					}
				}
			}
			cannon.draw(gd);
		},30);
		
		//鱼游动\鱼去死
		setInterval(function(){
			for(var i=0;i<aFish.length;i++){
				aFish[i].swim();
			}
			for(var i=0;i<aDieFish.length;i++){
				aDieFish[i].goDie();
				if(aDieFish[i].status==1){
					aDieFish.splice(i,1);
					i--;
				}
			}
		},150);
		
	});
}