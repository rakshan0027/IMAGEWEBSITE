// Image Converter
const imageInput = document.getElementById('imageInput');
const convertButton = document.getElementById('convertButton');
const downloadButton = document.getElementById('downloadButton');
const progressBar = document.getElementById('progressBar');
const formatSelect = document.getElementById('formatSelect');

convertButton.addEventListener('click', () => {
    const file = imageInput.files;
    const format = formatSelect.value;

    if (!file) {
        alert('Please choose an image file.');
        return;
    }

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

downloadButton.addEventListener('click', () => {
    // Replace this with actual download logic
    alert('Download button clicked. Implement actual download logic here.');
});

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
    // Replace this with actual download logic
    alert('Download PDF button clicked. Implement actual download logic here.');
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
    // Replace this with actual download logic
    alert('Download button clicked. Implement actual download logic here.');
});

// Premium Button
const premiumButton = document.getElementById('premiumButton');

premiumButton.addEventListener('click', () => {
    // Replace this with actual redirect logic
    alert('Premium button clicked. Implement redirect to purchase page here.');
});
