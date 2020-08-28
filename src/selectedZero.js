'use strict';

function main() {
  // Remove mask ads
  let iconFindLimit = 5;
  while (iconFindLimit > 0) {
    var icon = document.getElementById('gn_interstitial_close_icon');
    if (!!icon) {
      icon.click();
      break;
    }
    setTimeout(() => {
      console.debug('waiting icon');
    }, 500);
    iconFindLimit--;
  }

  // Remove overlay ads
  let commercialFindLimit = 5;
  while (commercialFindLimit > 0) {
    var commercial = document.querySelectorAll("[id^='gn_delivery_']")[0];
    if (!!commercial) {
      commercial.hidden = true;
      break;
    }
    setTimeout(() => {
      console.debug('waiting commercial');
    }, 500);

    commercialFindLimit--;
  }

  // Remove carousel ads
  let carouselFindLimit = 5;
  while (carouselFindLimit > 0) {
    var carousel = document.getElementById('carouselExampleIndicators');
    if (!!carousel) {
      carousel.hidden = true;
      break;
    }
    setTimeout(() => {
      console.debug('waiting carousel');
    }, 500);

    carouselFindLimit--;
  }

  // Remove ads
  const mainAds = Array.from(document.querySelectorAll("[id^='google_ads_']"));
  const bottomAds = Array.from(document.getElementsByClassName('adsbygoogle'));
  const gap = Array.from(document.getElementsByClassName('google-auto-placed'));
  for (const ad of mainAds.concat(bottomAds).concat(gap)) {
    ad.hidden = true;
  }

  // Find keyselecter and set value
  const keyselect = document.getElementsByName('keyselect')[0];
  if (!keyselect) {
    return;
  }
  keyselect.value = 0;
  const event = new Event('change');
  keyselect.dispatchEvent(event);

  // Start play
  var chord = document.getElementById('my-chord-data');
  if (!!chord) {
    chord.click();
  }
  keyselect.scrollIntoView();
}

main();