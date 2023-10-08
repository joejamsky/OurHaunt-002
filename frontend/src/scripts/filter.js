let filterBool = true;

document.addEventListener("DOMContentLoaded", function () {

    const filterSwitches = document.querySelectorAll('.filter-switch input');
    const filterSwitchesArray = Array.from(filterSwitches);
    const filterBulbs = document.getElementsByClassName('filter-light-bulb');
    const filterBulbsArray = Array.from(filterBulbs);
    const filterOverlay = document.getElementById('filter-overlay');

    function rgbaToHexWithoutAlpha(rgbaColor) {
        // Parse the RGBA values
        const rgbaParts = rgbaColor.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/);
        if (!rgbaParts) {
          throw new Error('Invalid RGBA color format');
        }
      
        const red = parseInt(rgbaParts[1]);
        const green = parseInt(rgbaParts[2]);
        const blue = parseInt(rgbaParts[3]);
      
        // Convert to hexadecimal
        const redHex = red.toString(16).padStart(2, '0');
        const greenHex = green.toString(16).padStart(2, '0');
        const blueHex = blue.toString(16).padStart(2, '0');
      
        // Create the hex color string without alpha
        const hexColor = `${redHex}${greenHex}${blueHex}`;
      
        return hexColor;
    }


  

    const checkFilterMatch = (rgbaColor) => {
        if(rgbaColor === GLOBAL_ENTITY.Candles){
            filterBool = true;
        } else {
            filterBool = false;
        }
    };

    function updateFilterOverlayColor() {
        let redValue = 0;
        let greenValue = 0;
        let blueValue = 0;
    
        filterSwitchesArray.forEach((checkbox, i) => {
            const bulb = filterBulbsArray[i];
    
            if (checkbox.checked) {
                if (checkbox.classList.contains('r-switch')) {
                    redValue = 150; // Activate red component
                } else if (checkbox.classList.contains('g-switch')) {
                    greenValue = 150; // Activate green component
                } else if (checkbox.classList.contains('b-switch')) {
                    blueValue = 150; // Activate blue component
                }
    
                bulb.classList.remove('filter-light-off');
            } else {
                bulb.classList.add('filter-light-off');
            }
        });
    
        // Update the filterOverlay style with the calculated RGBA value
        const rgbaColor = `rgba(${redValue}, ${greenValue}, ${blueValue}, 0.15)`;
        filterOverlay.style.backgroundColor = rgbaColor;
    
        checkFilterMatch(rgbaToHexWithoutAlpha(rgbaColor));
        // Set the filterOverlay background color to transparent if no switches are activated
        if (redValue === 0 && greenValue === 0 && blueValue === 0) {
            filterOverlay.style.backgroundColor = 'transparent';
        }
    }

    filterSwitchesArray.forEach((checkbox, i) => {
        checkbox.addEventListener('change', updateFilterOverlayColor);
    });


});

