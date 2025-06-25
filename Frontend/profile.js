<script>
  window.onload = () => {
    const dashboard = document.getElementById("dashboard");
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in.");
      window.location.href = "login.html";
      return;
    }

    fetch("http://localhost:3000/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Unauthorized or invalid token");
        }
        return res.json();
      })
      .then(json => {
        console.log("✅ Profile received:", json);
        document.getElementById("email").textContent = json.email ?? "—";
        document.getElementById("user").textContent = json.name ?? "Unknown";
        dashboard.style.display = "block";
      })
      .catch(err => {
        console.error("❌ Fetch/profile error:", err.message);
        alert("Session expired or invalid. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "login.html";
      });

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
  };
</script>
