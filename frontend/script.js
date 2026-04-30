let currentUser = null;

function enterArena() {
  document.getElementById('splash').classList.add('hidden');
  document.getElementById('auth').classList.remove('hidden');
}

// Login form
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const res = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (res.ok) {
    currentUser = data;
    showDashboard();
  } else {
    alert(data.msg);
  }
});

// Register form
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const clubName = document.getElementById('clubName').value;
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;

  const res = await fetch('http://localhost:5000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clubName, username, password }),
  });
  const data = await res.json();
  if (res.ok) {
    alert('Registration successful! Please login.');
  } else {
    alert(data.msg);
  }
});

function showDashboard() {
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('dashboard').style.display = 'block';
  document.getElementById('clubNameDisplay').innerText = currentUser.userId; // Or fetch club info
  document.getElementById('balanceDisplay').innerText = '150 Cr'; // Fetch real data
}

function logout() {
  currentUser = null;
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('auth').classList.remove('hidden');
}
