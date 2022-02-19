define(["jquery","knockout","configPath","service","underscore"],function(s,e,i,a,t){function o(s){for(var e=[],i=1;i<=s;i++)e.push(new Option(i,i));return e}function n(){var t=this,n=c(),_=a.getParams({nv:"wifi_onoff_wifi5g_by_n79_mutex"}).wifi_onoff_wifi5g_by_n79_mutex;t.wifi5GIsOn=e.observable("1"!=_),t.hasWifiSwitch=i.WIFI_SWITCH_SUPPORT,t.hasGuestSSIDControl=i.WIFI_GUEST_SSID_ACCESS_SUPPORT,t.hasQRImg=i.WIFI_SUPPORT_QR_CODE,t.hasWifiMacFilter=i.WIFI_MAC_FILTER_SUPPORT,t.hasWifiDoubleChip=i.WIFI_DOUBLE_CHIP,t.hasMultiSSID=i.HAS_MULTI_SSID,t.showIsolated=i.SHOW_WIFI_AP_ISOLATED,t.wifi_enable=e.observable(n.wifiSwitch),t.accessPointEnable=e.observable(n.AccessPointSwitchStatus),t.originAccessPointEnable=e.observable(n.AccessPointSwitchStatus),t.isShowSSIDInfoDiv=e.observable(!1);var u=a.getParams({nv:"lan_sec_ssid_control"}).lan_sec_ssid_control;t.lan_sec_ssid_control=e.observable(u),i.WIFI_SWITCH_SUPPORT?"0"!=n.wifiSwitch?t.isShowSSIDInfoDiv(!0):t.isShowSSIDInfoDiv(!1):t.isShowSSIDInfoDiv(!0),t.origin_main_ssid_enable=n.wifiSwitch;var f="OPEN"==n.AuthMode;t.securityModeChangeHandler=function(){f&&(t.passPhrase(""),clearValidateMsg("#passwordContainer")),f="OPEN"==t.selectedSecurityMode()},t.maxStationNumber=e.computed(function(){return i.MAX_STATION_NUMBER}),t.securityModes=e.observableArray(S),t.selectedSecurityMode=e.observable(n.AuthMode),t.passPhrase=e.observable(n.Password),t.showPassword=e.observable(!1),t.ssid=e.observable(n.SSID),t.broadcast=e.observable("1"==n.ApBroadcastDisabled?"1":"0"),t.apIsolation=e.observable("1"==n.ApIsolate?"1":"0"),t.cipher=n.cipher,t.selectedStation=e.observable(n.ApMaxStationNumber),t.maxStations=e.observableArray(o(i.MAX_STATION_NUMBER)),t.showQrCode=e.observable(!("0"==n.QrImageShow)),t.qrcode_ssid1=e.observable(function(s){var e=(new Date).getTime();return s.QrImageUrl?s.QrImageUrl+"?_="+e:""}(n)),t.showQrCodeHandler=function(){s("#showQrCode").parent().find(".error").hide();var e=s("#showQrCode:checked");e&&0==e.length?t.showQrCode(!0):t.showQrCode(!1)},t.clear=function(s){if("switch"==s)t.wifi_enable(n.wifiSwitch);else if("ssid1"==s){t.selectedMode(n.AuthMode),t.passPhrase(n.Password),t.ssid(n.SSID),t.broadcast("1"==n.ApBroadcastDisabled?"1":"0"),t.cipher=n.cipher,t.selectedStation(n.ApMaxStationNumber),t.apIsolation("1"==n.ApIsolate?"1":"0");var e=a.getParams({nv:"wifi_syncparas_flag"}).wifi_syncparas_flag;t.syn24gAnd5g(e)}else"ssid2"==s?(t.m_selectedMode(n.AuthMode),t.m_passPhrase(n.Password),t.m_ssid(n.SSID),t.m_broadcast("1"==n.ApBroadcastDisabled?"1":"0"),t.m_cipher=n.cipher,t.m_selectedStation(n.ApMaxStationNumber),t.m_apIsolation("1"==n.ApIsolate?"1":"0")):(clearTimer(),clearValidateMsg(),l())},t.checkSettings=function(e){var i=d();a.getStatusInfo();return"switch"!=e||"1"!=i.WpsStatus_1&&"1"!=i.WpsStatus_2?"ssid1"==e&&"1"==i.WpsStatus_1?(showAlert("wps_on_info"),!0):(t.syn24gAnd5g(s("#syn24gAnd5gCheckbox:checked").length),!1):(showAlert("wps_on_info"),!0)},t.saveSSID1=function(){t.checkSettings("ssid1")||showConfirm("wifi_disconnect_confirm",function(){t.saveSSID1Action()})},t.saveSSID1Action=function(){showLoading(),t.broadcast(s("#broadcastCheckbox:checked").length>0?"0":"1"),t.apIsolation(s("#apisolatedCheckbox:checked").length),t.syn24gAnd5g(s("#syn24gAnd5gCheckbox:checked").length);var e={};e.goformId="1"==t.syn24gAnd5g()?"setAccessPointInfo_24G_5G":"setAccessPointInfo",e.ChipIndex="1"==t.syn24gAnd5g()?"9":"0",e.AccessPointIndex="0",e.AccessPointSwitchStatus=t.accessPointEnable(),e.originAccessPointSwitchStatus=t.originAccessPointEnable(),e.AuthMode=t.selectedSecurityMode(),e.Password=t.passPhrase(),e.SSID=t.ssid(),e.ApMaxStationNumber=t.selectedStation(),e.ApIsolate=t.apIsolation(),e.ApBroadcastDisabled=t.broadcast(),e.QrImageShow=t.showQrCode()?"1":"0",e.cipher="WPA2PSK"==t.selectedSecurityMode()?"CCMP":"TKIPCCMP",e.wifi_syncparas_flag=t.syn24gAnd5g(),a.setWifiAccessPointInfo(e,function(s){"success"==s.result?t.checkWifiStatus():errorOverlay()})},t.showPasswordHandler=function(){s("#passShow").parent().find(".error").hide();var e=s("#showPassword:checked");e&&0==e.length?t.showPassword(!0):t.showPassword(!1)},t.syncTo5GHandler=function(){var e=s("#syn24gAnd5gCheckbox:checked");e&&1==e.length?(s("input[name='ssid']").attr("maxlength","29"),s("#ssid1_5G_div :input").each(function(){s(this).prop("disabled",!0),s(this).parent().addClass("ui-state-disabled")}),s("#ssid1_5G_div p.checkbox").each(function(){s(this).hasClass("checkbox_selected")?s(this).addClass("checked_disable"):s(this).addClass("disable"),disableCheckbox(this)})):(s("input[name='ssid']").attr("maxlength","32"),s("#ssid1_5G_div :input").each(function(){s(this).prop("disabled",!1),s(this).parent().removeClass("ui-state-disabled")}),s("#ssid1_5G_div p.checkbox").each(function(){s(this).removeClass("disable").removeClass("checked_disable")})),s("#maxStation_5G").prop("disabled",!1)},t.setMultiSSIDSwitch=function(){if(!t.checkSettings("switch")){var e=function(){showLoading();var e={};i.WIFI_SWITCH_SUPPORT&&(e.SwitchOption=t.wifi_enable(),t.lan_sec_ssid_control(s("#allowAccessCheckbox:checked").length>0?"0":"1"),e.lan_sec_ssid_control=t.lan_sec_ssid_control()),a.setWifiModuleSwitchStatus(e,function(s){"success"==s.result?t.checkWifiStatus():errorOverlay()})};"0"==t.wifi_enable()?showConfirm("wifi_off_alert",function(){e()}):e()}},t.checkWifiStatus=function(){function s(){var e=a.getWifiModuleSwitchStatus();"0"!=e.WiFiModuleSwitch&&"1"!=e.WiFiModuleSwitch?addTimeout(s,1e3):setTimeout(function(){successOverlay(),h&&setTimeout(function(){window.location.reload()},1e3),"1"==t.accessPointEnable()?t.originAccessPointEnable("1"):t.originAccessPointEnable("0"),clearTimer(),clearValidateMsg(),window.location.reload()},h?15e3:0)}setTimeout(function(){s()},2e3)};var n=r(),f="OPEN"==n.AuthMode;t.securityModeChangeHandler_5G=function(){f&&(t.passPhrase(""),clearValidateMsg("#passwordContainer_5G")),f="OPEN"==t.selectedSecurityMode_5G()},t.maxStationNumber_5G=e.computed(function(){return i.MAX_STATION_NUMBER}),t.accessPointEnable_5G=e.observable(n.AccessPointSwitchStatus),t.originAccessPointEnable_5G=e.observable(n.AccessPointSwitchStatus),t.securityModes_5G=e.observableArray(S),t.selectedSecurityMode_5G=e.observable(n.AuthMode),t.passPhrase_5G=e.observable(n.Password),t.showPassword_5G=e.observable(!1),t.ssid_5G=e.observable(n.SSID),t.broadcast_5G=e.observable("1"==n.ApBroadcastDisabled?"1":"0"),t.apIsolation_5G=e.observable("1"==n.ApIsolate?"1":"0"),t.cipher_5G=n.cipher,t.selectedStation_5G=e.observable(n.ApMaxStationNumber),t.maxStations_5G=e.observableArray(o(i.MAX_STATION_NUMBER_5G)),t.showQrCode_5G=e.observable(!("0"==n.QrImageShow)),t.qrcode_ssid1_5G=e.observable(function(s){var e=(new Date).getTime();return s.QrImageUrl?s.QrImageUrl+"?_="+e:""}(n)),t.showQrCodeHandler_5G=function(){if(!s("#showQrCode_5G_p").hasClass("disable")&&!s("#showQrCode_5G_p").hasClass("checked_disable")){s("#showQrCode_5G").parent().find(".error").hide();var e=s("#showQrCode_5G:checked");e&&0==e.length?t.showQrCode_5G(!0):t.showQrCode_5G(!1)}};var p=a.getParams({nv:"wifi_syncparas_flag"}).wifi_syncparas_flag;t.syn24gAnd5g=e.observable(p),1==t.syn24gAnd5g()?(s("input[name='ssid']").attr("maxlength","29"),s("#ssid1_5G_div :input").each(function(){s(this).prop("disabled",!0)}),s("#ssid1_5G_div p.checkbox").each(function(){s(this).hasClass("checkbox_selected")?s(this).addClass("checked_disable"):s(this).addClass("disable")})):(s("input[name='ssid']").attr("maxlength","32"),s("#ssid1_5G_div :input").each(function(){s(this).prop("disabled",!1)}),s("#ssid1_5G_div p.checkbox").each(function(){s(this).removeClass("disable").removeClass("checked_disable")})),s("#maxStation_5G").prop("disabled",!1),t.clear_5G=function(s){"switch"==s?t.wifi_enable(n.wifiSwitch):"ssid1_5G"==s?(t.selectedMode_5G(n.AuthMode),t.passPhrase_5G(n.Password),t.ssid_5G(n.SSID),t.broadcast_5G("1"==n.ApBroadcastDisabled?"1":"0"),t.cipher_5G=n.cipher,t.selectedStation_5G(n.ApMaxStationNumber),t.apIsolation_5G("1"==n.ApIsolate?"1":"0")):"ssid2"==s?(t.m_selectedMode(n.AuthMode),t.m_passPhrase(n.Password),t.m_ssid(n.SSID),t.m_broadcast("1"==n.ApBroadcastDisabled?"1":"0"),t.m_cipher=n.cipher,t.m_selectedStation(n.ApMaxStationNumber),t.m_apIsolation("1"==n.ApIsolate?"1":"0")):(clearTimer(),clearValidateMsg(),l())},t.checkSettings_5G=function(s){var e=d();a.getStatusInfo();return"switch"!=s||"1"!=e.WpsStatus_1&&"1"!=e.WpsStatus_2?"ssid1_5G"==s&&"1"==e.WpsStatus_2&&(showAlert("wps_on_info"),!0):(showAlert("wps_on_info"),!0)},t.saveSSID1_5G=function(){t.checkSettings_5G("ssid1")||showConfirm("wifi_disconnect_confirm",function(){t.saveSSID1Action_5G()})},t.saveSSID1Action_5G=function(){showLoading(),t.broadcast_5G(s("#broadcastCheckbox_5G:checked").length>0?"0":"1"),t.apIsolation_5G(s("#apisolatedCheckbox_5G:checked").length);var e={};e.ChipIndex="1",e.AccessPointIndex="0",e.AccessPointSwitchStatus=t.accessPointEnable_5G(),e.originAccessPointSwitchStatus=t.originAccessPointEnable_5G(),e.AuthMode=t.selectedSecurityMode_5G(),e.Password=t.passPhrase_5G(),e.SSID=t.ssid_5G(),e.ApMaxStationNumber=t.selectedStation_5G(),e.ApIsolate=t.apIsolation_5G(),e.ApBroadcastDisabled=t.broadcast_5G(),e.QrImageShow=t.showQrCode_5G()?"1":"0",e.cipher="WPA2PSK"==t.selectedSecurityMode_5G()?"CCMP":"TKIPCCMP",a.setWifiAccessPointInfo(e,function(s){"success"==s.result?t.checkWifiStatus():errorOverlay()})},t.showPasswordHandler_5G=function(){if(!s("#showPassword_5G_p").hasClass("disable")&&!s("#showPassword_5G_p").hasClass("checked_disable")){s("#passShow_5G").parent().find(".error").hide();var e=s("#showPassword_5G:checked");e&&0==e.length?t.showPassword_5G(!0):t.showPassword_5G(!1)}},t.saveSSID1_24G5G=function(){if("0"==c().wifiSwitch)return showAlert("wps_wifi_off"),!0;t.checkSettings("ssid1")||t.checkSettings_5G("ssid1")||showConfirm("wifi_disconnect_confirm",function(){t.saveSSID1Action_24G5G()})},t.saveSSID1Action_24G5G=function(){showLoading(),t.syn24gAnd5g(s("#syn24gAnd5gCheckbox:checked").length);var e={};e.goformId="setAccessPointInfo_24G_5G_ALL",e.ChipIndex="9",e.AccessPointIndex="0",e.wifi_syncparas_flag=t.syn24gAnd5g(),e.AccessPointSwitchStatus=t.accessPointEnable(),e.originAccessPointSwitchStatus=t.originAccessPointEnable(),e.AuthMode=t.selectedSecurityMode(),e.Password=t.passPhrase(),e.SSID=t.ssid(),e.ApMaxStationNumber=t.selectedStation(),e.ApIsolate=t.apIsolation(),e.ApBroadcastDisabled=t.broadcast(),e.QrImageShow=t.showQrCode()?"1":"0",e.cipher="WPA2PSK"==t.selectedSecurityMode()?"CCMP":"TKIPCCMP",e.wifi5GIsOn=t.wifi5GIsOn(),t.wifi5GIsOn()&&(e.AccessPointSwitchStatus_5G="1"==t.syn24gAnd5g()?t.accessPointEnable():t.accessPointEnable_5G(),e.originAccessPointSwitchStatus_5G="1"==t.syn24gAnd5g()?t.originAccessPointEnable():t.originAccessPointEnable_5G(),e.AuthMode_5G="1"==t.syn24gAnd5g()?t.selectedSecurityMode():t.selectedSecurityMode_5G(),e.Password_5G="1"==t.syn24gAnd5g()?t.passPhrase():t.passPhrase_5G(),e.SSID_5G="1"==t.syn24gAnd5g()?t.ssid()+"_5G":t.ssid_5G(),e.ApMaxStationNumber_5G=t.selectedStation_5G(),e.ApIsolate_5G="1"==t.syn24gAnd5g()?t.apIsolation():t.apIsolation_5G(),e.ApBroadcastDisabled_5G="1"==t.syn24gAnd5g()?t.broadcast():t.broadcast_5G(),e.QrImageShow_5G="1"==t.syn24gAnd5g()?t.showQrCode()?"1":"0":t.showQrCode_5G()?"1":"0",e.cipher_5G="1"==t.syn24gAnd5g()?"WPA2PSK"==t.selectedSecurityMode()?"CCMP":"TKIPCCMP":"WPA2PSK"==t.selectedSecurityMode_5G()?"CCMP":"TKIPCCMP"),a.setWifiAccessPointInfo_24G5G(e,function(s){"success"==s.result?t.checkWifiStatus():errorOverlay()})}}function c(){var s=a.getWifiModuleSwitchStatus(),e=a.getWifiAccessPointInfo();return wifiFilterAPInfo(s,e,i.WIFICHIPINDEX.FIRST,i.ACCESSPOINTINDEX.FIRST,i.WIFICHIPINDEX,i.ACCESSPOINTINDEX)}function r(){var s=a.getWifiModuleSwitchStatus(),e=a.getWifiAccessPointInfo();return wifiFilterAPInfo(s,e,i.WIFICHIPINDEX.SECOND,i.ACCESSPOINTINDEX.FIRST,i.WIFICHIPINDEX,i.ACCESSPOINTINDEX)}function d(){var s=a.getWifiWpsStatus();return wifiWPSActiveInfo(s)}function _(){a.getParams({nv:"user_ip_addr"},function(s){a.getParams({nv:"station_list"},function(e){h=isWifiConnected(s.user_ip_addr,e.station_list)})})}function l(){var t=s("#container");e.cleanNode(t[0]);var o=new n;e.applyBindings(o,t[0]),addTimeout(function(){_()},600),i.WDS_SUPPORT&&function(){"0"!=a.getWdsInfo().currentMode?(s("#frmWifiSwitch :input").each(function(){s(this).prop("disabled",!0)}),s("#frmSSID1 :input").each(function(){s(this).prop("disabled",!0)}),s("#frmSSID1_5G :input").each(function(){s(this).prop("disabled",!0)}),s("#frmSSID1_24G5G :input").each(function(){s(this).prop("disabled",!0)})):(s("#frmWifiSwitch :input").each(function(){s(this).prop("disabled",!1)}),s("#frmSSID1 :input").each(function(){s(this).prop("disabled",!1)}),s("#frmSSID1_5G :input").each(function(){s(this).prop("disabled",!1)}),s("#frmSSID1_245G :input").each(function(){s(this).prop("disabled",!1)}))}();var c=a.getParams({nv:"wifi_syncparas_flag"}).wifi_syncparas_flag;o.syn24gAnd5g(c),1==o.syn24gAnd5g()?(s("#ssid1_5G_div :input").each(function(){s(this).prop("disabled",!0)}),s("#ssid1_5G_div p.checkbox").each(function(){s(this).hasClass("checkbox_selected")?s(this).addClass("checked_disable"):s(this).addClass("disable")})):(s("#ssid1_5G_div :input").each(function(){s(this).prop("disabled",!1)}),s("#ssid1_5G_div p.checkbox").each(function(){s(this).removeClass("disable").removeClass("checked_disable")})),s("#maxStation_5G").prop("disabled",!1),s("#frmWifiSwitch").validate({submitHandler:function(){o.setMultiSSIDSwitch()}}),s("#frmSSID1").validate({submitHandler:function(){o.saveSSID1()},rules:{ssid:"ssid",pass:"wifi_password_check",passShow:"wifi_password_check"},errorPlacement:function(s,e){var i=e.attr("id");"pass"==i||"passShow"==i?s.insertAfter("#lblShowPassword"):s.insertAfter(e)}}),s("#frmSSID1_5G").validate({submitHandler:function(){o.saveSSID1_5G()},rules:{ssid_5G:"ssid",pass_5G:"wifi_password_check",passShow_5G:"wifi_password_check"},errorPlacement:function(s,e){var i=e.attr("id");"pass_5G"==i||"passShow_5G"==i?s.insertAfter("#lblShowPassword_5G"):s.insertAfter(e)}}),s("#frmSSID1_24G5G").validate({submitHandler:function(){o.saveSSID1_24G5G()},rules:{ssid:"ssid",pass:"wifi_password_check",passShow:"wifi_password_check",ssid_5G:"ssid",pass_5G:"wifi_password_check",passShow_5G:"wifi_password_check"}})}var h=!1,S=t.map(i.AUTH_MODES,function(s){return new Option(s.name,s.value)});return{init:l}});
//# sourceMappingURL=../../../sourcemaps/m/wifi/wifi_main.js.map