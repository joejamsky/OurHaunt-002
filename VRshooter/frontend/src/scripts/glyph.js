const scrollableGlyphDivs = document.getElementsByClassName('glyph-list');

Array.from(scrollableGlyphDivs).forEach(item => {
    item.addEventListener('scroll', function() {
      if (item.scrollTop === 0) {
          item.classList.remove('scroll-up')
          item.classList.add('scroll-down')
        } else if (item.scrollTop + item.clientHeight === item.scrollHeight) {
          item.classList.add('scroll-up')
          item.classList.remove('scroll-down')
        } else {
          item.classList.add('scroll-down')
          item.classList.add('scroll-up')
        }
    }); 
})


$('.glyph-list').each(function() {
    const glyphItems = $(this).find(".glyph-item");

    glyphItems.click(function() {
      var $this = $(this);
      if ($this.hasClass("active")) {
        $this.removeClass("active");
      } else {
        glyphItems.removeClass("active");
        $this.addClass("active");
      }
    });
})



