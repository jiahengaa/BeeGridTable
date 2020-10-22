// using with vue-i18n in CDN
/*eslint-disable */
import Vue from "vue";
const isServer = Vue.prototype.$isServer;

export default function(lang) {
    if (!isServer) {
        if (typeof window.beegridtable !== "undefined") {
            if (!("langs" in beegridtable)) {
                beegridtable.langs = {};
            }
            beegridtable.langs[lang.i.locale] = lang;
        }
    }
}
/*eslint-enable */
