document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('nilai-form');
    const messageDiv = document.getElementById('message');

    // Fetch students and populate the select
    fetch('get_siswa.php')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('siswa');
            data.forEach(siswa => {
                const option = document.createElement('option');
                option.value = siswa.id;
                option.textContent = `${siswa.nis} - ${siswa.nama_lengkap} (${siswa.kelas})`;
                select.appendChild(option);
            });
        });

    // Fetch mata pelajaran and populate the select
    fetch('get_mapel.php')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('mapel');
            data.forEach(mapel => {
                const option = document.createElement('option');
                option.value = mapel.id;
                option.textContent = mapel.nama_mapel;
                select.appendChild(option);
            });
        });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch('input_nilai.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status) {
                messageDiv.textContent = data.message;
                messageDiv.className = 'message success';
                form.reset();
            } else {
                messageDiv.textContent = data.message;
                messageDiv.className = 'message error';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            messageDiv.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
            messageDiv.className = 'message error';
        });
    });


    function saveReportData(fotoURL) {
        const formData = new FormData(reportForm);
        const reportData = Object.fromEntries(formData.entries());
        reportData.fotoURL = fotoURL;

        if (editIndex > -1) {
            // Update the report being edited
            reports[editIndex] = reportData;
            editIndex = -1; // Reset after editing
        } else {
            // Add new report
            reports.push(reportData);
        }

        saveReports();
        renderReports();
        reportForm.reset();
        delete reportForm.dataset.fotoURL; // Clear the stored photo URL
        alert('Raport berhasil disimpan!');
    }

    reportTable.addEventListener('click', function(e) {
        if (e.target.classList.contains('editBtn')) {
            console.log("Edit button clicked");
            editIndex = parseInt(e.target.dataset.index);
            const report = reports[editIndex];
            console.log("Report to Edit:", report); // Debug

            if (report) {
                Object.keys(report).forEach((key) => {
                    const field = reportForm.elements[key];
                    if (field) {
                        if (field.type === 'file') {
                            // For file input, we can't set its value directly
                            // Instead, we'll store the photo URL in the form's dataset
                            reportForm.dataset.fotoURL = report.fotoURL || '';
                        } else {
                            field.value = report[key];
                        }
                    }
                });

                // Handle ekstrakurikuler fields
                for (let i = 1; i <= 3; i++) {
                    const ekskulField = reportForm.elements[`ekskul${i}`];
                    const nilaiEkskulField = reportForm.elements[`nilaiEkskul${i}`];
                    if (ekskulField && nilaiEkskulField) {
                        ekskulField.value = report[`ekskul${i}`] || '';
                        nilaiEkskulField.value = report[`nilaiEkskul${i}`] || '';
                    }
                }

                window.scrollTo(0, reportForm.offsetTop); // Scroll to the top to see the form
            } else {
                console.error("Report not found!");
            }
        } else if (e.target.classList.contains('deleteBtn')) {
            const index = parseInt(e.target.dataset.index);
            if (confirm('Apakah Anda yakin ingin menghapus raport ini?')) {
                reports.splice(index, 1);
                saveReports();
                renderReports();
            }
        }
    });

    addReportBtn.addEventListener('click', function() {
        reportForm.reset();
        editIndex = -1; // Reset edit mode when adding a new report
        delete reportForm.dataset.fotoURL; // Clear the stored photo URL
        window.scrollTo(0, reportForm.offsetTop);
    });

    function tambahEkskul() {
        ekskulCounter++;
        const ekstrakurikulerDiv = document.getElementById('ekstrakurikuler');
        const newEkskulDiv = document.createElement('div');
        newEkskulDiv.innerHTML = `
            <label for="ekskul${ekskulCounter}">Ekstrakurikuler ${ekskulCounter}:</label>
            <input type="text" id="ekskul${ekskulCounter}" name="ekskul${ekskulCounter}">
            <select id="nilaiEkskul${ekskulCounter}" name="nilaiEkskul${ekskulCounter}">
                <option value="">Pilih</option>
                <option value="Baik">Baik</option>
                <option value="Cukup">Cukup</option>
                <option value="Kurang">Kurang</option>
            </select>
        `;
        ekstrakurikulerDiv.appendChild(newEkskulDiv);
    }

    function toggleMenu() {
        const navUl = document.querySelector('nav ul');
        navUl.classList.toggle('show');
    }

    // Close the mobile menu when a link is clicked
    document.querySelectorAll('nav a').forEach((link) => {
        link.addEventListener('click', () => {
            document.querySelector('nav ul').classList.remove('show');
        });
    });

    renderReports();
});

