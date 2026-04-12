import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, isAuthenticated } from "@/lib/adminAuth";
import { useEffect } from "react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated()) navigate("/admin/dashboard", { replace: true });
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (login(username.trim(), password)) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 border border-border rounded-md space-y-5">
        <h1 className="text-2xl font-black text-center">Admin</h1>
        {error && <p className="text-xs text-destructive text-center">{error}</p>}
        <div>
          <label className="text-xs font-medium block mb-1.5">Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-input bg-background rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1.5">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-input bg-background rounded-md px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground text-xs font-bold py-3 rounded-md hover:bg-primary/90 transition-colors"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
