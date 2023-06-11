const uploadBox = document.querySelector('.upload_box');
previewImg = uploadBox.querySelector('img');
fileInput = uploadBox.querySelector('input'); 
widthInput = document.querySelector('.width input');
heightInput = document.querySelector('.height input');
ratioInput = document.querySelector('.ratio input');
qualityInput = document.querySelector('quality input');
downloadBtn = document.querySelector('.download_btn');

let ogImageRatio;

const loadFile = function(e) {
    const file = e.target.files[0];
    if(!file) return //return if user hasn't selected any file
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener('load', () => {
      widthInput.value = previewImg.naturalWidth;
      heightInput.value = previewImg.naturalHeight;
      ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
      document.querySelector('.wrapper').classList.add('active');  
    })

    console.log(file);
}

widthInput.addEventListener('keyup', () => {
  //getting height according to the ratio checkbox status
  const height = ratioInput.checked ? widthInput.value * ogImageRatio : heightInput.value;
  heightInput.value = Math.floor(height);
})
heightInput.addEventListener('keyup', () => {
  const width = ratioInput.checked ? heightInput.value / ogImageRatio : widthInput.value;
  widthInput.value = Math.floor(width);
})

const resizeAndDownload = function() {
  const canvas = document.createElement('canvas');
  const a = document.createElement('a');
  const ctx = canvas.getContext('2d');

  //if quality ckeckbox is ckecked, pass 0.7 (70%) to ImgQuality else pass 1.0 (100%)
  const imgQuality = qualityInput.checked ? 0.1 : 1;
  
  //setting canvas height & width according to the input values
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  //drawing user selected image onto the canvas
  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
  
  a.href = canvas.toDataURL('image/jpg', imgQuality);
  a.download = new Date().getTime();
  a.click() // clicking <a> element so the file download
}

downloadBtn.addEventListener('click', resizeAndDownload);

fileInput.addEventListener('change', loadFile);
uploadBox.addEventListener('click', () => fileInput.click());
