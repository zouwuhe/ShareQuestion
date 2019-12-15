function(e,s,r,gg){
var z=gz$gwx_18()
var tAT=_mz(z,'view',['catchmove',0,'style',1],[],e,s,gg)
var eBT=_mz(z,'image',['mode',2,'src',1,'style',2],[],e,s,gg)
_(tAT,eBT)
_(r,tAT)
var bCT=_mz(z,'scroll-view',['class',5,'scrollY',1],[],e,s,gg)
var oDT=_n('view')
_rz(z,oDT,'style',7,e,s,gg)
var xET=_v()
_(oDT,xET)
var oFT=function(cHT,fGT,hIT,gg){
var cKT=_n('view')
_rz(z,cKT,'class',9,cHT,fGT,gg)
var oLT=_mz(z,'view',['bindtap',10,'class',1,'data-idx',2,'id',3],[],cHT,fGT,gg)
var lMT=_oz(z,14,cHT,fGT,gg)
_(oLT,lMT)
_(cKT,oLT)
var aNT=_n('view')
_rz(z,aNT,'class',15,cHT,fGT,gg)
var tOT=_n('view')
_rz(z,tOT,'class',16,cHT,fGT,gg)
var ePT=_oz(z,17,cHT,fGT,gg)
_(tOT,ePT)
_(aNT,tOT)
var bQT=_n('view')
_rz(z,bQT,'class',18,cHT,fGT,gg)
var oRT=_v()
_(bQT,oRT)
if(_oz(z,19,cHT,fGT,gg)){oRT.wxVkey=1
var xST=_mz(z,'radio-group',['bindchange',20,'data-idx',1],[],cHT,fGT,gg)
var oTT=_v()
_(xST,oTT)
var fUT=function(hWT,cVT,oXT,gg){
var oZT=_n('label')
_rz(z,oZT,'class',25,hWT,cVT,gg)
var l1T=_mz(z,'radio',['checked',26,'style',1,'value',2],[],hWT,cVT,gg)
_(oZT,l1T)
var a2T=_mz(z,'view',['class',29,'style',1],[],hWT,cVT,gg)
var t3T=_oz(z,31,hWT,cVT,gg)
_(a2T,t3T)
_(oZT,a2T)
_(oXT,oZT)
return oXT
}
oTT.wxXCkey=2
_2z(z,24,fUT,cHT,fGT,gg,oTT,'label','idx','')
_(oRT,xST)
}
else{oRT.wxVkey=2
var e4T=_n('view')
var b5T=_v()
_(e4T,b5T)
if(_oz(z,32,cHT,fGT,gg)){b5T.wxVkey=1
var o6T=_n('view')
_rz(z,o6T,'class',33,cHT,fGT,gg)
var x7T=_oz(z,34,cHT,fGT,gg)
_(o6T,x7T)
_(b5T,o6T)
}
else{b5T.wxVkey=2
var o8T=_n('view')
_rz(z,o8T,'class',35,cHT,fGT,gg)
var f9T=_oz(z,36,cHT,fGT,gg)
_(o8T,f9T)
_(b5T,o8T)
}
var c0T=_mz(z,'view',['bindtap',37,'class',1,'data-idx',2,'data-item',3],[],cHT,fGT,gg)
var hAU=_oz(z,41,cHT,fGT,gg)
_(c0T,hAU)
_(e4T,c0T)
b5T.wxXCkey=1
_(oRT,e4T)
}
oRT.wxXCkey=1
_(aNT,bQT)
_(cKT,aNT)
_(hIT,cKT)
return hIT
}
xET.wxXCkey=2
_2z(z,8,oFT,e,s,gg,xET,'item','index','')
_(bCT,oDT)
var oBU=_mz(z,'button',['bindtap',42,'class',1,'id',2],[],e,s,gg)
var cCU=_n('image')
_rz(z,cCU,'src',45,e,s,gg)
_(oBU,cCU)
var oDU=_oz(z,46,e,s,gg)
_(oBU,oDU)
_(bCT,oBU)
_(r,bCT)
var lEU=_mz(z,'qa-picker',['bindconfirm',47,'qaItem',1,'showChecker',2],[],e,s,gg)
_(r,lEU)
return r
}