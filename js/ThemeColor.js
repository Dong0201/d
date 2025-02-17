class ThemeColor{
// 原图资源
imgUrl = '';
// 像素集合
originalPiexls = null;
// 主色
themeColor = 'white';
// 回调
themeColorCallBack = null;
// 提取像素出现最大次数操作对象
colorCountedSet = new ColorCountedSet();
constructor(imgUrl,callBack){
this.imgUrl = imgUrl;
this.themeColorCallBack = callBack;
this.startScreeningThemeColor();
}
// 开始解析主色
async startScreeningThemeColor(){
try {
await this.shrinkImage();
}catch (error) {
 console.log('error:' + error);
 }
this.screeningThemeColor();
}
// 图片缩小
async shrinkImage(){
var image = new Image();
image.src = this.imgUrl;
await new Promise((resolve)=>{
image.onload = resolve;
});
let width = image.width;
let height = image.height;
let shrinkFactor = 10;
let shrinkWidth = width / shrinkFactor;
let shrinkHeight = height / shrinkFactor;
let canvas = document.createElement('canvas');
canvas.setAttribute('width',`${shrinkWidth}px`);
canvas.setAttribute('height',`${shrinkHeight}px`);
var ctx = canvas.getContext("2d");
ctx.drawImage(image,0,0,shrinkWidth,shrinkHeight);
try {//保存像素
this.originalPiexls = ctx.getImageData(0,0,width,height);
 } catch (error) {
 
 }
}
// 开始筛选主题色
screeningThemeColor(){
if(!this.originalPiexls || !this.originalPiexls.data || this.originalPiexls.data.length == 0){
 throw('像素为空');
}
for(let i = 0;i < this.originalPiexls.data.length;i+=4){
let r = this.originalPiexls.data[i];
let g = this.originalPiexls.data[i + 1];
let b = this.originalPiexls.data[i + 2];
//添加一个色值范围，让它能忽略一定无效的像素值
if((r < 200 && g < 200 && b < 200) && (r > 0 && g > 0 && b > 0)){
this.colorCountedSet.push(r,g,b)
  }
 }
let maxCount = 0;
// 寻找出现次数最多的像素定为主色调
this.colorCountedSet.forEach((value,key)=>{
if(maxCount <= value){
maxCount = value;
this.themeColor = 'rgb(' + key + ')';
}
});
//执行回
if(this.themeColorCallBack){
this.themeColorCallBack(this.themeColor);
  }
 }
}
// 统计不同像素的出现次数
class ColorCountedSet{
//像素集合
map = new Map();
//添加像素到集合
push(r,g,b){
//根据像素值生成一个map 元素 key值
let identification = r + ',' + g + ',' + b ;
if(!this.map.get(identification)){
this.map.set(identification,1);
} else {
// 存在进行次数自增
let times = parseInt(this.map.get(identification)) + 1;
this.map.set(identification,times);
 }
}
// 给 ColorCountedSet 操作类添加一个 forEach 方法 
forEach(cb){
this.map.forEach(function(value,key){
cb(value,key);
  });
 }
}