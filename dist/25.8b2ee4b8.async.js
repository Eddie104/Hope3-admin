webpackJsonp([25],{1139:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.fetchSubCategory=t.update=t.detail=t.find=t.add=void 0;var n=r(182),u=a(n),o=r(302),c=a(o),s=(t.add=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.post)(d.SERVER_URL+"/api/admin/add_category",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.find=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.post)(d.SERVER_URL+"/api/admin/find_category",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.detail=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.get)(d.SERVER_URL+"/api/admin/detail_category/"+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.update=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.post)(d.SERVER_URL+"/api/admin/update_category",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.fetchSubCategory=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.get)(d.SERVER_URL+"/api/admin/fetch_sub_category/"+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r(303)),d=r(185)},1140:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.removeGoodsColor=t.mergeGoodsColor=t.merge=t.fetchSubCategory=t.update=t.detail=t.find=void 0;var n=r(182),u=a(n),o=r(302),c=a(o),s=(t.find=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.post)(d.SERVER_URL+"/api/admin/find_goods_type",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.detail=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.get)(d.SERVER_URL+"/api/admin/detail_goods_type/"+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.update=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.post)(d.SERVER_URL+"/api/admin/update_goods_type",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.fetchSubCategory=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.get)(d.SERVER_URL+"/api/admin/fetch_sub_category/"+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.merge=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.post)(d.SERVER_URL+"/api/admin/merge_goods_type",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.mergeGoodsColor=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.post)(d.SERVER_URL+"/api/admin/merge_goods_color",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.removeGoodsColor=function(){var e=(0,c.default)(u.default.mark(function e(t,r){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.get)(d.SERVER_URL+"/api/admin/remove_goods_color/"+t+"/"+r));case 1:case"end":return e.stop()}},e,this)}));return function(t,r){return e.apply(this,arguments)}}(),r(303)),d=r(185)},1155:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.deletePendingGoods=t.autoConnectByName=t.autoConnectByNumber=t.setCheck=t.connectGoodsType=t.addGoodsType=t.fetchBrandAndCategory=t.find=void 0;var n=r(182),u=a(n),o=r(302),c=a(o),s=(t.find=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.post)(d.SERVER_URL+"/api/admin/find_pending_goods",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.fetchBrandAndCategory=function(){var e=(0,c.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.get)(d.SERVER_URL+"/api/admin/fetch_brand_and_category"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.addGoodsType=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.post)(d.SERVER_URL+"/api/admin/add_goods_type",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.connectGoodsType=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.post)(d.SERVER_URL+"/api/admin/connect_goods_type",t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.setCheck=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.get)(d.SERVER_URL+"/api/admin/set_pending_goods_check/"+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),t.autoConnectByNumber=function(){var e=(0,c.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.get)(d.SERVER_URL+"/api/admin/auto_connect_by_number"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.autoConnectByName=function(){var e=(0,c.default)(u.default.mark(function e(){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.get)(d.SERVER_URL+"/api/admin/auto_connect_by_name"));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),t.deletePendingGoods=function(){var e=(0,c.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,s.get)(d.SERVER_URL+"/api/admin/delete_pending_goods/"+t));case 1:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),r(303)),d=r(185)},720:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(298),u=a(n),o=r(15),c=a(o),s=r(304),d=a(s),i=r(182),f=a(i);r(305);var l=r(1155),p=r(1139),y=r(1140);t.default={namespace:"pendingGoods",state:{loading:!1,findFormValue:{name:"",only_pending:!1,is_deleted:0,platform:"all"},listData:{list:[],pagination:{total:0,current:0},platform:[]},brands:[],category:[],subCategory:[]},effects:{setFormValueOnlyPending:f.default.mark(function e(t,r){var a=t.payload,n=r.put;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n({type:"createFindFormValue",payload:{only_pending:a.only_pending}});case 2:case"end":return e.stop()}},e,this)}),setFormValueIs:f.default.mark(function e(t,r){var a=t.payload,n=r.put;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n({type:"createFindFormValue",payload:{is_deleted:a.is_deleted}});case 2:case"end":return e.stop()}},e,this)}),find:f.default.mark(function e(t,r){var a,n=t.payload,u=r.call,o=r.put;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o({type:"changeStyleListLoading",payload:!0});case 2:return e.next=4,o({type:"createFindFormValue",payload:{name:n.name,only_pending:n.only_pending,is_deleted:n.is_deleted,platform:n.platform}});case 4:if(!n.resetFormValue){e.next=7;break}return e.next=7,o({type:"resetedFormValue"});case 7:return e.next=9,u(l.find,n);case 9:if(a=e.sent,!a.success){e.next=15;break}return e.next=13,o({type:"setListData",payload:a.data});case 13:e.next=16;break;case 15:d.default.error(a.data);case 16:return e.next=18,o({type:"changeStyleListLoading",payload:!1});case 18:case"end":return e.stop()}},e,this)}),fetchBrandAndCategory:f.default.mark(function e(t,r){var a,n=t.callback,u=r.call,o=r.put;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(l.fetchBrandAndCategory);case 2:if(a=e.sent,!a.success){e.next=9;break}return e.next=6,o({type:"setBrandAndCategory",payload:a.data});case 6:n&&n(),e.next=10;break;case 9:d.default.error(a.data);case 10:case"end":return e.stop()}},e,this)}),fetchSubCategory:f.default.mark(function e(t,r){var a,n=t.callback,u=t.payload,o=r.call,c=r.put;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o(p.fetchSubCategory,u);case 2:if(a=e.sent,!a.success){e.next=9;break}return e.next=6,c({type:"setSubCategory",payload:a.data});case 6:n&&n(),e.next=10;break;case 9:d.default.error(a.data);case 10:case"end":return e.stop()}},e,this)}),addGoodsType:f.default.mark(function e(t,r){var a,n=t.payload,u=t.callback,o=r.call,c=r.put;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o(l.addGoodsType,n);case 2:if(a=e.sent,!a.success){e.next=11;break}return e.next=6,o(l.setCheck,n._id);case 6:return e.next=8,c({type:"setChecked",payload:n._id});case 8:u&&u(),e.next=12;break;case 11:d.default.error(a.data);case 12:case"end":return e.stop()}},e,this)}),connectGoodsType:f.default.mark(function e(t,r){var a,n=t.payload,u=t.callback,o=r.call,c=r.put;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o(l.connectGoodsType,n);case 2:if(a=e.sent,!a.success){e.next=11;break}return e.next=6,o(l.setCheck,n._id);case 6:return e.next=8,c({type:"setChecked",payload:n._id});case 8:u&&u(),e.next=12;break;case 11:d.default.error(a.data);case 12:case"end":return e.stop()}},e,this)}),findGoodsType:f.default.mark(function e(t,r){var a,n=t.payload,u=t.callback,o=r.call;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o(y.find,n);case 2:a=e.sent,a.success?u&&u(a.data):d.default.error(a.data);case 4:case"end":return e.stop()}},e,this)}),autoConnectByNumber:f.default.mark(function e(t,r){var a,n=t.callback,u=r.call;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(l.autoConnectByNumber);case 2:a=e.sent,a.success?n&&n(a.data):d.default.error(a.data);case 4:case"end":return e.stop()}},e,this)}),autoConnectByName:f.default.mark(function e(t,r){var a,n=t.callback,u=r.call;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u(l.autoConnectByName);case 2:a=e.sent,a.success?n&&n(a.data):d.default.error(a.data);case 4:case"end":return e.stop()}},e,this)}),delete:f.default.mark(function e(t,r){var a,n=t.payload,u=t.callback,o=r.call,c=r.put;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o(l.deletePendingGoods,n);case 2:if(a=e.sent,!a.success){e.next=9;break}return e.next=6,c({type:"setDeleted",payload:n});case 6:u&&u(a.data),e.next=10;break;case 9:d.default.error(a.data);case 10:case"end":return e.stop()}},e,this)})},reducers:{changeStyleListLoading:function(e,t){var r=t.payload;return(0,c.default)({},e,{loading:r})},createFindFormValue:function(e,t){var r=t.payload;return(0,c.default)({},e,{findFormValue:(0,c.default)({},e.findFormValue,r)})},resetedFormValue:function(e){return(0,c.default)({},e,{findFormValue:{name:"",only_pending:!1,platform:"all"}})},setListData:function(e,t){var r=t.payload;return(0,c.default)({},e,{listData:(0,c.default)({},r)})},setBrandAndCategory:function(e,t){var r=t.payload;return(0,c.default)({},e,r)},setSubCategory:function(e,t){var r=t.payload;return(0,c.default)({},e,{subCategory:r})},setChecked:function(e,t){for(var r=t.payload,a=[].concat((0,u.default)(e.listData.list)),n=0;n<a.length;n+=1)if(a[n]._id===r){a[n].is_checked=!0;break}return(0,c.default)({},e,{listData:(0,c.default)({},e.listData,{list:a})})},setDeleted:function(e,t){for(var r=t.payload,a=[].concat((0,u.default)(e.listData.list)),n=0;n<a.length;n+=1)if(a[n]._id===r){a[n].is_deleted=!0;break}return(0,c.default)({},e,{listData:(0,c.default)({},e.listData,{list:a})})}}},e.exports=t.default}});