webpackJsonp([29],{1171:function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0}),e.update=e.detail=void 0;var n=a(187),u=r(n),s=a(308),o=r(s),l=(e.detail=function(){var t=(0,o.default)(u.default.mark(function t(e){return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,l.post)(c.SERVER_URL+"/admin/detail_goods_color",e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),e.update=function(){var t=(0,o.default)(u.default.mark(function t(e){return u.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",(0,l.post)(c.SERVER_URL+"/admin/update_goods_color",e));case 1:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}(),a(309)),c=a(190)},743:function(t,e,a){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var n=a(16),u=r(n),s=a(187),o=r(s),l=a(311),c=r(l);a(312);var d=a(1171);e.default={namespace:"goodsColor",state:{detail:null,goodsListData:{list:[],pagination:{total:0,current:0}}},effects:{detail:o.default.mark(function t(e,a){var r,n=e.payload,u=e.callback,s=a.call,l=a.put;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s(d.detail,n);case 2:if(r=t.sent,!r.success){t.next=9;break}return t.next=6,l({type:"setDetail",payload:r.data});case 6:u&&u(),t.next=10;break;case 9:c.default.error(r.data);case 10:case"end":return t.stop()}},t,this)}),update:o.default.mark(function t(e,a){var r,n=e.payload,u=e.callback,s=a.call;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,s(d.update,n);case 2:r=t.sent,r.success&&(c.default.success("\u4fdd\u5b58\u6210\u529f"),u&&u());case 4:case"end":return t.stop()}},t,this)}),clearDetail:o.default.mark(function t(e,a){var r=a.put;return o.default.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r({type:"setDetail",payload:null});case 2:case"end":return t.stop()}},t,this)})},reducers:{setDetail:function(t,e){var a=e.payload;return a?(console.log(a),(0,u.default)({},t,{detail:a.goodsColor,goodsListData:a.goodsArr})):(0,u.default)({},t,{detail:null,goodsListData:{list:[],pagination:{total:0,current:0}}})}}},t.exports=e.default}});