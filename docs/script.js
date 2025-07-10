// frontend/script.js

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("loginMessage").textContent = data.message || "Login failed";
      document.getElementById("loginMessage").classList.remove("hidden");
    }
  } catch (err) {
    document.getElementById("loginMessage").textContent = "Erro ao conectar com o servidor.";
    document.getElementById("loginMessage").classList.remove("hidden");
  }
});
