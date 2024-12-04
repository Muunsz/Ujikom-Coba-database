document.addEventListener('DOMContentLoaded', function() {
    const siswaInfoDiv = document.getElementById('siswa-info');
    const nilaiTableBody = document.querySelector('#nilai-table tbody');
    const absensiInfoDiv = document.getElementById('absensi-info');

    fetch('get_raport.php')
        .then(response => response.json())
        .then(data => {
            // Populate siswa info
            siswaInfoDiv.innerHTML = `
                <p><strong>Nama:</strong> ${data.siswa.nama_lengkap}</p>
                <p><strong>NIS:</strong> ${data.siswa.nis}</p>
                <p><strong>Kelas:</strong> ${data.siswa.kelas}</p>
                <p><strong>Tahun Ajaran:</strong> ${data.tahun_ajaran}</p>
                <p><strong>Semester:</strong> ${data.semester}</p>
            `;

            // Populate nilai table
            data.nilai.forEach(nilai => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${nilai.nama_mapel}</td>
                    <td>${nilai.kkm}</td>
                    <td>${nilai.nilai_pengetahuan}</td>
                    <td>${nilai.nilai_keterampilan}</td>
                    <td>${nilai.guru_pengajar}</td>
                `;
                nilaiTableBody.appendChild(row);
            });

            // Populate absensi info
            absensiInfoDiv.innerHTML = `
                <h3>Absensi</h3>
                <p><strong>Sakit:</strong> ${data.absensi.sakit} hari</p>
                <p><strong>Izin:</strong> ${data.absensi.izin} hari</p>
                <p><strong>Tanpa Keterangan:</strong> ${data.absensi.tanpa_keterangan} hari</p>
            `;
        })
        .catch(error => {
            console.error('Error:', error);
            siswaInfoDiv.textContent = 'Terjadi kesalahan saat mengambil data raport.';
        });
});