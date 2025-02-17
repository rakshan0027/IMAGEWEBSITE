// Image Converter
document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('file-name').textContent = file.name;
    }
});

document.getElementById('convertButton').addEventListener('click', function() {
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
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            // Convert canvas to blob and store download URL
            canvas.toBlob(function(blob) {
                const downloadURL = URL.createObjectURL(blob);
                document.getElementById('downloadButton').href = downloadURL;
                document.getElementById('downloadButton').download = `converted_image.${format}`;
                document.getElementById('downloadButton').style.display = 'block';
            }, `image/${format}`);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);

    // Simulate conversion progress
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
document.getElementById('convertPdfButton').addEventListener('click', function() {
    const file = pdfInput.files[0];

    if (!file) {
        alert('Please choose an image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const pdf = new jsPDF();
            pdf.addImage(img, 'JPEG', 10, 10, 180, 0);
            const pdfBlob = pdf.output('blob');
            const downloadURL = URL.createObjectURL(pdfBlob);
            
            document.getElementById('downloadPdfButton').href = downloadURL;
            document.getElementById('downloadPdfButton').download = 'converted_image.pdf';
            document.getElementById('downloadPdfButton').style.display = 'block';
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// Background Remover
document.getElementById('removeBgButton').addEventListener('click', function() {
    const file = bgInput.files[0];

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
                document.getElementById('trials-remaining').textContent = trialsRemaining;
            }
        }, 500);
    } else {
        alert('You have used all your free trials. Please purchase premium to continue.');
    }
});
