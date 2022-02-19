define(["underscore","jquery","knockout","config/config","service"],function(e,n,r,t,a){function s(e){for(var n=[],t=[],a=0;a<e.length;a++)for(var s=0;s<e[a].length;s++)-1==r.utils.arrayIndexOf(n,e[a][s])&&(n.push(e[a][s]),t.push({index:e[a][s],rate:p[e[a][s]]}));return t.sort(function(e,n){return e.rate-n.rate}),t}function o(e){var n=[],r=[0,1,2,3,7],t=[0,4,6,8,10,12,14,16,18],a=[0,5,9,11,13,15,17,19,20];switch(e){case"0":n.push(r);break;case"1":n.push(t);break;case"2":n.push(a);break;case"3":n.push(r),n.push(t);break;case"4":n.push(r),n.push(t),n.push(a);break;default:n.push(a)}return c(s(n))}function c(e){for(var n=[],r=0;r<e.length;r++){var t=0==e[r].rate?"Auto":e[r].rate+" Mbps";n.push(new Option(t,e[r].index))}return n}function i(e){var n=[new Option("Auto","0")],r=b[e];r=r||13;for(var t=1;t<=r;t++){var a=2407+5*t+"MHz (Channel "+t+")";n.push(new Option(a,t))}return n}function u(){return[new Option("中国","zh-cn"),new Option("香港","zh-hk"),new Option("台灣","zh-tw"),new Option("澳門","mo")]}function l(e){for(var n=[],r=1;r<=e;r++)n.push(new Option(r,r));return n}function d(){return a.getWifiBasic()}function h(){return a.getWpsInfo()}function v(){for(var e=this,s=d(),c=[],v=0;v<t.NETWORK_MODES.length;v++)c.push(new Option(t.NETWORK_MODES[v].name,t.NETWORK_MODES[v].value));e.modes=r.observableArray(c);var b=u();e.countries=r.observableArray(b),e.channels=r.observableArray(i(b[0].value)),e.rates=r.observableArray(o(s.mode)),e.maxStations=r.observableArray(l(s.maxStation)),e.selectedMode=r.observable(s.mode),e.ssid=r.observable(s.SSID),e.broadcast=r.observable(s.broadcast+""),e.selectedCountry=r.observable(s.countryCode),e.selectedChannel=r.observable(s.channel),e.selectedRate=r.observable(s.rate),e.selectedStation=r.observable(s.station),e.wpsFlag=r.observable(""),s=n.extend(s,e),e.modeChangeHandler=function(n,r){var t=o(e.selectedMode());e.rates(t),e.selectedRate("0")},e.countryChangeHandler=function(n,r){var t=i(e.selectedCountry());e.channels(t),e.selectedChannel("0")},e.save=function(){if("1"==e.wpsFlag())return void showAlert("wps_on_info");showLoading();var n={};n.mode=e.selectedMode(),n.SSID=e.ssid(),n.broadcast="true"==e.broadcast(),n.countryCode=e.selectedCountry(),n.channel=e.selectedChannel(),n.rate=e.selectedRate(),n.station=e.selectedStation(),a.setWifiBasic(n,function(e){"success"==e.result?successOverlay():errorOverlay()})},e.clear=function(){clearTimer(),f(),clearValidateMsg()},e.refreshStatus=function(){var n=h();e.wpsFlag(n.wpsFlag)},e.refreshStatus()}function f(){var e=n("#container");r.cleanNode(e[0]);var t=new v;r.applyBindings(t,e[0]),n("#wifi_basic_form").validate({submitHandler:function(){t.save()},rules:{ssid:"ssid"}}),addInterval(t.refreshStatus,1e3)}var b={"zh-cn":13,"zh-hk":13,mo:13,"zh-tw":11},p=[0,1,2,5.5,6,6.5,9,11,12,13,18,19.5,24,26,36,39,48,52,54,58.5,65];return{init:f}});
//# sourceMappingURL=../../sourcemaps/wifi/wifi_basic_old.js.map