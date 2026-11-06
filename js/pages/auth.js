/**
 * SPORTZONE - Authentication Script (Login & Register)
 * Validation, Show/Hide Password, Password Strength Bar, and Mock User Session
 */

document.addEventListener('DOMContentLoaded', () => {
  initAuth();
});

function initAuth() {
  // Show / Hide password toggle
  const toggleBtns = document.querySelectorAll('.password-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.onclick = () => {
      const input = btn.previousElementSibling;
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
      } else {
        input.type = 'password';
        btn.innerHTML = '<i class="fa-regular fa-eye"></i>';
      }
    };
  });

  // Password strength meter on register
  const regPassword = document.getElementById('reg-password');
  const strengthFill = document.getElementById('password-strength-fill');
  const strengthText = document.getElementById('password-strength-text');

  if (regPassword && strengthFill && strengthText) {
    regPassword.addEventListener('input', () => {
      const val = regPassword.value;
      let score = 0;
      if (val.length >= 6) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      if (val.length === 0) {
        strengthFill.style.width = '0';
        strengthText.textContent = '';
      } else if (score <= 1) {
        strengthFill.style.width = '25%';
        strengthFill.style.backgroundColor = 'var(--color-danger)';
        strengthText.textContent = 'Mật khẩu yếu';
        strengthText.style.color = 'var(--color-danger)';
      } else if (score === 2) {
        strengthFill.style.width = '50%';
        strengthFill.style.backgroundColor = 'var(--color-warning)';
        strengthText.textContent = 'Mật khẩu trung bình';
        strengthText.style.color = 'var(--color-warning)';
      } else if (score === 3) {
        strengthFill.style.width = '75%';
        strengthFill.style.backgroundColor = '#3b82f6';
        strengthText.textContent = 'Mật khẩu khá mạnh';
        strengthText.style.color = '#3b82f6';
      } else {
        strengthFill.style.width = '100%';
        strengthFill.style.backgroundColor = 'var(--color-success)';
        strengthText.textContent = 'Mật khẩu rất mạnh';
        strengthText.style.color = 'var(--color-success)';
      }
    });
  }

  // --- Login Form Validation ---
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.onsubmit = (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('login-email');
      const passInput = document.getElementById('login-password');
      const errorEmail = document.getElementById('login-error-email');
      const errorPass = document.getElementById('login-error-password');

      let valid = true;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        if (errorEmail) { errorEmail.textContent = 'Email không hợp lệ'; errorEmail.style.display = 'block'; }
        valid = false;
      } else {
        emailInput.classList.remove('is-invalid');
        if (errorEmail) errorEmail.style.display = 'none';
      }

      if (passInput.value.trim().length < 6) {
        passInput.classList.add('is-invalid');
        if (errorPass) { errorPass.textContent = 'Mật khẩu tối thiểu 6 ký tự'; errorPass.style.display = 'block'; }
        valid = false;
      } else {
        passInput.classList.remove('is-invalid');
        if (errorPass) errorPass.style.display = 'none';
      }

      if (!valid) return;

      // Mock user login
      const mockUser = {
        fullname: emailInput.value.split('@')[0].toUpperCase(),
        email: emailInput.value.trim(),
        phone: '0901234567'
      };

      StorageUtil.setCurrentUser(mockUser);
      Toast.success('Đăng nhập thành công', `Chào mừng trở lại, ${mockUser.fullname}!`);

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    };
  }

  // --- Register Form Validation ---
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.onsubmit = (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('reg-name');
      const emailInput = document.getElementById('reg-email');
      const phoneInput = document.getElementById('reg-phone');
      const passInput = document.getElementById('reg-password');
      const confirmInput = document.getElementById('reg-confirm-password');

      const errorName = document.getElementById('reg-error-name');
      const errorEmail = document.getElementById('reg-error-email');
      const errorPhone = document.getElementById('reg-error-phone');
      const errorPass = document.getElementById('reg-error-password');
      const errorConfirm = document.getElementById('reg-error-confirm');

      let valid = true;

      if (nameInput.value.trim().length < 2) {
        nameInput.classList.add('is-invalid');
        if (errorName) { errorName.textContent = 'Vui lòng nhập họ và tên'; errorName.style.display = 'block'; }
        valid = false;
      } else {
        nameInput.classList.remove('is-invalid');
        if (errorName) errorName.style.display = 'none';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        if (errorEmail) { errorEmail.textContent = 'Email không hợp lệ'; errorEmail.style.display = 'block'; }
        valid = false;
      } else {
        emailInput.classList.remove('is-invalid');
        if (errorEmail) errorEmail.style.display = 'none';
      }

      const phoneRegex = /^(03|05|07|08|09)\d{8}$/;
      if (!phoneRegex.test(phoneInput.value.trim())) {
        phoneInput.classList.add('is-invalid');
        if (errorPhone) { errorPhone.textContent = 'Số điện thoại gồm 10 số (03, 05, 07, 08, 09)'; errorPhone.style.display = 'block'; }
        valid = false;
      } else {
        phoneInput.classList.remove('is-invalid');
        if (errorPhone) errorPhone.style.display = 'none';
      }

      if (passInput.value.trim().length < 6) {
        passInput.classList.add('is-invalid');
        if (errorPass) { errorPass.textContent = 'Mật khẩu phải từ 6 ký tự trở lên'; errorPass.style.display = 'block'; }
        valid = false;
      } else {
        passInput.classList.remove('is-invalid');
        if (errorPass) errorPass.style.display = 'none';
      }

      if (confirmInput.value.trim() !== passInput.value.trim() || confirmInput.value.trim() === '') {
        confirmInput.classList.add('is-invalid');
        if (errorConfirm) { errorConfirm.textContent = 'Mật khẩu xác nhận không trùng khớp'; errorConfirm.style.display = 'block'; }
        valid = false;
      } else {
        confirmInput.classList.remove('is-invalid');
        if (errorConfirm) errorConfirm.style.display = 'none';
      }

      if (!valid) {
        Toast.error('Đăng ký thất bại', 'Vui lòng kiểm tra lại thông tin nhập.');
        return;
      }

      const newUser = {
        fullname: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim()
      };

      StorageUtil.setCurrentUser(newUser);
      Toast.success('Đăng ký thành công', `Chào mừng ${newUser.fullname} đã gia nhập SPORTZONE!`);

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    };
  }
}
