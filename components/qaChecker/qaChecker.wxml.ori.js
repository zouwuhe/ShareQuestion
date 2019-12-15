function(e,s,r,gg){
var z=gz$gwx_3()
var b3=_mz(z,'view',['catchmove',0,'style',1],[],e,s,gg)
var o4=_mz(z,'image',['mode',2,'src',1,'style',2],[],e,s,gg)
_(b3,o4)
_(r,b3)
var x5=_mz(z,'scroll-view',['class',5,'scrollY',1],[],e,s,gg)
var o6=_n('view')
_rz(z,o6,'style',7,e,s,gg)
var f7=_v()
_(o6,f7)
var c8=function(o0,h9,cAB,gg){
var lCB=_n('view')
_rz(z,lCB,'class',10,o0,h9,gg)
var aDB=_mz(z,'view',['bindtap',11,'class',1,'data-idx',2],[],o0,h9,gg)
var tEB=_oz(z,14,o0,h9,gg)
_(aDB,tEB)
_(lCB,aDB)
var eFB=_n('view')
_rz(z,eFB,'class',15,o0,h9,gg)
var bGB=_n('view')
_rz(z,bGB,'class',16,o0,h9,gg)
var oHB=_oz(z,17,o0,h9,gg)
_(bGB,oHB)
_(eFB,bGB)
var xIB=_n('view')
_rz(z,xIB,'class',18,o0,h9,gg)
var oJB=_v()
_(xIB,oJB)
if(_oz(z,19,o0,h9,gg)){oJB.wxVkey=1
var fKB=_mz(z,'radio-group',['bindchange',20,'data-idx',1],[],o0,h9,gg)
var cLB=_v()
_(fKB,cLB)
var hMB=function(cOB,oNB,oPB,gg){
var aRB=_n('label')
_rz(z,aRB,'class',25,cOB,oNB,gg)
var tSB=_mz(z,'radio',['checked',26,'style',1,'value',2],[],cOB,oNB,gg)
_(aRB,tSB)
var eTB=_mz(z,'view',['class',29,'style',1],[],cOB,oNB,gg)
var bUB=_oz(z,31,cOB,oNB,gg)
_(eTB,bUB)
_(aRB,eTB)
_(oPB,aRB)
return oPB
}
cLB.wxXCkey=2
_2z(z,24,hMB,o0,h9,gg,cLB,'label','idx','')
_(oJB,fKB)
}
else{oJB.wxVkey=2
var oVB=_n('view')
var xWB=_v()
_(oVB,xWB)
if(_oz(z,32,o0,h9,gg)){xWB.wxVkey=1
var oXB=_n('view')
_rz(z,oXB,'class',33,o0,h9,gg)
var fYB=_oz(z,34,o0,h9,gg)
_(oXB,fYB)
_(xWB,oXB)
}
else{xWB.wxVkey=2
var cZB=_n('view')
_rz(z,cZB,'class',35,o0,h9,gg)
var h1B=_oz(z,36,o0,h9,gg)
_(cZB,h1B)
_(xWB,cZB)
}
var o2B=_mz(z,'view',['bindtap',37,'class',1,'data-idx',2,'data-item',3],[],o0,h9,gg)
var c3B=_oz(z,41,o0,h9,gg)
_(o2B,c3B)
_(oVB,o2B)
xWB.wxXCkey=1
_(oJB,oVB)
}
oJB.wxXCkey=1
_(eFB,xIB)
_(lCB,eFB)
_(cAB,lCB)
return cAB
}
f7.wxXCkey=2
_2z(z,8,c8,e,s,gg,f7,'item','index','{{index}}')
_(x5,o6)
_(r,x5)
var o4B=_mz(z,'button',['bindtap',42,'class',1],[],e,s,gg)
var l5B=_n('image')
_rz(z,l5B,'src',44,e,s,gg)
_(o4B,l5B)
var a6B=_oz(z,45,e,s,gg)
_(o4B,a6B)
_(r,o4B)
var t7B=_mz(z,'qa-picker',['bindconfirm',46,'qaItem',1,'showChecker',2],[],e,s,gg)
_(r,t7B)
return r
}