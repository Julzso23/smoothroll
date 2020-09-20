/* global chrome */

// Credit to https://github.com/remixz/umi for this fix, thanks!

chrome.webRequest.onHeadersReceived.addListener(({responseHeaders}) => {
  const corsHeader = responseHeaders.findIndex(({name}) => name.toLowerCase() === 'access-control-allow-origin')
  if (corsHeader > -1) {
    responseHeaders[corsHeader].value = '*'
  } else {
    responseHeaders.push({
      name: 'access-control-allow-origin',
      value: '*'
    })
  }

  return {responseHeaders}
}, {urls: ['https://*.vrv.co/*', 'https://*.dlvr1.net/*', 'https://pl.crunchyroll.com/*']}, ['blocking', 'responseHeaders', 'extraHeaders'])
