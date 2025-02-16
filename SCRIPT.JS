// script.js - All the JavaScript from the previous response
document.getElementById('imageInput').addEventListener('change', function() {
    const fileName = this.files && this.files.length > 0? this.files.name: 'No file chosen';
    document.getElementById('file-name').textContent = fileName;
});

document.getElementById('convertButton').addEventListener('click', function() {
    const file = document.getElementById('imageInput').files;
    const format = document.getElementById('format').value;

    if (!file || file.length === 0) {
        alert('Please choose a file to convert.');
        return;
    }

    if (format === 'png') {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                // Convert canvas to blob and trigger download
                canvas.toBlob(function(blob) {
                    const newFile = new File([blob], file.name.replace(/\..+$/, '.png'), {
                        type: 'image/png'
                    });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(newFile);
                    link.download = newFile.name;
                    link.click();
                }, 'image/png');

                // jsPDF for basic image-to-PDF (single image, simple)
                const pdf = new jsPDF();
                pdf.addImage(canvas, 'PNG', 10, 10, 180, 0);
                pdf.save('converted_image.pdf');

            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    } else {
        alert(`Converting to ${format.toUpperCase()} requires server-side processing.`);
    }

});

// Image to PDF (Multiple Images - Limited Client-Side)
const imagesToPdfInput = document.getElementById('imagesToPdfInput');
const imagePreviews = document.getElementById('image-previews');
const createPdfButton = document.getElementById('createPdfButton');
let selectedImages =;

imagesToPdfInput.addEventListener('change', function() {
    selectedImages = Array.from(this.files).slice(0, 5);
    imagePreviews.innerHTML = '';

    selectedImages.forEach(image => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            img.classList.add('image-preview');
            imagePreviews.appendChild(img);
        }
        reader.readAsDataURL(image);
    });
});

createPdfButton.addEventListener('click', function() {
    if (selectedImages.length === 0) {
        alert('Please select at least one image.');
        return;
    }

    const pdf = new jsPDF();

    // Add each image to the PDF and trigger download after the last image
    let imagesAdded = 0;
    selectedImages.forEach((image, index) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                pdf.addPage();
                pdf.addImage(canvas, 'PNG', 10, 10, 180, 0);
                imagesAdded++;

                if (imagesAdded === selectedImages.length) {
                    pdf.save('multi_image_pdf.pdf');
                }
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(image);
    });
});


// PDF to Image (Client-Side - Extremely Limited)
const pdfToImageInput = document.getElementById('pdfToImageInput');
const pdfToImageConvert = document.getElementById('pdfToImageConvert');

pdfToImageConvert.addEventListener('click', () => {
    const file = pdfToImageInput.files;
    if (!file) {
        alert('Please select a PDF file.');
        return;
    }

    alert('Client-side PDF to Image conversion is extremely limited and not recommended.  Server-side processing is required.');

    // pdf.js could be used here, but it's complex and resource-intensive
    // and still has limitations.  It's not included in this example.
});
