document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".feedback-form");
    const inputs = form.querySelectorAll("input, textarea");

    // Validasi Formulir saat dikirim
    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Mencegah pengiriman default

        let valid = true;
        inputs.forEach((input) => {
            if (!input.value.trim()) {
                showError(input, "Field ini harus diisi!");
                valid = false;
            } else {
                clearError(input);
            }
        });

        if (valid) {
            // Simulasi pengiriman
            showNotification("success", "Terima kasih atas saran Anda!");
            form.reset(); // Reset formulir
        } else {
            showNotification("error", "Harap isi semua field dengan benar!");
        }
    });

    // Fungsi untuk menampilkan error
    function showError(input, message) {
        const error = document.createElement("span");
        error.className = "error-message";
        error.textContent = message;
        input.classList.add("error");
        if (!input.nextElementSibling) {
            input.parentNode.appendChild(error);
        }
    }

    // Fungsi untuk menghapus error
    function clearError(input) {
        input.classList.remove("error");
        if (input.nextElementSibling) {
            input.nextElementSibling.remove();
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Ambil elemen-elemen DOM yang dibutuhkan
        const form = document.getElementById('feedback-form');
        const submitButton = document.getElementById('submit-button');
        const statusMessage = document.getElementById('status-message');
        const emailInput = document.getElementById('email');
      
        // Cek jika ada tanggal pengiriman sebelumnya di localStorage
        const lastSubmitTime = localStorage.getItem('lastSubmitTime');
        const currentTime = new Date().getTime();
        const timeLimit = 2 * 24 * 60 * 60 * 1000; // 2 Hari dalam milidetik
      
        // Jika sudah 2 hari atau lebih sejak pengiriman terakhir, izinkan pengiriman
        if (lastSubmitTime && currentTime - lastSubmitTime < timeLimit) {
          const remainingTime = timeLimit - (currentTime - lastSubmitTime);
          const remainingDays = Math.ceil(remainingTime / (24 * 60 * 60 * 1000));
          submitButton.disabled = true;
          statusMessage.textContent = `Anda dapat mengirimkan saran lagi setelah ${remainingDays} hari.`;
        } else {
          // Jika belum ada pengiriman atau sudah lebih dari 2 hari
          submitButton.disabled = false;
          statusMessage.textContent = '';
        }
      
        // Jika ada email yang disimpan sebelumnya, isi input email dengan email tersebut
        const savedEmail = localStorage.getItem('savedEmail');
        if (savedEmail) {
          emailInput.value = savedEmail;
        }
      
        // Fungsi untuk menangani pengiriman form
        form.addEventListener('submit', function (e) {
          e.preventDefault(); // Mencegah halaman reload
      
          // Simpan email yang digunakan pada pengiriman
          localStorage.setItem('savedEmail', emailInput.value);
      
          // Kirimkan saran ke server (misalnya menggunakan AJAX atau fetch)
          alert('Terima kasih atas saran atau pengaduan Anda!');
      
          // Setelah pengiriman, simpan waktu pengiriman
          localStorage.setItem('lastSubmitTime', new Date().getTime());
      
          // Disable tombol kirim dan tampilkan pesan
          submitButton.disabled = true;
          statusMessage.textContent = 'Terima kasih! Anda dapat mengirimkan saran lagi setelah 2 hari.';
        });
      });      

// Fungsi untuk menampilkan notifikasi
function showNotification(message) {
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
  
    // Tambahkan notifikasi ke dalam body
    document.body.appendChild(notification);
  
    // Tampilkan notifikasi dengan animasi
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);
  
    // Sembunyikan dan hapus notifikasi setelah 3 detik
    setTimeout(() => {
      notification.classList.remove('show');
      notification.classList.add('hide');
  
      // Hapus elemen dari DOM setelah animasi keluar selesai
      setTimeout(() => {
        notification.remove();
      }, 500); // Durasi animasi keluar
    }, 3000); // Durasi notifikasi tampil
  }
  
  // Contoh penggunaan (bisa dipanggil setelah submit formulir)
  document.querySelector('.feedback-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Cegah reload halaman
    showNotification('Terima Kasih atas Saran Anda!');
  });
  

});
