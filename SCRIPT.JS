// Optimized Image Converter
const imageInput = document.getElementById('imageInput');
const convertButton = document.getElementById('convertButton');
const formatSelect = document.getElementById('formatSelect');
const progressBar = document.getElementById('progressBar');
const downloadButton = document.getElementById('downloadButton');

imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // Limit file size to 5MB
        alert("File size too large! Please upload an image smaller than 5MB.");
        return;
    }
});

convertButton.addEventListener('click', function() {
    const file = imageInput.files[0];
    const format = formatSelect.value;
    if (!file) {
        alert('Please choose an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            requestAnimationFrame(() => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const MAX_WIDTH = 800;
                const scaleFactor = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scaleFactor;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Convert canvas to Blob (async)
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    downloadButton.href = url;
                    downloadButton.download = `converted_image.${format}`;
                    downloadButton.style.display = "block";
                }, `image/${format}`);
            });
        };
        img.src = event.target.result;
    };
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
            convertButton.disabled = false;
        }
    }, 500);
});

// PDF Converter
const pdfInput = document.getElementById('pdfInput');
const convertPdfButton = document.getElementById('convertPdfButton');
const downloadPdfButton = document.getElementById('downloadPdfButton');
const pdfProgressBar = document.getElementById('pdfProgressBar');

convertPdfButton.addEventListener('click', () => {
    const file = pdfInput.files[0];
    if (!file) {
        alert('Please choose an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const pdf = new jsPDF();
        pdf.addImage(event.target.result, 'JPEG', 10, 10, 180, 0);
        pdf.save('converted_image.pdf');
        downloadPdfButton.style.display = 'block';
    };
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
    const file = bgInput.files[0];
    if (!file) {
        alert('Please choose an image file.');
        return;
    }

    if (trialsRemaining > 0) {
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
        }, 500);
    } else {
        alert('You have used all your free trials. Please purchase premium to continue.');
    }
});
