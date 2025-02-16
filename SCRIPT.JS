// Image Tools
const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const resizeButton = document.getElementById('resizeButton');
const downloadButton = document.getElementById('downloadButton');
const convertToPdfButton = document.getElementById('convertToPdfButton');
let currentImage;

// Define drawImage function FIRST
function drawImage(img) {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
}

imageInput.addEventListener('change', (event) => {
    const file = event.target.files;
    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
            currentImage = img;
            drawImage(img); // Now drawImage is defined
        };
    };

    reader.readAsDataURL(file);
});


resizeButton.addEventListener('click', () => {
    if (currentImage) {
        const newWidth = currentImage.width * 0.5;
        const newHeight = currentImage.height * 0.5;

        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(currentImage, 0, 0, newWidth, newHeight);
    }
});

downloadButton.addEventListener('click', () => {
    if (currentImage) {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'resized_image.png';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});

convertToPdfButton.addEventListener('click', () => {
    if (currentImage) {
        alert("Converting to PDF (Server-side recommended)"); // Placeholder
    }
});

// PDF Tools (Client-Side - Very Basic)
const pdfInput = document.getElementById('pdfInput');
const pdfToImageButton = document.getElementById('pdfToImageButton');

pdfToImageButton.addEventListener('click', () => {
    if (pdfInput.files.length > 0) {
        alert("Converting PDF to Image (Client-side is very limited. Server-side recommended.)");
    } else {
        alert("Please select a PDF file.");
    }
});

// Progress Bar Functions
function showProgressBar() {
    document.getElementById("progress-bar").style.display = "block";
}

function updateProgressBar(percentage) {
    document.getElementById("progress-bar").style.width = percentage + "%";
}

function hideProgressBar() {
    document.getElementById("progress-bar").style.display = "none";
    updateProgressBar(0); // Reset progress
}

// Example of progress bar usage (in convertToPdfButton - replace with actual logic)
convertToPdfButton.addEventListener('click', () => { // Correct event listener
    if (currentImage) {
        showProgressBar();

        setTimeout(() => {
            updateProgressBar(75);

            setTimeout(() => {
                updateProgressBar(100);

                setTimeout(() => {
                    alert("PDF Conversion Complete (Placeholder)");
                    hideProgressBar();
                }, 500);
            }, 1500);
        }, 1000);
    }
});

// Feedback Form
const feedbackForm = document.getElementById('feedbackForm');
feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedbackText = document.getElementById('feedbackText').value;

    if (feedbackText.trim()!== "") {
        alert("Feedback submitted (Placeholder - would send to server):\n" + feedbackText);
        document.getElementById('feedbackText').value = "";
    } else {
        alert("Please enter some feedback.");
    }
});
