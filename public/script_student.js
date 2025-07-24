document.addEventListener("DOMContentLoaded", () => {
  const socket = io();
  let studentName = '';
  let bellPressed = false;

  const bellBtn = document.getElementById('bellBtn');
  const confirmBtn = document.getElementById('confirmBtn');
  const nameInput = document.getElementById('studentName');
  const welcomeText = document.getElementById('welcomeText');
  const bellSection = document.getElementById('bellSection');

  confirmBtn.onclick = () => {
    const name = nameInput.value.trim();
    if (name) {
      studentName = name;
      welcomeText.textContent = `สวัสดี ${studentName}`;
      bellSection.style.display = 'block';
      confirmBtn.style.display = 'none';
      nameInput.style.display = 'none';
    }
  };

  bellBtn.onclick = () => {
    if (studentName && !bellPressed) {
      const now = new Date();
      const time = now.toLocaleTimeString('th-TH') + `.${now.getMilliseconds().toString().padStart(3, '0')}ms`;
      socket.emit('ring', { name: studentName, time });
      bellPressed = true;
      bellBtn.disabled = true;
      bellBtn.innerHTML = '✅ ส่งแล้ว'; // เปลี่ยนจาก textContent เป็น innerHTML
    }
  };

  socket.on('reset', () => {
    console.log('ได้รับคำสั่ง reset'); // 🔎 debug
    bellPressed = false;
    bellBtn.disabled = false;
    bellBtn.innerHTML = '🔔<br>กดกระดิ่ง'; // ✅ reset ปุ่มใหม่
  });
});
