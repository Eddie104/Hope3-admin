webpackJsonp([29],{1171:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.removeGoods=t.update=t.detail=void 0;var n=a(187),o=r(n),u=a(308),s=r(u),d=(t.detail=function(){var e=(0,s.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.post)(c.SERVER_URL+"/admin/detail_goods_color",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.update=function(){var e=(0,s.default)(o.default.mark(function e(t){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.post)(c.SERVER_URL+"/admin/update_goods_color",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.removeGoods=function(){var e=(0,s.default)(o.default.mark(function e(t,a){return o.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,d.get)(c.SERVER_URL+"/admin/remove_goods/"+t+"/"+a));case 1:case"end":return e.stop()}},e,this)}));return function(t,a){return e.apply(this,arguments)}}(),a(309)),c=a(190)},743:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(305),o=r(n),u=a(16),s=r(u),d=a(187),c=r(d),l=a(311),i=r(l);a(312);var f=a(1171);t.default={namespace:"goodsColor",state:{detail:null,goodsListData:{list:[],pagination:{total:0,current:0}}},effects:{detail:c.default.mark(function e(t,a){var r,n=t.payload,o=t.callback,u=a.call,s=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(f.detail,n);case 2:if(r=e.sent,!r.success){e.next=9;break}return e.next=6,s({type:"setDetail",payload:r.data});case 6:o&&o(),e.next=10;break;case 9:i.default.error(r.data);case 10:case"end":return e.stop()}},e,this)}),update:c.default.mark(function e(t,a){var r,n=t.payload,o=t.callback,u=a.call;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(f.update,n);case 2:r=e.sent,r.success&&(i.default.success("\u4fdd\u5b58\u6210\u529f"),o&&o());case 4:case"end":return e.stop()}},e,this)}),clearDetail:c.default.mark(function e(t,a){var r=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r({type:"setDetail",payload:null});case 2:case"end":return e.stop()}},e,this)}),removeGoods:c.default.mark(function e(t,a){var r,n=t.payload,o=t.callback,u=a.call,s=a.put;return c.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(f.removeGoods,n._id,n.goods_id);case 2:if(r=e.sent,!r.success){e.next=10;break}return e.next=6,s({type:"rmeoveGoodsById",payload:n.goods_id});case 6:o&&o(),i.default.success("\u5220\u9664\u6210\u529f"),e.next=11;break;case 10:i.default.error(r.data);case 11:case"end":return e.stop()}},e,this)})},reducers:{setDetail:function(e,t){var a=t.payload;return a?(console.log(a),(0,s.default)({},e,{detail:a.goodsColor,goodsListData:a.goodsArr})):(0,s.default)({},e,{detail:null,goodsListData:{list:[],pagination:{total:0,current:0}}})},rmeoveGoodsById:function(e,t){for(var a=t.payload,r=[].concat((0,o.default)(e.goodsListData.list)),n=0;n<r.length;n++)r[n]._id===a&&r.splice(n,1);return(0,s.default)({},e,{goodsListData:{list:r,pagination:(0,s.default)({},e.goodsListData.pagination)}})}}},e.exports=t.default}});