(function()
 {
/**
 * @type {HTMLVideoElement}
 */
let videoElement = null;
{
  let elements = document.getElementsByTagName('video');
  if (elements !== null && elements.length == 0)
  {
    videoElement = elements[0];
  }
  else if(elements !== null && elements.length > 0)
  {
    // Sort by area, grab largest video
    let sizedArray = Array.from(elements).map((value) => {
        let rect = value.getBoundingClientRect();
        return {area: rect.width * rect.height, el:value}
    });
    let sorted = sizedArray.sort((a, b) => a.area - b.area);
    videoElement = sorted[0].el;
  }
}

if (videoElement === null || videoElement == undefined)
{
  alert(`Video element not found`);
  return;
}

let transform = videoElement.style.transform || '';
let regScale  = /scale\(([\d.]+)\)/;

let startingScale = 1.34;

let regMatch = regScale.exec(transform);
if (regMatch != null && regMatch.length == 2)
{
  let existingScale = Number.parseFloat(regMatch[1]);
  if (!isNaN(existingScale))
  {
    startingScale = existingScale;
  }
  else
  {
    console.log(`Found existing scale of '${regMatch[1]}' but failed to parse it`);
  }
}

let scaleToStr = prompt('Set video scale', `${startingScale}`);
let scaleTo    = Number.parseFloat(scaleToStr);
if (isNaN(scaleTo))
{
  alert(`'${scaleToStr}' is not a valid number`);
  return
}

let newScaleCss = `scale(${scaleTo})`;

if (regScale.test(transform))
{
  transform = transform.replace(regScale, newScaleCss);
}
else
{
  if (transform.length == 0)
  {
    transform = newScaleCss;
  }
  else
  {
    if(transform.endsWith(';'))
    {
        transform = `${transform} ${newScaleCss};`;
    }
    else
    {
        transform = `${transform}; ${newScaleCss};`
    }
  }
}
console.log(`New transform attribute is ${transform}`);
videoElement.style.transform = transform;
 })()