webpackJsonp([44],{1293:function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.findNoColor=e.updateGoodsTypeChecked=e.updateGoodsType=e.updateColor=e.fetchGoodsType=e.fetchGoodsTypeColor=e.update=e.detail=e.find=void 0;var a=r(120),u=n(a),o=r(295),d=n(o),s=(e.find=function(){var t=(0,d.default)(u.default.mark(function t(e){return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,s.post)(c.SERVER_URL+"/admin/find_goods",e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.detail=function(){var t=(0,d.default)(u.default.mark(function t(e){return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,s.get)(c.SERVER_URL+"/admin/detail_goods/"+e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.update=function(){var t=(0,d.default)(u.default.mark(function t(e){return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,s.post)(c.SERVER_URL+"/admin/update_goods",e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.fetchGoodsTypeColor=function(){var t=(0,d.default)(u.default.mark(function t(e){return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,s.get)(c.SERVER_URL+"/admin/fetch_goods_type_color/"+e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.fetchGoodsType=function(){var t=(0,d.default)(u.default.mark(function t(e){return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,s.post)(c.SERVER_URL+"/admin/fetch_goods_type",e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.updateColor=function(){var t=(0,d.default)(u.default.mark(function t(e){var r=e.goodsId,n=e.goodsColor,a=e.colorId;return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,s.get)(c.SERVER_URL+"/admin/update_goods_color/"+r+"/"+n+"/"+a));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.updateGoodsType=function(){var t=(0,d.default)(u.default.mark(function t(e){var r=e.goodsId,n=e.goodsType;return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,s.get)(c.SERVER_URL+"/admin/update_goods_type/"+r+"/"+n));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.updateGoodsTypeChecked=function(){var t=(0,d.default)(u.default.mark(function t(e){return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,s.get)(c.SERVER_URL+"/admin/update_goods_type_checked/"+e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.findNoColor=function(){var t=(0,d.default)(u.default.mark(function t(e){return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,s.post)(c.SERVER_URL+"/admin/find_no_color_goods",e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),r(296)),c=r(183)},1295:function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.update=e.detail=e.find=void 0;var a=r(120),u=n(a),o=r(295),d=n(o),s=(e.find=function(){var t=(0,d.default)(u.default.mark(function t(e){return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,s.post)(c.SERVER_URL+"/admin/find_shop",e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.detail=function(){var t=(0,d.default)(u.default.mark(function t(e){return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,s.get)(c.SERVER_URL+"/admin/detail_shop/"+e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.update=function(){var t=(0,d.default)(u.default.mark(function t(e){return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,s.post)(c.SERVER_URL+"/admin/update_shop",e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),r(296)),c=r(183)},708:function(t,e,r){"use strict";function n(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var a=r(11),u=n(a),o=r(291),d=n(o),s=r(120),c=n(s);r(292);var i=(r(180),r(1295)),f=r(1293);e.default={namespace:"shop",state:{loading:!1,findFormValue:{name:null},listData:{list:[],pagination:{total:0,current:0}},detail:{},goodsListData:{list:[],pagination:{total:0,current:0}}},effects:{find:c.default.mark(function t(e,r){var n,a=e.payload,u=r.call,o=r.put;return c.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,o({type:"changeStyleListLoading",payload:!0});case 2:return t.next=4,o({type:"createFindFormValue",payload:{name:a.name}});case 4:if(!a.resetFormValue){t.next=7;break}return t.next=7,o({type:"resetedFormValue"});case 7:return t.next=9,u(i.find,a);case 9:if(n=t.sent,!n.success){t.next=13;break}return t.next=13,o({type:"finded",payload:n.data});case 13:return t.next=15,o({type:"changeStyleListLoading",payload:!1});case 15:case"end":return t.stop()}},t,this)}),detail:c.default.mark(function t(e,r){var n,a=e.payload,u=r.call,o=r.put;return c.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u(i.detail,a);case 2:if(n=t.sent,!n.success){t.next=8;break}return t.next=6,o({type:"fetchDetail",payload:n.data});case 6:t.next=9;break;case 8:d.default.error(n.data);case 9:case"end":return t.stop()}},t,this)}),update:c.default.mark(function t(e,r){var n,a=e.payload,u=r.call;return c.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u(i.update,a);case 2:n=t.sent,n.success&&d.default.success("\u4fdd\u5b58\u6210\u529f");case 4:case"end":return t.stop()}},t,this)}),clearDetail:c.default.mark(function t(e,r){var n=r.put;return c.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n({type:"clearedDetail"});case 2:case"end":return t.stop()}},t,this)}),findGoods:c.default.mark(function t(e,r){var n,a=e.payload,u=r.call,o=r.put;return c.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u(f.find,a);case 2:if(n=t.sent,!n.success){t.next=6;break}return t.next=6,o({type:"findedGoods",payload:n.data});case 6:case"end":return t.stop()}},t,this)})},reducers:{changeStyleListLoading:function(t,e){var r=e.payload;return(0,u.default)({},t,{loading:r})},createFindFormValue:function(t,e){var r=e.payload;return(0,u.default)({},t,{findFormValue:(0,u.default)({},r)})},finded:function(t,e){var r=e.payload;return(0,u.default)({},t,{listData:(0,u.default)({},r)})},resetedFormValue:function(t){return(0,u.default)({},t,{findFormValue:{name:null}})},fetchDetail:function(t,e){var r=e.payload;return(0,u.default)({},t,{detail:r})},clearedDetail:function(t){return(0,u.default)({},t,{detail:{}})},findedGoods:function(t,e){var r=e.payload;return(0,u.default)({},t,{goodsListData:(0,u.default)({},r)})}}},t.exports=e.default}});