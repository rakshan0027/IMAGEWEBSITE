// Image Converter
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files;
    const fileName = file? file.name: 'No file chosen';
    document.getElementById('file-name').textContent = fileName;
});

document.getElementById('convertButton').addEventListener('click', function() {
    const file = imageInput.files;
    const format = formatSelect.value;

    if (!file) {
        alert('Please choose an image file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Convert canvas to blob and trigger download
            canvas.toBlob(function(blob) {
                const newFile = new File([blob], file.name.replace(/\..+$/, `.${format}`), {
                    type: `image/${format}`
                });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(newFile);
                link.download = newFile.name;
                link.click();
            }, `image/${format}`);

            // jsPDF for basic image-to-PDF (single image, simple)
            const pdf = new jsPDF();
            pdf.addImage(canvas.toDataURL(`image/${format}`), format.toUpperCase(), 10, 10, 180, 0);
            pdf.save('converted_image.pdf');

        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);

    // Simulate conversion process
    convertButton.disabled = true;
    progressBar.style.width = '0%';
    progressBar.style.display = 'block';
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        progressBar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            alert('Image converted successfully!');
            downloadButton.style.display = 'block';
            convertButton.disabled = false;
        }
    }, 500); // Simulate conversion time
});

// --- Corrected downloadButton event listener ---
downloadButton.addEventListener('click', () => {
    const file = imageInput.files;
    const format = formatSelect.value;

    // Use the converted image data from the convertButton's logic
    // (You'll need to store this data appropriately in the convertButton's logic)
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(function(blob) {
                const newFile = new File([blob], file.name.replace(/\..+$/, `.${format}`), {
                    type: `image/${format}`
                });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(newFile);
                link.download = newFile.name;
                link.click();
            }, `image/${format}`);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
});
// --- End of corrected downloadButton event listener ---

// PDF Converter
const pdfInput = document.getElementById('pdfInput');
const convertPdfButton = document.getElementById('convertPdfButton');
const downloadPdfButton = document.getElementById('downloadPdfButton');
const pdfProgressBar = document.getElementById('pdfProgressBar');

convertPdfButton.addEventListener('click', () => {
    const file = pdfInput.files;

    if (!file) {
        alert('Please choose an image file.');
        return;
    }

    // Simulate conversion process
    convertPdfButton.disabled = true;
    pdfProgressBar.style.width = '0%';
    pdfProgressBar.style.display = 'block';
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        pdfProgressBar.style.width = progress + '%';
        if (progress >= 100) {
            clearInterval(interval);
            alert('Image converted to PDF successfully!');
            downloadPdfButton.style.display = 'block';
            convertPdfButton.disabled = false;
        }
    }, 500); // Simulate conversion time
});

downloadPdfButton.addEventListener('click', () => {
    const file = pdfInput.files;

    // Use the converted PDF data from the convertPdfButton's logic
    // (You'll need to store this data appropriately in the convertPdfButton's logic)
    const reader = new FileReader();
    reader.onload = function(event) {
        const pdf = new jsPDF();
        pdf.addImage(event.target.result, 'JPEG', 10, 10, 180, 0); // Assuming JPEG for now
        pdf.save('converted_image.pdf');

        const link = document.createElement('a');
        link.href = pdf.output('datauristring'); // Get the data URL
        link.download = 'converted_image.pdf';
        link.click();
    }
    reader.readAsDataURL(file);
});

// Background Remover
const bgInput = document.getElementById('bgInput');
const removeBgButton = document.getElementById('removeBgButton');
const downloadBgButton = document.getElementById('downloadBgButton');
const bgProgressBar = document.getElementById('bgProgressBar');
const trialsRemainingSpan = document.getElementById('trials-remaining');
let trialsRemaining = 5;

removeBgButton.addEventListener('click', () => {
    const file = bgInput.files;

    if (!file) {
        alert('Please choose an image file.');
        return;
    }

    if (trialsRemaining > 0) {
        // Simulate background removal process
        removeBgButton.disabled = true;
        bgProgressBar.style.width = '0%';
        bgProgressBar.style.display = 'block';
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            bgProgressBar.style.width = progress + '%';
            if (progress >= 100) {
                clearInterval(interval);
                alert('Background removed successfully!');
                downloadBgButton.style.display = 'block';
                removeBgButton.disabled = false;
                trialsRemaining--;
                trialsRemainingSpan.textContent = trialsRemaining;
                if (trialsRemaining === 0) {
                    alert('You have used all your free trials. Please purchase premium to continue.');
                }
            }
        }, 500); // Simulate removal time
    } else {
        alert('You have used all your free trials. Please purchase premium to continue.');
    }
});

downloadBgButton.addEventListener('click', () => {
    const file = bgInput.files;

    // Use the processed image data from the removeBgButton's logic
    // (You'll need to store this data appropriately in the removeBgButton's logic)
    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            canvas.toBlob(function(blob) {
                const newFile = new File([blob], file.name, {
                    type: file.type
                });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(newFile);
                link.download = newFile.name;
                link.click();
            }, file.type);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(file);
});

// Premium Button
const premiumButton = document.getElementById('premiumButton');

premiumButton.addEventListener('click', () => {
    // Replace this with actual redirect logic
    alert('Premium button clicked. Implement redirect to purchase page here.');
});
