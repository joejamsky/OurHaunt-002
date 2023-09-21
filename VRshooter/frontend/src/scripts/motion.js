const motionIdentifier = document.getElementById("motion-identifier");

function convertRange(value, min1 = -10, max1 = 10, min2 = 0, max2 = 100) {
    var range1 = max1 - min1;
    var range2 = max2 - min2;
    var scaledValue = (value - min1) / range1;  // Scale the value to a range of 0 to 1
    var convertedValue = (scaledValue * range2) + min2;  // Scale the value to the desired range
    return convertedValue;
}

const updatePip = (position) => {
    motionIdentifier.style.top = `${convertRange(position.y)}%`
    motionIdentifier.style.left = `${convertRange(position.x)}%`
    motionIdentifier.style.transform = `translate(-${convertRange(position.x)}%, -${convertRange(position.y)}%)`
}