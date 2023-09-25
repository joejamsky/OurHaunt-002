import { swapTexture } from './app.js';

const scrollablePortalDivs = document.getElementsByClassName('portal-list');

Array.from(scrollablePortalDivs).forEach(item => {
    item.addEventListener('scroll', function() {
      if (item.scrollTop === 0) {
          item.classList.remove('scroll-up')
          item.classList.add('scroll-down')
        } else if (item.scrollTop + item.clientHeight > item.scrollHeight - 10) {
          item.classList.add('scroll-up')
          item.classList.remove('scroll-down')
        } else {
          item.classList.add('scroll-down')
          item.classList.add('scroll-up')
        }
    }); 
})


$('.portal-list').each(function() {
    const portalItems = $(this).find(".portal-item");

    portalItems.click(function(e) {
      var $this = $(this);
      if ($this.hasClass("active")) {
        $this.removeClass("active");
      } else {
        portalItems.removeClass("active");
        $this.addClass("active");
      }
      // swapTexture(this.dataset.texture);

      swapTexture(1);
    });
})



