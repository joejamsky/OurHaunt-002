const polyline = document.getElementById('line');
  
function jitterPolylineY(polyline, amplitude, frequency, condition) {
    const points = polyline.points;
    const numPoints = points.length;
    const middleIndex = Math.floor(numPoints / 2); // Get the index of the middle point

    const minY = 0; // Minimum value for y coordinate
    const maxY = 100; // Maximum value for y coordinate

    let invert = false; // Initialize the inversion flag


  
    const animate = () => {
      if (!condition) {
        return; // Exit the loop if the condition is no longer true
      }
  
      const time = Date.now() * frequency;
      const inversionFactor = invert ? -1 : 1; // Determine the inversion factor

  
      for (let i = 1; i < numPoints - 1; i++) {
        const distanceFromMiddle = Math.abs(i - middleIndex); // Calculate the distance from the middle

        // Adjust the amplitude based on the distance from the middle
        const adjustedAmplitude = amplitude * (1 - distanceFromMiddle / middleIndex) * inversionFactor;
      
        const yOffset = Math.sin(time + i) * adjustedAmplitude;


        const newY = Math.max(minY, Math.min(maxY, points[i].y + yOffset));
        points[i].y = newY;
      }

      invert = !invert; // Toggle the inversion flag after each loop iteration

  
      setTimeout(() => {
        requestAnimationFrame(animate);
      }, 33);      
    };
  
    animate();
  }
  
  

const listenButton = document.getElementById('listen');
listenButton.addEventListener('click', () => {
    jitterPolylineY(polyline, 3, 100, true);

})