define(["jquery","service","knockout","configPath"],function(e,t,r,n){function o(){e("#btnCheckNewVersion").unbind("click").click(function(){function r(){function e(){var r=t.getNewVersionState(),n=t.getCurrentUpgradeState();r.hasNewVersion?a():"0"==r.new_version_state||"version_no_new_software"==r.new_version_state?showAlert("ota_no_new_version"):"version_processing"==r.new_version_state||"in_session"==r.new_version_state?showAlert("ota_update_running"):"version_checking_failed"==r.new_version_state||"network_unavailable"==r.new_version_state?errorOverlay("ota_check_fail"):"low_battery"==n.current_upgrade_state?showInfo("ota_low_battery"):"upgrade_pack_error"==n.current_upgrade_state?showInfo("ota_md5_error"):addTimeout(e,1e3)}"1"!=c.dm_update_package_file_exist&&showLoading("ota_new_version_checking"),t.setUpgradeSelectOp({selectOp:"check"},function(t){"success"==t.result?e():errorOverlay()})}var o=t.getStatusInfo();if("upgrade_prepare_install"!=o.current_upgrade_state&&"low_battery"!=o.current_upgrade_state&&!checkConnectedStatus(o.connectStatus)&&"connect"!=o.connectWifiStatus)return void showAlert("ota_network_disconnected");var s=t.getNewVersionState();if(s.hasNewVersion)return void a();if("FOTA"==n.UPGRADE_TYPE){var i=["version_no_new_software","version_has_new_critical_software","version_has_new_optional_software","version_start","version_processing","version_roaming","version_checking","version_checking_failed"];if(-1!=e.inArray(s.new_version_state,i))return void showAlert("ota_update_running")}if("upgrade_prepare_install"==o.current_upgrade_state)return void showInfo("ota_download_success");if("low_battery"==o.current_upgrade_state)return void showInfo("ota_low_battery");var _=["upgrade_pack_redownload","connecting_server","connect_server_success","upgrading","accept"];if(-1!=e.inArray(o.current_upgrade_state,_))return void a();var c=t.dmUpdatePackageExit();if("1"==c.dm_update_package_file_exist)return showInfo("ota_download_success"),void r();o.roamingStatus?showConfirm("ota_check_roaming_confirm",function(){r()}):r()})}function a(){if(t.getMandatory().is_mandatory)p();else{var e={};e=t.getCurrentUpgradeState(),s(e)}}function s(r){var n=r.current_upgrade_state;if("upgrade_pack_redownload"==n)showConfirm("ota_interrupted",{ok:function(){i(1)},no:function(){i(0)}});else{var o=["upgrade_prepare_install","low_battery","connecting_server","connect_server_success","upgrading","accept"];if(-1!=e.inArray(n,o))p();else{var a=t.getNewVersionInfo(),s="";a.version&&(s="<br/>"+e.i18n.prop("ota_version")+a.version),showConfirm(e.i18n.prop("ota_new_version")+s,{ok:function(){i(1)},no:function(){i(0)}})}}}function i(e){var r=t.getUserChoice();if(e){var n=t.getStatusInfo();if(!checkConnectedStatus(n.connectStatus)&&"connect"!=n.connectWifiStatus)return void showAlert("ota_network_disconnected");"none"==r.if_has_select?c():"accept"==r.if_has_select?p():"cancel"==r.if_has_select?showAlert("ota_have_cancel"):"downloading_cancel"==r.if_has_select&&showAlert("ota_have_cancel")}else"none"==r.if_has_select?d():"accept"==r.if_has_select?p():"cancel"==r.if_has_select||r.if_has_select}function _(){t.getPackSizeInfo({},function(t){var r,n="";0==parseInt(t.pack_total_size)?(r=0,n=""):(r=parseInt(100*parseInt(t.download_size)/parseInt(t.pack_total_size)),n=transUnit(parseInt(t.download_size),!1)+"/"+transUnit(parseInt(t.pack_total_size),!1)),r>100&&(r=100,n=transUnit(parseInt(t.pack_total_size),!1)+"/"+transUnit(parseInt(t.pack_total_size),!1)),r>0&&(r>95&&showProgressBar("ota_update","<br/>"+e.i18n.prop("ota_update_warning")),setProgressBar(r,n))})}function c(){t.setUpgradeSelectOp({selectOp:"1"},function(e){"success"==e.result&&p()})}function d(){t.setUpgradeSelectOp({selectOp:"0"},function(e){})}function u(){if(t.getMandatory().is_mandatory)showProgressBar("ota_update","<br/>"+e.i18n.prop("ota_update_warning"));else{var r="";"OTA"==n.UPGRADE_TYPE&&(r="<br/><br/><button id='btnStopUpgrade' onclick='stopOTAUpgrade();' class='btn-1 btn-primary'>"+e.i18n.prop("cancel")+"</button>"),showProgressBar("ota_update","<br/>"+e.i18n.prop("ota_update_warning")+r)}setProgressBar(0,"")}function l(){"low_battery"==t.getCurrentUpgradeState().current_upgrade_state&&(showInfo("ota_low_battery"),clearInterval(v))}function p(){function r(){var n=["upgrade_pack_redownload","upgrade_prepare_install","low_battery","connecting_server","connect_server_success","upgrading","accept"],o=t.getCurrentUpgradeState();"fota_idle"==o.current_upgrade_state.toLowerCase()?addTimeout(r,1e3):-1!=e.inArray(o.current_upgrade_state,n)&&(hideLoading(),u())}f=!0,e("#progress").is(":visible")||r();var n=0,o=function(){var e=null;n<=3?(n+=1,e=t.getCurrentUpgradeState()):e=t.getStatusInfo();var r=e.current_upgrade_state;if(f){if("connecting_server"==r);else{if("connect_server_failed"==r)return f=!1,window.clearTimeout(h),hideProgressBar(),void showAlert("ota_connect_server_failed");if("connect_server_success"==r);else if("upgrading"==r)_();else if("download_success"==r);else if("upgrade_pack_check_ok"==r);else{if("download_failed"==r)return hideProgressBar(),f=!1,showAlert("ota_download_failed"),void window.clearTimeout(h);if("server_unavailable"==r)return hideProgressBar(),f=!1,showAlert("ota_connect_server_failed"),void window.clearTimeout(h);if("network_unavailable"==r)return hideProgressBar(),f=!1,showAlert("ota_no_network"),void window.clearTimeout(h);if("pkg_exceed"==r)return hideProgressBar(),f=!1,showAlert("ota_pkg_exceed"),void window.clearTimeout(h);if("accept"==r);else{if("low_battery"==r)return hideProgressBar(),f=!1,showInfo("ota_low_battery"),void window.clearTimeout(h);if("upgrade_pack_error"==r)return hideProgressBar(),f=!1,showInfo("ota_md5_error"),void window.clearTimeout(h);if("upgrade_prepare_install"==r)return hideProgressBar(),f=!1,t.removeTimerThings("current_upgrade_state",function(){}),showInfo("ota_download_success"),window.clearTimeout(h),void(v=setInterval(function(){l()},1e3));if("checking"==r||"fota_idle"==r);else if("upgrade_pack_redownload"!=r)return f=!1,hideProgressBar(),void window.clearTimeout(h)}}}h=window.setTimeout(o,1e3)}};f?h=window.setTimeout(o,100):window.clearTimeout(h)}function w(){var r=t.getStatusInfo();"connect"==r.connectWifiStatus||checkConnectedStatus(r.connectStatus)?enableBtn(e("#btnCheckNewVersion")):disableBtn(e("#btnCheckNewVersion")),r.new_version_state?(e("#btnCheckNewVersion").attr("data-trans","ota_update_new_version").text(e.i18n.prop("ota_update_new_version")),e("#newVersionSpan").text(""==r.dm_new_version?"":r.dm_new_version),""==r.dm_new_version?e("#newVersionInfoDiv").hide():e("#newVersionInfoDiv").show()):(e("#btnCheckNewVersion").attr("data-trans","ota_check_new_version").text(e.i18n.prop("ota_check_new_version")),e("#newVersionSpan").text(""),e("#newVersionInfoDiv").hide()),r.isLoggedIn&&!e("#progress").is(":visible")&&("connecting_server"!=r.current_upgrade_state&&"upgrading"!=r.current_upgrade_state&&"accept"!=r.current_upgrade_state&&"connect_server_success"!=r.current_upgrade_state||(null==f?(r.is_mandatory||(e("#dialog").popup("close"),e.mobile.loading("hide")),p()):0==f&&(f=null)))}function g(){w(),addInterval(function(){w()},1e3);var r=t.getDeviceInfo();e("#currentVersionSpan").text(r.sw_version),o()}var f=null,v=0,h=0;return{init:g}});
//# sourceMappingURL=../../../sourcemaps/m/others/ota_update.js.map