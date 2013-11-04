/*
 Copyright 2012-2013, Polyvi Inc. (http://www.xface3.com)
 This program is distributed under the terms of the GNU General Public License.

 This file is part of xFace.

 xFace is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 xFace is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with xFace.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * 该模块定义拨打电话和操作通话记录相关的功能
 * @module telephony
 * @main telephony
 */
var argscheck = require('cordova/argscheck'),
    CallRecord = require('./CallRecord'),
    exec = require('cordova/exec');

/**
 * 提供拨打电话和操作通话记录相关的功能（Android, iOS, WP8）<br/>
 * 该类不能通过new来创建相应的对象，只能通过xFace.Telephony对象来直接使用该类中定义的方法
 * @class Telephony
 * @static
 * @platform Android, iOS, WP8
 * @since 3.0.0
 */
var Telephony = function(){
    this.onReceived = null;
};

/**
* 当收到来电的回调函数
*/
Telephony.prototype.fire = function(callStatus) {
    if (this.onReceived) {
        this.onReceived(callStatus);
    }
};

/**
* 注册一个监听器, 当手机收到来电的时候，该监听器会被回调(Android, iOS, WP8)<br/>
* @example
        xFace.Telephony.registerOnCallReceivedListener(printCallStatus);
        function printCallStatus(info){
                alert(info);
            }
*@method registerOnCallReceivedListener
*@param {Function} listener 收到来电的监听
*@param {String} listener.status 收到来电的状态内容
*@platform Android, iOS, WP8
*@since 3.0.0
*/
Telephony.prototype.registerOnCallReceivedListener = function(listener) {

    argscheck.checkArgs('f', 'Telephony.registerOnCallReceivedListener', arguments);
    this.onReceived = listener;
    exec(null, null,"Telephony", "registerOnCallReceivedListener", []);

};

/**
 * 拨打电话 (Android, iOS, WP8)
 * @example
        function call() {
            xFace.Telephony.initiateVoiceCall("114",callSuccess, callFail);
        }
        function success() {
            alert("success");
        }
        function fail() {
            alert("fail to scanner barcode" );
        }
 * @method initiateVoiceCall
 * @param {String} phoneNumber 电话号码
 * @param {Function} [successCallback] 成功回调函数
 * @param {Function} [errorCallback] 失败回调函数
 * @platform Android, iOS, WP8
 * @since 3.0.0
 */
Telephony.prototype.initiateVoiceCall = function(phoneNumber,successCallback,errorCallback){
    argscheck.checkArgs('sFF', 'xFace.Telephony.initiateVoiceCall', arguments);
    exec(successCallback, errorCallback, "Telephony", "initiateVoiceCall", [phoneNumber]);
};

/**
 * 删除指定通话记录类型的所有通话记录 (Android)
 *@example
       //删除已拨电话通话记录
       xFace.Telephony.deleteAllCallRecords(CallRecordTypes.OUTGOING,
       deleteAllCallRecordsSuccess,deleteAllCallRecordsError);
       function deleteAllCallRecordsSuccess(){
           alert("success!");
       }
       function deleteAllCallRecordsError(){
           alert("fail!");
       }
 * @method deleteAllCallRecords
 * @for Telephony
 * @param {String} callRecordType 通话记录类型,具体用法请参考相关链接{{#crossLink "CallRecordTypes"}}{{/crossLink}}
 * @param {Function} [successCallback] 成功回调函数
 * @param {Function} [errorCallback] 失败回调函数
 * @platform Android
 */
Telephony.prototype.deleteAllCallRecords = function(callRecordType,successCallback,errorCallback){
    argscheck.checkArgs('sFF', 'Telephony.deleteAllCallRecords', arguments);
    exec(successCallback, errorCallback,"Telephony", "deleteAllCallRecords", [callRecordType]);
};

/**
 * 删除指定通话记录类型和指定id的通话记录 (Android)
 * @example
        //删除拨出电话id为0的通话记录
        xFace.Telephony.deleteCallRecord(CallRecordTypes.OUTGOING,
        "0",deleteCallRecordSuccess,deleteCallRecordError);
        function deleteCallRecordSuccess(){
            alert("delete " + CallRecordTypes.OUTGOING + " 0 is success!");
        }
        function deleteCallRecordError(){
            alert("delete " + CallRecordTypes.OUTGOING + " 0 is fail!");
        }
 * @method deleteCallRecord
 * @param {String} callRecordType 通话记录类型,具体用法请参考相关链接{{#crossLink "CallRecordTypes"}}{{/crossLink}}
 * @param {String} id 通话记录的id号(不能为非数字的字符串),具体用法请参考相关链接{{#crossLink "CallRecord"}}{{/crossLink}}的callRecordId属性
 * @param {Function} [successCallback] 成功回调函数
 * @param {Function} [errorCallback] 失败回调函数
 * @platform Android
 */
Telephony.prototype.deleteCallRecord = function(callRecordType,id,successCallback,errorCallback){
    argscheck.checkArgs('ssFF', 'Telephony.deleteCallRecord', arguments);
    exec(successCallback, errorCallback,"Telephony", "deleteCallRecord", [callRecordType,id]);
};

/**
 * 获取指定通话记录类型和id的通话记录 (Android)
 * @example
        //获取已拨打电话里的第一条通话记录
        xFace.Telephony.getCallRecord(CallRecordTypes.OUTGOING,
        "1",getCallRcdSuccess,getCallRcdError);
        function getCallRcdSuccess(callRecord){
            if(null == callRecord.callRecordId){
                alert("指定id的该通话记录不存在！");
                return;
            }
            alert(callRecord.callRecordAddress);
            alert(callRecord.callRecordId);
            alert(callRecord.callRecordName);
            alert(callRecord.callRecordType);
            if(typeof callRecord.durationSeconds == undefined){
            alert(0);
            }else{
                alert(callRecord.durationSeconds);
            }
        }
        function getCallRcdError(){
            alert(CallRecordTypes.OUTGOING + " 1 " + "  getCallRecord Error");
        }
 * @method getCallRecord
 * @param {String} callRecordType 通话记录类型,具体用法请参考相关链接{{#crossLink "CallRecordTypes"}}{{/crossLink}}
 * @param {String} index 通话记录的索引(不能为非数字的字符串)
 * @param {Function} [successCallback] 成功回调函数
 * @param {CallRecord} successCallback.callRecord 指定通话记录类型和id的通话记录。具体用法请参考相关链接{{#crossLink "CallRecord"}}{{/crossLink}}
 * @param {Function} [errorCallback] 失败回调函数
 * @platform Android
 */
Telephony.prototype.getCallRecord = function(callRecordType,index,successCallback,errorCallback){
    argscheck.checkArgs('ssfF', 'Telephony.getCallRecord', arguments);
    var success = function(result){
        var callRecord = new CallRecord(result.callRecordAddress,result.callRecordId,result.callRecordName,
                                        result.callRecordType,result.durationSeconds,new Date(result.startTime));
        successCallback(callRecord);
    };
    exec(success, errorCallback,"Telephony", "getCallRecord", [callRecordType,index]);
};

/**
 * 按照带匹配的通话记录查找指定范围内的通话记录 (Android)
 * @example
        //联系人使用"*"通配，电话号码也使用"*"通配，其余字段不考虑，查找的是取结果的第2至4条记录
        var compairedCallRecord = new CallRecord("*","","*","",null,null);
        xFace.Telephony.findCallRecords(compairedCallRecord,1,3,success,fail);
        function success(result){
            alert("找到了" + result.length +" 条通话记录");
        }
        function fail() {
            alert("failed");
        }
 * @method findCallRecords
 * @param {CallRecord} comparisonCallRecord 查找带匹配属性的通话记录,具体用法请参考相关链接{{#crossLink "CallRecord"}}{{/crossLink}}
 * @param {Number} startIndex 开始位置索引(不能为负数)
 * @param {Number} endIndex 结束位置索引(不能为负数)
 * @param {Function} [successCallback] 成功回调函数
 * @param {Array} successCallback.callRecords 该数组对象
 * 中的每个元素为一个{{#crossLink "CallRecord"}}{{/crossLink}}类型对象。
 * @param {Function} [errorCallback] 失败回调函数
 * @platform Android
 */
Telephony.prototype.findCallRecords = function(comparisonCallRecord,startIndex,endIndex,successCallback,errorCallback){
    argscheck.checkArgs('onnfF', 'Telephony.findCallRecords', arguments);
    if(startIndex < 0 && endIndex < 0){
        throw "ivalid_parameter";
    }
    var comparison = {callRecordAddress:"*",callRecordId:"",callRecordName:"*",callRecordType:"",durationSeconds:-1,startTime:-1};
    if(null !== comparisonCallRecord){
        comparison.callRecordAddress = comparisonCallRecord.callRecordAddress === null ? "" : comparisonCallRecord.callRecordAddress;
        comparison.callRecordId = comparisonCallRecord.callRecordId === null ? "" : comparisonCallRecord.callRecordId;
        comparison.callRecordName = comparisonCallRecord.callRecordName === null ? "" : comparisonCallRecord.callRecordName;
        comparison.callRecordType = comparisonCallRecord.callRecordType === null ? "" : comparisonCallRecord.callRecordType;
        comparison.durationSeconds = comparisonCallRecord.durationSeconds === null ? -1 : comparisonCallRecord.durationSeconds;//如果该项留空则将该项值设为-1,java层检查是否为-1，-1表示留空忽略该项
        comparison.startTime = comparisonCallRecord.startTime === null ? -1 : (comparisonCallRecord.startTime.getTime());//如果该项留空则将该项值设为-1,java层检查是否为-1，-1表示留空忽略该项
    }
    var success = function(result){
        var len = result.length;
        var callRecordArr = [];
        for(var i = 0 ; i < len ; i++){
            var callRecord = new CallRecord(result[i].callRecordAddress,result[i].callRecordId,result[i].callRecordName,
                                        result[i].callRecordType,result[i].durationSeconds,new Date(result[i].startTime));
            callRecordArr.push(callRecord);
        }
        successCallback(callRecordArr);
    };
    exec(success, errorCallback,"Telephony", "findCallRecords", [comparison,startIndex,endIndex]);
};

/**
 * 获取指定通话记录类型的通话记录总数 (Android)
 * @example
        xFace.Telephony.getCallRecordCount(CallRecordTypes.OUTGOING,
        getCallRecordCountSuccess,getCallRecordCountError);
        function getCallRecordCountSuccess(count){
            alert(CallRecordTypes.OUTGOING + " count is : " + count);
        }
        function getCallRecordCountError(){
            alert("get " + CallRecordTypes.OUTGOING + " count fail");
        }
 * @method getCallRecordCount
 * @for Telephony
 * @param {String} callRecordType 通话记录类型,具体用法请参考相关链接{{#crossLink "CallRecordTypes"}}{{/crossLink}}
 * @param {Function} successCallback 成功回调函数
 * @param {Number} successCallback.count 通话记录总条数
 * @param {Function} [errorCallback] 失败回调函数
 * @platform Android
 */
Telephony.prototype.getCallRecordCount = function(callRecordType,successCallback,errorCallback){
    argscheck.checkArgs('sfF', 'Telephony.findCallRecords', arguments);
    var success = function(result){
        successCallback(result);
    };
    exec(success, errorCallback,"Telephony", "getCallRecordCount", [callRecordType]);
};

module.exports = new Telephony();