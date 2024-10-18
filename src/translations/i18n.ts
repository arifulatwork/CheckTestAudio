import { I18n } from 'i18n-js';

import translations from '.';

const i18n = new I18n(translations);
i18n.defaultLocale = 'en';
i18n.locale = 'en';

export default i18n;
