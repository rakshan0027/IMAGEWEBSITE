document.getElementById('imageInput').addEventListener('change', function() {
    const fileName = this.files? this.files.name: 'No file chosen';
    document.getElementById('file-name').textContent = fileName;
});

// Add your conversion logic here
document.getElementById('convertButton').addEventListener('click', function() {
    // Get the selected format
    const format = document.getElementById('format').value;

    // Get the chosen file
    const file = document.getElementById('imageInput').files;

    // Placeholder for conversion logic
    if (file) {
        alert(`Converting ${file.name} to ${format.toUpperCase()}... (Placeholder)`);
    } else {
        alert('Please choose a file to convert.');
    }
});
