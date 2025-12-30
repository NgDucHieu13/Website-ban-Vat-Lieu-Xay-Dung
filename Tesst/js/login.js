document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn trang web load lại

            // Lấy giá trị từ input
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            // Logic kiểm tra giả lập (Ví dụ)
            if (email === "admin" && password === "1") {
                // Đăng nhập thành công
                alert("Đăng nhập thành công!");
                
                // Lưu trạng thái đăng nhập vào localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);

                // Chuyển hướng về trang chủ
                window.location.href = "admin.html";
            } else {
                // Đăng nhập thất bại
                showError("Email hoặc mật khẩu không chính xác!");
            }
        });
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
        
        // Tự động ẩn lỗi sau 3 giây
        setTimeout(() => {
            errorMessage.style.display = 'none';
        }, 3000);
    }
});