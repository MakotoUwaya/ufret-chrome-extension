import { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Store } from '@eduardoac-skimlinks/webext-redux';
import { getBucket } from '@extend-chrome/storage';
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

import { proxyStore as store } from '../app/proxyStore';
import type { MySettings } from '../shared/types/setting';

import Content from './Content';

const withProxyStore = async (children: ReactElement, proxyStore: Store): Promise<ReactElement> => {
  return proxyStore.ready().then(() => {
    return (
      <Provider store={proxyStore}>
        <ScopedCssBaseline>{children}</ScopedCssBaseline>
      </Provider>
    );
  });
};

withProxyStore(<Content />, store).then((component) => {
  const container = document.createElement('my-extension-root');
  document.body.append(container);
  createRoot(container).render(component);
});

const bucket = getBucket<MySettings>('my_ufret_settings', 'sync');

const main = (): void => {
  // Remove mask ads
  let iconFindLimit = 5;
  while (iconFindLimit > 0) {
    var icon = document.getElementById('gn_interstitial_close_icon');
    if (icon) {
      icon.click();
      break;
    }
    setTimeout(() => {
      console.debug('waiting icon');
    }, 500);
    iconFindLimit--;
  }

  // Remove carousel ads
  let carouselFindLimit = 5;
  while (carouselFindLimit > 0) {
    var carousel = document.getElementById('carouselExampleIndicators');
    if (carousel) {
      carousel.remove();
      break;
    }
    setTimeout(() => {
      console.debug('waiting carousel');
    }, 500);

    carouselFindLimit--;
  }

  // Remove ads
  const billboardAds = Array.from(document.querySelectorAll("[id^='div-gpt-ad-PC/']"));
  const cfAsync = Array.from(document.querySelectorAll("[id^='cf_async_']"));
  const mainAds = Array.from(document.querySelectorAll("[id^='google_ads_']"));
  const bottomAds = Array.from(document.getElementsByClassName('adsbygoogle'));
  const overlayAds = Array.from(document.getElementsByClassName('asOverlayAd__wrap'));
  const googleAds = Array.from(document.querySelectorAll("[id^='google_ads_iframe_']"));
  const gap = Array.from(document.getElementsByClassName('google-auto-placed'));
  const allAds = [
    ...billboardAds,
    ...cfAsync,
    ...mainAds,
    ...bottomAds,
    ...overlayAds,
    ...googleAds,
    ...gap,
    document.querySelector(
      'body > div.container > div:nth-child(11) > div:nth-child(4) > div:nth-child(19)'
    ),
    document.querySelector(
      'body > div.container > div:nth-child(11) > div:nth-child(4) > div:nth-child(25)'
    ),
    document.getElementById('showAdPosition'),
  ];
  for (const ads of allAds) {
    ads?.remove();
  }

  // Find keyselecter and set value
  const keyselect: any = document.getElementsByName('keyselect')[0];
  if (!keyselect) {
    return;
  }
  bucket.get().then((settings) => {
    keyselect.value = (
      settings.selectedScoreKey > 0 ? `+${settings.selectedScoreKey}` : settings.selectedScoreKey
    ).toString();
    const event = new Event('change');
    keyselect.dispatchEvent(event);

    // Start play
    var chord = document.getElementById('my-chord-data');
    chord?.click();
    keyselect.scrollIntoView();
  });
};

main();
