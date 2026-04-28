const API = 'https://schoolvisitorlogaccessmonitoringsystem.onrender.com'; // CHANGE THIS

async function loadVisitors() {
  const res = await fetch(`${API}/visitors`);
  const data = await res.json();

  const list = document.getElementById('list');
  list.innerHTML = '';

  data.forEach((v) => {
    list.innerHTML += `
      <div style="background:white;padding:10px;margin:10px;">
        <p>${v.name}</p>
        <p>${v.purpose}</p>
        <p>${v.status}</p>

        ${
          v.status === 'PENDING'
            ? `
          <button onclick="approve('${v.id}')">Approve</button>
        `
            : ''
        }
      </div>
    `;
  });
}

async function addVisitor() {
  const name = document.getElementById('name').value;
  const purpose = document.getElementById('purpose').value;

  await fetch(`${API}/visitors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, purpose }),
  });

  loadVisitors();
}

async function approve(id) {
  const res = await fetch(`${API}/visitors/${id}/approve`, {
    method: 'PUT',
  });

  const data = await res.json();
  alert(data.qr);

  loadVisitors();
}
