cordova.define("com.polyvi.xface.extension.telephony.CallRecordTypes", function(require, exports, module) {
/*
 This file was modified from or inspired by Apache Cordova.

 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements. See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership. The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License. You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied. See the License for the
 specific language governing permissions and limitations
 under the License.
*/

/**
 * @module telephony
 */

 /**
 * 定义通话记录相关的类型（Android）<br/>
 * @class CallRecordTypes
 * @namespace
 * @static
 * @platform Android
 * @since 3.0.0
 */
var CallRecordTypes = {
    /**
     * 已接电话 (Android).
     * @example
         CallRecordTypes.RECEIVED
     * @property RECEIVED
     * @type String
     * @final
     * @platform Android
     * @since 3.0.0
     */
    RECEIVED:"RECEIVED",
    /**
     * 已拨电话 (Android).
     * @example
         CallRecordTypes.OUTGOING
     * @property OUTGOING
     * @type String
     * @final
     * @platform Android
     * @since 3.0.0
     */
    OUTGOING:"OUTGOING",
    /**
     * 未接电话 (Android).
     * @example
         CallRecordTypes.MISSED
     * @property MISSED
     * @type String
     * @final
     * @platform Android
     * @since 3.0.0
     */
    MISSED:"MISSED"
};

module.exports = CallRecordTypes;
});