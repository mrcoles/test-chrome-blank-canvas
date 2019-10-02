// ## Main

const main = async () => {
  const canvasesElt = $("#canvases");

  const dims = [[1200, 28800, "#800080"], [1200, 4028, "#4848da"]];

  let totalWidth = 0;
  let totalHeight = 0;

  // create two canvas elements based on the width and height in `dims`
  const canvases = dims.map(([width, height, color], index) => {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    totalWidth += width;
    totalHeight += height;
    canvas.id = `canvas${index}`;
    canvas.dataset.color = color;
    log(`${canvas.id}: width=${width}, height=${height}`, color);
    return canvas;
  });

  // load our sample image that we will use in drawImage
  const sampleImgSrc = $("#image-link").href;
  const sampleImg = await loadImage(sampleImgSrc);
  log(`Loaded image: width=${sampleImg.width}, height=${sampleImg.height}`);

  // we will tile the sample image across both canvases
  for (let y = 0; y < totalHeight; y += sampleImg.height) {
    let canvasOffsetY = 0;

    for (let canvas of canvases) {
      // only draw the image if the current tile should appear on this canvas
      if (
        y > canvasOffsetY - sampleImg.height &&
        y < canvasOffsetY + canvas.height
      ) {
        let ctx = canvas.getContext("2d");
        log(
          `${canvas.id}: ctx.drawImage(sampleImg, 0, ${y - canvasOffsetY})`,
          canvas.dataset.color
        );
        ctx.drawImage(sampleImg, 0, y - canvasOffsetY);
      }

      canvasOffsetY += canvas.height;
    }
  }

  // insert the canvas elements into the dom
  canvases.forEach(canvas => {
    canvasesElt.appendChild(canvas);
  });
};

// ## Helpers

const $ = (sel, ctx = document) => ctx.querySelector(sel);

const loadImage = src =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = err => reject(err);
    img.src = src;
  });

let logCounter = 0;

const log = (msg, color) => {
  logCounter++;
  const elt = document.createElement("p");
  elt.textContent = msg;
  const dateText = document.createElement("span");
  Object.assign(dateText.style, {
    display: "inline-block",
    color: "#999",
    minWidth: "170px",
    paddingRight: "5px"
  });
  dateText.textContent = `[${logCounter}] ${_dateStr()}`;
  if (color) {
    elt.style.color = color;
  }
  elt.prepend(dateText);
  $("#log").appendChild(elt);
};

const _dateStr = date => {
  date = date || new Date();
  return `${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}.${date
    .getMilliseconds()
    .toString()
    .padStart(3, "0")}`;
};

// ## Run

main().catch(err => console.error(err));
