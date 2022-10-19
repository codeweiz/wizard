import {createI18n} from "vue-i18n";
import zhCn from '@/i18n/lang/zh-cn';
import en from '@/i18n/lang/en';

const i18n = createI18n({
    legacy: false,
    locale: sessionStorage.getItem("localeLang") || 'zhCn',
    messages: {
        zhCn,
        en
    }
})

export default i18n;
