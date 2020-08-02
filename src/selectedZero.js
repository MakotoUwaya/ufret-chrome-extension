'use strict';

function main() {
  // Find keyselecter and set value
  const keyselect = document.getElementsByName('keyselect')[0];
  if (!keyselect) {
    return;
  }
  keyselect.value = 0;
  const event = new Event('change');
  keyselect.dispatchEvent(event);

  // Remove ads
  let iconFindLimit = 5;
  while (iconFindLimit > 0) {
    var icon = document.getElementById('gn_interstitial_close_icon');
    if (!!icon) {
      icon.click();
      break;
    }
    setTimeout(() => {
      console.log('waiting icon');
    }, 500);
    iconFindLimit--;
  }

  let commercialFindLimit = 5;
  while (commercialFindLimit > 0) {
    var commercial = document.querySelectorAll("[id^='gn_delivery_']")[0];
    if (!!commercial) {
      commercial.hidden = true;
      break;
    }
    setTimeout(() => {
      console.log('waiting commercial');
    }, 500);

    commercialFindLimit--;
  }

  const ads = Array.from(document.querySelectorAll("[id^='criteo_slot_']"));
  const ioc = Array.from(document.getElementsByClassName('inst_overlap_cover'));
  const gap = Array.from(document.getElementsByClassName('google-auto-placed'));
  for (const ad of ads.concat(ioc).concat(gap)) {
    ad.hidden = true;
  }

  // Start play
  var chord = document.getElementById('my-chord-data');
  if (!!chord) {
    chord.click();
  }
  keyselect.scrollIntoView();
}

main();