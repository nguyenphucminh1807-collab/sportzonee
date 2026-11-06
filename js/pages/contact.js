/**
 * SPORTZONE - Contact Page Script
 * Form Validation, FAQ Accordion, and Store Selector
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactPage();
});

function initContactPage() {
  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.onclick = () => {
        const isOpen = item.classList.contains('is-open');
        // Optional: close other items
        faqItems.forEach(i => i.classList.remove('is-open'));
        if (!isOpen) {
          item.classList.add('is-open');
        }
      };
    }
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.onsubmit = (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const msgInput = document.getElementById('contact-message');

      let isValid = true;

      if (!nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      } else {
        nameInput.classList.remove('is-invalid');
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      } else {
        emailInput.classList.remove('is-invalid');
      }

      if (!subjectInput.value.trim()) {
        subjectInput.classList.add('is-invalid');
        isValid = false;
      } else {
        subjectInput.classList.remove('is-invalid');
      }

      if (msgInput.value.trim().length < 10) {
        msgInput.classList.add('is-invalid');
        isValid = false;
      } else {
        msgInput.classList.remove('is-invalid');
      }

      if (!isValid) {
        Toast.error('Thông báo lỗi', 'Vui lòng điền đầy đủ các thông tin và nội dung tối thiểu 10 ký tự!');
        return;
      }

      Toast.success('Gửi thành công', `Cảm ơn bạn ${nameInput.value.trim()}! SPORTZONE đã nhận được phản hồi và sẽ liên hệ lại trong vòng 24h.`);
      contactForm.reset();
    };
  }
}
