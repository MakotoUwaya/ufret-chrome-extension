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

const removeAdsElements = (): void => {
  // Remove ads
  const billboardAds = Array.from(document.querySelectorAll("[id^='div-gpt-ad-PC/']"));
  const cfAsync = Array.from(document.querySelectorAll("[id^='cf_async_']"));
  const mainAds = Array.from(document.querySelectorAll("[id^='google_ads_']"));
  const bottomAds = Array.from(document.getElementsByClassName('adsbygoogle'));
  const overlayAds = Array.from(document.getElementsByClassName('asOverlayAd__wrap'));
  const googleAds = Array.from(document.querySelectorAll("[id^='google_ads_iframe_']"));
  const gap = Array.from(document.getElementsByClassName('google-auto-placed'));

  // Remove GliaStudio video ads
  const gliaStudioAds = Array.from(document.querySelectorAll("[class*='glia']"));
  const gliaPlayerAds = Array.from(document.querySelectorAll("[id*='glia'], [class*='glia']"));

  // Remove recommendation ads section (こちらもおすすめ)
  const recommendationSections = Array.from(document.querySelectorAll('div')).filter(
    (div) =>
      div.textContent?.includes('こちらもおすすめ') ||
      div.innerHTML?.includes('PR(') ||
      div.querySelector('a[href*="dsp.logly.co.jp"]') ||
      div.querySelector('a[href*="ad-delivery.net"]') ||
      div.querySelector('a[href*="doubleclick.net"]')
  );

  // Remove Logly ad network elements
  const loglyAds = Array.from(document.querySelectorAll('a[href*="dsp.logly.co.jp"]')).map(
    (link) => {
      // Find the outermost container for the ad
      let container = link.parentElement;
      while (container && container.parentElement && container.parentElement !== document.body) {
        container = container.parentElement;
      }
      return container;
    }
  );

  // Remove ad tracking pixels
  const trackingPixels = Array.from(
    document.querySelectorAll('img[src*="ad-delivery.net"], img[src*="doubleclick.net"]')
  );

  // Remove promotion banners
  const promotionBanners = Array.from(document.querySelectorAll('div')).filter(
    (div) =>
      div.textContent?.includes('U-FRETからのお年玉') ||
      div.textContent?.includes('広告非表示') ||
      div.textContent?.includes('体験中')
  );

  const allAds = [
    ...billboardAds,
    ...cfAsync,
    ...mainAds,
    ...bottomAds,
    ...overlayAds,
    ...googleAds,
    ...gap,
    ...gliaStudioAds,
    ...gliaPlayerAds,
    ...recommendationSections,
    ...loglyAds,
    ...trackingPixels,
    ...promotionBanners,
    document.querySelector(
      'body > div.container > div:nth-child(11) > div:nth-child(4) > div:nth-child(19)'
    ),
    document.querySelector(
      'body > div.container > div:nth-child(11) > div:nth-child(4) > div:nth-child(25)'
    ),
    document.getElementById('showAdPosition'),
  ].filter(Boolean); // Remove null/undefined elements

  for (const ads of allAds) {
    try {
      ads?.remove();
    } catch (error) {
      console.debug('Failed to remove ad element:', error);
    }
  }
};

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

  // Initial ad removal
  removeAdsElements();

  // Set up MutationObserver to remove dynamically loaded ads
  const observer = new MutationObserver((mutations) => {
    let shouldRemoveAds = false;
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            // Check if the added element contains ads
            if (
              element.id?.includes('gpt-ad') ||
              element.id?.includes('google_ads') ||
              element.className?.includes('adsbygoogle') ||
              element.className?.includes('glia') ||
              element.querySelector?.('a[href*="dsp.logly.co.jp"]') ||
              element.textContent?.includes('PR(')
            ) {
              shouldRemoveAds = true;
            }
          }
        });
      }
    });

    if (shouldRemoveAds) {
      setTimeout(removeAdsElements, 100); // Slight delay to ensure elements are fully rendered
    }
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

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
