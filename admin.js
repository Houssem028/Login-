const auth = firebase.auth();
const db = firebase.firestore();

// تسجيل خروج
document.getElementById('logout').addEventListener('click', () => {
  auth.signOut().then(()=> window.location.href='login.html');
});

// حماية الصفحة
auth.onAuthStateChanged(user => {
  if(!user) window.location.href = 'login.html';
});

// ملئ الجدول تلقائياً
const tableBody = document.getElementById('table-body');
for(let day=1; day<=30; day++){
  const tr = document.createElement('tr');
  tr.innerHTML = `<td>${day}</td>` +
    `<td></td><td></td><td></td><td></td><td></td><td></td><td></td>`;
  tableBody.appendChild(tr);
}

// قراءة الحجز من Firebase وملء الخانات
db.collection("bookings").onSnapshot(snapshot => {
  snapshot.forEach(doc => {
    const data = doc.data();
    const day = new Date(data.date).getDate(); // رقم اليوم
    const hour = data.timeSlot || "9–10 ص"; // افتراضي إذا لم يكن محدد
    const status = data.status || "new";

    const row = tableBody.children[day-1];
    const colIndex = {
      "9–10 ص": 1,
      "10–11 ص": 2,
      "11–12 ص": 3,
      "12–1 م": 4,
      "1–2 م": 5,
      "2–3 م": 6,
      "3–4 م": 7
    }[hour];

    if(row && colIndex){
      const cell = row.children[colIndex];
      cell.textContent = data.name;
      cell.className = status; // new, in-progress, done
    }
  });
});
