export default {
  setCookie(c_name, value, expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie=c_name+ '=' + escape(value) + ((expiredays==null) ? '' : ';expires='+exdate.toGMTString())
  },
  getCookie(c_name,defaultValue = ''){
    if (document.cookie.length>0){//先查询cookie是否为空，为空就return ""
      let c_start=document.cookie.indexOf(c_name + '=')//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1
      if (c_start!=-1){ 
        c_start=c_start + c_name.length+1//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
        let c_end=document.cookie.indexOf(';',c_start)//其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
        if (c_end==-1) c_end=document.cookie.length
        return unescape(document.cookie.substring(c_start,c_end))//通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
      }
    }
    return defaultValue
  }
}