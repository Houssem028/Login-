const firebaseConfig = {
  apiKey: "AIzaSyAJxzFknapSh0fnPfIXwEEK3OijSKlqxco",
  authDomain: "admin-ash-f622c.firebaseapp.com",
  projectId: "admin-ash-f622c",
  storageBucket: "admin-ash-f622c.appspot.com",
  messagingSenderId: "76505742154",
  appId: "1:76505742154:web:dc4f190f9f2de80acb1fb3"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// تحقق من تسجيل الدخول
auth.onAuthStateChanged(user => {
  if (!user) window.location.href = 'login.html';
  else {
    db.collection("bookings").orderBy("createdAt","desc").onSnapshot(snapshot => {
      const tbody = document.getElementById("bookings-body");
      tbody.innerHTML = "";
      snapshot.forEach(doc => {
        const d = doc.data();
        tbody.innerHTML += `
          <tr>
            <td>${d.name}</td>
            <td>${d.phone}</td>
            <td>${d.service}</td>
            <td>${d.address}</td>
            <td>${d.date}</td>
            <td>${d.status || "جديد"}</td>
          </tr>
        `;
      });
    });
  }
});

// تسجيل الخروج
document.getElementById('logout').addEventListener('click', () => {
  auth.signOut().then(() => window.location.href = 'login.html');
});
