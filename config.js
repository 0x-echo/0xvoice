let api = 'https://node1.0xvoice.com'
if (/localhost/.test(document.location.href)) {
  api = 'http://192.168.31.185:9001'
}

export default {
  api,
  wallet: {
    auth_message: `I authorize publishing on ECHO from this device with my account: ADDRESS\n\nI accept the Terms of Service: https://0xecho.com/tos\n\nIssued At: TIMESTAMP\nPublic Key: PUBLIC_KEY`,
  }
}

export const copyrights = [{
  label: 'Attribution 4.0 International (CC BY 4.0)',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-by-line'
  ],
  value: 'cc-by',
  link: 'https://creativecommons.org/licenses/by/4.0/'
}, {
  label: 'Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-by-line',
    'ri-creative-commons-sa-line'
  ],
  value: 'cc-by-sa',
  link: 'https://creativecommons.org/licenses/by-sa/4.0/'
}, {
  label: 'Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-by-line',
    'ri-creative-commons-nc-line'
  ],
  value: 'cc-by-nc',
  link: 'https://creativecommons.org/licenses/by-nc/4.0/'
}, {
  label: 'Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-by-line',
    'ri-creative-commons-nc-line',
    'ri-creative-commons-sa-line'
  ],
  value: 'cc-by-nc-sa',
  link: 'https://creativecommons.org/licenses/by-nc-sa/4.0/'
}, {
  label: 'Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0)',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-by-line',
    'ri-creative-commons-nd-line'
  ],
  value: 'cc-by-nd',
  link: 'https://creativecommons.org/licenses/by-nd/4.0/'
}, {
  label: 'Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-by-line',
    'ri-creative-commons-nc-line',
    'ri-creative-commons-nd-line'
  ],
  value: 'cc-by-nc-nd',
  link: 'https://creativecommons.org/licenses/by-nc-nd/4.0/'
}, {
  label: 'CC0 1.0 Universal (CC0 1.0) Public Domain Dedication',
  icons: [
    'ri-creative-commons-line',
    'ri-creative-commons-zero-line'
  ],
  value: 'cc0',
  link: 'https://creativecommons.org/publicdomain/zero/1.0/'
}, {
  label: 'All Rights Reserved',
  icons: [
    'ri-forbid-line'
  ],
  value: 'forbid',
  desc: 'Distribute, remix, adapt, and build upon the material are not allowed.'
}]