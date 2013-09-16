
/*
 Copyright 2012-2013, Polyvi Inc. (http://polyvi.github.io/openxface)
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

//
//  XTelephonyExt.m
//  xFace
//
//

#import "XTelephonyExt.h"
#import "XTelephonyExt_Privates.h"

#import <Cordova/CDVInvokedUrlCommand.h>
#import <Cordova/CDVPluginResult.h>
#import <Cordova/NSArray+Comparisons.h>

@implementation XTelephonyExt

- (BOOL)isTelePhoneNumber:(NSString *)phoneNumber
{
    NSString * regExpression = @"[+*#\\d]+";
    NSPredicate *predicate = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", regExpression];

    return [predicate evaluateWithObject:phoneNumber];
}

- (void) initiateVoiceCall:(CDVInvokedUrlCommand*)command
{
    NSString *phoneNumber = [command.arguments objectAtIndex:0];

    CDVPluginResult *result = nil;
    UIDevice *device = [UIDevice currentDevice];
    if( [self isTelePhoneNumber:phoneNumber] && [[device model] isEqualToString:@"iPhone"] )
    {
        NSString *tel = [NSString stringWithFormat:@"telprompt://%@",phoneNumber];
        NSURL *url = [NSURL URLWithString:tel];
        if([[UIApplication sharedApplication] openURL:url])//YES, means success
        {
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:@"phone call success"];
        }
        else
        {
            result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"phone call error"];
        }
    }
    else
    {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"phone call error"];
    }

    // 将扩展结果返回给js端
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

@end
