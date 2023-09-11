document.addEventListener("DOMContentLoaded", function () {

    const filterSwitches = document.querySelectorAll('.filter-switch input');
    const filterSwitchesArray = Array.from(filterSwitches);
    const filterBulbs = document.getElementsByClassName('filter-light-bulb');
    const filterBulbsArray = Array.from(filterBulbs);
    const filterOverlay = document.getElementById('filter-overlay');

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
    
        // Set the filterOverlay background color to transparent if no switches are activated
        if (redValue === 0 && greenValue === 0 && blueValue === 0) {
            filterOverlay.style.backgroundColor = 'transparent';
        }
    }

    filterSwitchesArray.forEach((checkbox, i) => {
        checkbox.addEventListener('change', updateFilterOverlayColor);

    
        //     const bulb = filterBulbsArray[i];
        //     console.log(checkbox.classList)
            

        //     if (checkbox.checked) {
        //         if (checkbox.classList.contains('r-switch')) {
        //             filterOverlay.style.backgroundColor = `rgba(${overlayColor}, 0.5)`;
        //             redValue = 255; // Activate red component
        //         } else if (checkbox.classList.contains('g-switch')) {
        //             filterOverlay.style.backgroundColor = `rgba(${overlayColor}, 0.5)`;

        //             greenValue = 255; // Activate green component
        //         } else if (checkbox.classList.contains('b-switch')) {
        //             filterOverlay.style.backgroundColor = `rgba(${overlayColor}, 0.5)`;

        //             blueValue = 255; // Activate blue component
        //         }

        //         bulb.classList.remove('filter-light-off');
        //     } else {
        //         bulb.classList.add('filter-light-off');
        //     }
    });


});

