
let controls = `<nav class="tools">
  <button class="button-apply" style="display:none"><span>Apply </span></button>
  <span style="display:none" class="input-contrast-container"><input type="range" class="input-contrast" name="contrast" min="0" max="100" value="50" ></span>
  <button class="button-cancel" style="display:none"><span>Cancel capture</span></button>
  <button class="button-delete" style="display:none"><span>Delete capture</span></button>
  <button class="button-imposition"><span>Imposition</span></button>
  <button class="button-print" style="display:none"><span>Print</span></button>
</nav>`

let modal = `<div class="modal">
  <button class="button-modal"></button>
</div>`;

// btns & inputs
var btn_modal;
function createModal() {
  document.body.insertAdjacentHTML('beforeend', modal);
  
  btn_modal = document.querySelector(".button-modal");
  btn_modal.onclick = (e) => {
    document.body.removeChild(document.querySelector('.modal'));
  }
}


// init video request on start


// init double page
var targetdoublepage = null;

// treshold default
var threshold_value = 50;

// btns & inputs
var btn_capture, btn_apply, input_contrast, input_brightness, btn_cancel, btn_delete;
function createControls() {
  document.body.insertAdjacentHTML('afterbegin', controls);
  document.querySelector(".tools").style.display = 'flex';
  btn_capture = document.querySelector(".button-capture");
  btn_apply = document.querySelector(".button-apply");
  input_contrast = document.querySelector(".input-contrast");
  btn_cancel = document.querySelector(".button-cancel");
  btn_delete = document.querySelector(".button-delete");
  threshold_value = input_contrast.value;
}

function showCapture() {
  document.querySelector(".button-capture").style.display = 'block';
}
function hideCapture() {
  document.querySelector(".button-capture").style.display = 'none';
}

function showApply() {
  document.querySelector(".button-apply").style.display = 'block';
  document.querySelector(".button-cancel").style.display = 'block';
  document.querySelector(".input-contrast-container").style.display = 'flex';
}
function hideApply() {
  document.querySelector(".button-apply").style.display = 'none';
  document.querySelector(".button-cancel").style.display = 'none';
  document.querySelector(".input-contrast-container").style.display = 'none';
}

function showDelete() {
  document.querySelector(".button-delete").style.display = 'block';
}
function hideDelete() {
  document.querySelector(".button-delete").style.display = 'none';
}

function fillControls(page){
  // identifies which doublepage we should modify
  var doublepage = null;
  // data-doublepagge is set on imposition, but
  // doublepage might not have been set (imposition is not done)  
  if(page.dataset.doublepage === undefined){
    var pages = document.querySelectorAll(".pagedjs_page");
    var pageNumber = parseInt(page.dataset.pageNumber);
    if (pageNumber == 1 || pageNumber == pages.length){
      pages[0].dataset.doublepage = 0;
      pages[pages.length - 1].dataset.doublepage = 0;
      doublepage = 0;
    } else {
      doublepage = Math.ceil((pageNumber - 1) / 2);
      if(pageNumber % 2 == 0){        
        page.dataset.doublepage = doublepage;
        page.nextElementSibling.dataset.doublepage = doublepage;
      } else {
        page.dataset.doublepage = doublepage;
        page.previousElementSibling.dataset.doublepage = doublepage;
      }
    }
  } else {
    var doublepage = page.dataset.doublepage;
  }
  targetdoublepage = document.querySelectorAll("[data-doublepage='" + doublepage + "']");
}

function deleteCnvasesAndVideos(){
  document.querySelectorAll('canvas').forEach(canvas => {
    canvas.parentElement.removeChild(canvas);
  });
  document.querySelectorAll('video').forEach(video => {
    video.parentElement.removeChild(video);
  });
}

function updateHandler(page) {
  
  // Width, height and ration
  var w, h;
  // videos stores two video elements
  // video is used to draw image from a single source
  var videos = [], video, canvases = [], inte;


  // Cancel capture
  btn_cancel.onclick = (e) => {
    hideApply();
    hideCapture();
    deleteCnvasesAndVideos();
  };

  // Change contrast
  input_contrast.onchange = (e) => {
    threshold_value = input_contrast.value;
    console.log(input_contrast.value);
  };

  // Delete images
  btn_delete.onclick = (e) => {
    targetdoublepage.forEach((page) => {
      var img = page.querySelector('.background-image');
      page.removeChild(img);
    })
    deleteCnvasesAndVideos();
    hideDelete();
  };



  // Capture webcam
  btn_capture.onclick = (e) => {
   
    // reset arrays
    videos = [], video = null, inte = null;
    hideCapture();
    showApply();

    if(canvases.length){
      var c1 = canvases[1], c1c = c1.getContext("2d");
      var c2 = canvases[1], c2c = c2.getContext("2d");
      var bc = canvases[2], bcc = bc.getContext('2d');
    } else {
      var c1 = document.createElement('canvas'), c1c = c1.getContext('2d');
      var c2 = document.createElement('canvas'), c2c = c2.getContext('2d');
      var bc = document.createElement('canvas'), bcc = bc.getContext('2d');
      w = c1.width = c2.width = bc.width =  1280;
      h = c1.height = c2.height = bc.height =  720;
      canvases = [c1, c2, bc];
    }

    function copyCanvas() {
      c1.fillRect(0, 0, w, h);
      c2.fillRect(0, 0, w, h);
      c1.drawImage(v, 0, 0, w, h);
      c2.drawImage(v, 0, 0, w, h);
    }

    function filterCam(video) {
      clearInterval(inte);
      inte = setInterval(()=>{threshold(video)}, 33);
    }

    function threshold(video) {
      var pixelData = getPixelData(video, w, h);
      var t = threshold_value;
      for (var i = 0; i < pixelData.data.length; i += 4 ) {
        // Get the RGB values for this pixel
        var r = pixelData.data[i];
        var g = pixelData.data[i+1];
        var b = pixelData.data[i+2];
        // Compare each pixel's greyscale value to the threshold value...
        var value = (0.2126 * r + 0.7152 * g + 0.0722 * b >= t) ? 255 : 0;
        // ...and set the colour based on the result
        pixelData.data[i] = pixelData.data[i+1] = pixelData.data[i+2] = value;
      }
      // Draw the data on the visible canvas
      c1c.putImageData(pixelData, 0, 0);
      c2c.putImageData(pixelData, 0, 0);
    }

    // Draws the contents of the video element onto the background canvas and returns the image data
    function getPixelData(v, w, h) {
      // Draw the video onto the backing canvas
      bcc.drawImage(v, 0, 0, w, h);
      // Grab the pixel data and work on that directly
      return bcc.getImageData(0, 0, w, h);
    }


    if (navigator.mediaDevices) {
      targetdoublepage.forEach((page, i) => {
        // vid
        var vid = page.querySelector('.background-video') || document.createElement("video");
        vid.className = "background-video";
        vid.setAttribute('playsinline', true);
        vid.setAttribute('autoplay', true);
        videos.push(vid);
        var img = page.querySelector('.background-image');
        if (img){
          img.insertAdjacentElement('afterend', vid);
        } else {
          page.prepend(vid);
        }   
        // canvas
        var c = canvases[i];
        c.className = "background-canvas";
        videos.push(vid);
        var vid = page.querySelector('.background-video');
        if (vid){
          vid.insertAdjacentElement('afterend', c);
        } else {
          page.prepend(c);
        }        
      });

      navigator.mediaDevices.getUserMedia({video: { facingMode: "user", width: 1280, height: 720 }})
        .then(function(stream) {
          videos.forEach(video => {
            video.srcObject = stream;
          });
          video = videos[0];     
          filterCam(video);
        })
        .catch(function(error) {
          document.body.textContent = 'Could not access the camera. Error: ' + error.name;
        });
    }
  };



  btn_apply.onclick = (e) => {
    
    targetdoublepage.forEach((page) => {
      var img = page.querySelector('.background-image') || document.createElement("img");
      var v = page.querySelector('.background-video');
      var filter = getComputedStyle(v)['filter'];
      img.className = "background-image";
      page.prepend(img);
      var src = canvases[0].toDataURL('image/png');
      img.src = src;
      console.log(filter);
      img.style.filter = filter;
      page.classList.add('has_background_image');
    })
    
    deleteCnvasesAndVideos();
    hideApply();
    showCapture();
    
  };
}

class MyHandler extends Paged.Handler {
  constructor(chunker, polisher, caller) {
    super(chunker, polisher, caller);
  }

  afterRendered(pages) {

    createModal();
    createControls();
    listentoPagesClicks();

    window.addEventListener('paged_imposed', () => {
      console.log("Imposion done :)")
      listentoPagesClicks();
    })    

    window.addEventListener('beforeprint', (event) => {
      console.log('Before print');
    });
    
    document.querySelector('.button-print').addEventListener('click', function () {
      window.print();
    })

  }
}
Paged.registerHandlers(MyHandler);

function listentoPagesClicks(){
  document.querySelectorAll('.pagedjs_page').forEach((page, num) => {
    page.addEventListener('click', function () {
      hideApply();
      fillControls(this);
      showCapture();
      if(this.classList.contains('has_background_image')){
        showDelete();
      }
      updateHandler(this);
    })
  })
}



function createCaptureHolders(){
  // unused 

  // var _pages = document.querySelectorAll("[data-order]");
  // var pages = Array.from(_pages);
  // pages.sort(sorter);
  // console.log(pages);
  // function sorter(a,b) {
  //   if(a.dataset.order < b.dataset.order) return -1;
  //   if(a.dataset.order > b.dataset.order) return 1;
  //   return 0;
  // }
  // var doublepages = [];      
  // while (pages.length > 0) doublepages.push(pages.splice(0, 2));

  // doublepages.forEach((doublepage, num) => {
  //   doublepage.forEach(page => {
  //     page.dataset.doublepage = num;
  //     // var img = document.createElement("img");
  //     // img.className="background-img img-" + page.dataset.order + " doublepage-" + num;
  //     // page.prepend(img);
  //   });
  // });
}