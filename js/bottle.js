document.addEventListener('DOMContentLoaded', function () {
  const bottle = document.querySelector('.bottle');
  const waveEl = document.querySelector('.wave');
  const indianaEl = document.querySelector('.indiana');
  let bottleFull = false;
  let fillLevel = 0;
  const fillSpeed = 2;
  let scrollTimer;

  function updateFill(delta, chug) {
    if (!bottleFull) {
      fillLevel = Math.min(100, fillLevel + (delta * fillSpeed) / 100);
      waveEl.style.top = 100 - fillLevel + '%';
      if (chug) {
        triggerChugging();
      }
      if (fillLevel >= 100) {
        bottleFull = true;
      } else {
        window.scrollTo(0, 0);
      }
    }
  }

  function triggerChugging() {
    bottle.classList.add('chugging');
    indianaEl.classList.add('chugging');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      bottle.classList.remove('chugging');
      indianaEl.classList.remove('chugging');
    }, 150);
  }

  window.addEventListener('scroll', function () {
    updateFill(window.scrollY, true);
  });

  window.addEventListener(
    'wheel',
    function (e) {
      updateFill(e.deltaY, true);
      if (!bottleFull) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  let touchStartY = 0;
  window.addEventListener(
    'touchstart',
    function (e) {
      touchStartY = e.touches[0].clientY;
    },
    { passive: false }
  );

  window.addEventListener(
    'touchmove',
    function (e) {
      if (!bottleFull) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        updateFill(deltaY, true);
        e.preventDefault();
        touchStartY = touchY;
      }
    },
    { passive: false }
  );

  updateFill(1, false);
});
