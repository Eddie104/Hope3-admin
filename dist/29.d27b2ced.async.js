webpackJsonp([29],{1162:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.add=t.update=t.detail=t.find=void 0;var n=a(182),u=r(n),s=a(302),d=r(s),c=(t.find=function(){var e=(0,d.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,c.post)(i.SERVER_URL+"/api/admin/find_platform",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.detail=function(){var e=(0,d.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,c.get)(i.SERVER_URL+"/api/admin/detail_platform/"+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.update=function(){var e=(0,d.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,c.post)(i.SERVER_URL+"/api/admin/update_platform",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.add=function(){var e=(0,d.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,c.post)(i.SERVER_URL+"/api/admin/add_platform",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),a(303)),i=a(183)},721:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(15),u=r(n),s=a(306),d=r(s),c=a(182),i=r(c);a(307);var l=a(1162);t.default={namespace:"platform",state:{loading:!1,findFormValue:{name:null},listData:{list:[],pagination:{total:0,current:0}},detail:{}},effects:{find:i.default.mark(function e(t,a){var r,n=t.payload,u=a.call,s=a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({type:"changeStyleListLoading",payload:!0});case 2:return e.next=4,s({type:"createFindFormValue",payload:{name:n.name}});case 4:if(!n.resetFormValue){e.next=7;break}return e.next=7,s({type:"resetedFormValue"});case 7:return e.next=9,u(l.find,n);case 9:if(r=e.sent,!r.success){e.next=13;break}return e.next=13,s({type:"setListData",payload:r.data});case 13:return e.next=15,s({type:"changeStyleListLoading",payload:!1});case 15:case"end":return e.stop()}},e,this)}),detail:i.default.mark(function e(t,a){var r,n=t.payload,u=a.call,s=a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(l.detail,n);case 2:if(r=e.sent,!r.success){e.next=8;break}return e.next=6,s({type:"setDetail",payload:r.data});case 6:e.next=9;break;case 8:d.default.error(r.data);case 9:case"end":return e.stop()}},e,this)}),clearDetail:i.default.mark(function e(t,a){var r=a.put;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r({type:"setDetail",payload:{}});case 2:case"end":return e.stop()}},e,this)}),update:i.default.mark(function e(t,a){var r,n=t.payload,u=a.call;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(l.update,n);case 2:r=e.sent,r.success&&d.default.success("\u4fdd\u5b58\u6210\u529f");case 4:case"end":return e.stop()}},e,this)}),add:i.default.mark(function e(t,a){var r,n=t.payload,u=t.callback,s=a.call;return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s(l.add,n);case 2:r=e.sent,r.success?(d.default.success("\u6dfb\u52a0\u6210\u529f"),u&&u()):d.default.error(r.data);case 4:case"end":return e.stop()}},e,this)})},reducers:{changeStyleListLoading:function(e,t){var a=t.payload;return(0,u.default)({},e,{loading:a})},createFindFormValue:function(e,t){var a=t.payload;return(0,u.default)({},e,{findFormValue:(0,u.default)({},a)})},setListData:function(e,t){var a=t.payload;return(0,u.default)({},e,{listData:(0,u.default)({},a)})},resetedFormValue:function(e){return(0,u.default)({},e,{findFormValue:{name:null}})},setDetail:function(e,t){var a=t.payload;return(0,u.default)({},e,{detail:a})}}},e.exports=t.default}});