import { swapTexture } from './app.js';

const scrollablePortalDivs = document.getElementsByClassName('portal-list');
let portalStatus = {
  type: false,
  candle: false,
  focus: false
}
let portalOpen = false

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
    });
})

$('.glyph-list .portal-item').each(function() {
  $(this).click(function(e) {
    e.preventDefault();
    const dataDetail = $(e.target).closest('.portal-item').attr('data-detail');
    handlePortalCheck('type', dataDetail);
    // swapTexture(this.dataset.index, e.target.classList.contains('active'));  //This is setup to add the textures to the screen overlay
  })
})

$('.candle-list .portal-item').each(function() {
  $(this).click(function(e) {
    e.preventDefault();
    const dataDetail = $(e.target).closest('.portal-item').attr('data-detail');
    handlePortalCheck('candle', dataDetail);
  })
})


$('.focus-list .portal-item').each(function() {
  $(this).click(function(e) {
    e.preventDefault();
    const dataDetail = $(e.target).closest('.portal-item').attr('data-detail');
    handlePortalCheck('focus', dataDetail);
  })
})

const handlePortalCheck = (item, detail) => {
  console.log('item',item)
  console.log('GLOBAL_ENTITY[item]',GLOBAL_ENTITY[item])
  console.log('detail',detail)
  console.log('check',GLOBAL_ENTITY[item].toLowerCase() === detail)
  if (GLOBAL_ENTITY[item].toLowerCase() === detail) {
    portalStatus[item] = !portalStatus[item]; // Toggle the status
  } else {
    portalStatus[item] = false; // Reset to false if it doesn't match
  }

  portalOpen = areAllTrue(portalStatus)
  if(portalOpen){
    $('.portal-module').addClass('active')
    $('.judgement-row').removeClass('hide')
  } else {
    $('.portal-module').removeClass('active')
    $('.judgement-row').addClass('hide')
  }
}

function areAllTrue(portalStatus) {
  for (let key in portalStatus) {
    if (portalStatus.hasOwnProperty(key) && !portalStatus[key]) {
      return false;
    }
  }
  return true;
}