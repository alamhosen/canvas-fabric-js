const initCanvas = (id) => {
    return new fabric.Canvas(id, {
        width: 950,
        height: 500
    });
}

// set background

const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url, (img) => {
        canvas.backgroundImage = img
        canvas.renderAll()
    })
}


const canvas = initCanvas('canvas')
const bgUrl = ''

setBackground(bgUrl, canvas)

// upload images
const ctx = canvas.getContext('2d');
const reader = new FileReader();
const img = new Image();

const uploadImage = (e) => {
    reader.onload = () => {
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        }
        fabric.Image.fromURL(reader.result, img => {
            canvas.add(img)
            canvas.requestRenderAll()
        })
    }
    reader.readAsDataURL(e.target.files[0])

}

const imageLoader = document.getElementById('uploader');
imageLoader.addEventListener('change', uploadImage);

// download image
function download() {
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image
    link.download = 'image.png'
    link.click();
}

document.querySelector('button').addEventListener('click', download)

// clear canvas 
const clearCanvas = (canvas) =>{
    canvas.clear()
    const upload = document.getElementById('uploader').value='';
    
}

// mouse: wheel
canvas.on('mouse:wheel', function (opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom <= 1) {
        zoom = 1;
        canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
    }
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
});




