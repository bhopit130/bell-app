const socket = io();

socket.on('bellList', (bellList) => {
  const ul = document.getElementById('bellListDisplay');
  ul.innerHTML = '';

  if (bellList.length === 0) {
    ul.innerHTML = '<li style="color:gray">ยังไม่มีใครกดกระดิ่ง</li>';
    return;
  }

  bellList.forEach(entry => {
    const li = document.createElement('li');
    li.textContent = `อันดับ ${entry.order}: ${entry.name} — เวลา ${entry.time}`;
    ul.appendChild(li);
  });

  if (bellList.length === 1) {
    document.getElementById('bellSound').play();
  }
});

document.getElementById('resetBtn').onclick = () => {
  socket.emit('reset');
};
