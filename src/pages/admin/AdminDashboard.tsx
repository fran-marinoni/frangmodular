import AdminLayout from "@/components/admin/AdminLayout";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const overviewCards = [
  { label: "Total Visitas", value: "24,812", change: "+12.5%" },
  { label: "Visitantes Únicos", value: "18,340", change: "+8.2%" },
  { label: "Páginas Vistas", value: "67,429", change: "+15.1%" },
  { label: "Tasa de Rebote", value: "34.2%", change: "-2.1%" },
  { label: "Duración Promedio", value: "3m 42s", change: "+0.8%" },
];

const trafficData = [
  { month: "Ene", visits: 3200 },
  { month: "Feb", visits: 4100 },
  { month: "Mar", visits: 3800 },
  { month: "Abr", visits: 5200 },
  { month: "May", visits: 4700 },
  { month: "Jun", visits: 5800 },
];

const sourceData = [
  { source: "Directo", value: 35 },
  { source: "Orgánico", value: 28 },
  { source: "Redes Sociales", value: 22 },
  { source: "Referido", value: 15 },
];

const deviceData = [
  { name: "Desktop", value: 52 },
  { name: "Mobile", value: 38 },
  { name: "Tablet", value: 10 },
];

const COLORS = ["hsl(11,84%,51%)", "hsl(0,0%,30%)", "hsl(37,20%,70%)"];

const topPages = [
  { page: "/", views: 12840, unique: 9200 },
  { page: "/productos/apollo", views: 8320, unique: 6100 },
  { page: "/blog", views: 5690, unique: 4200 },
  { page: "/nosotros", views: 4120, unique: 3100 },
  { page: "/contacto", views: 3890, unique: 2800 },
];

const topBlogPosts = [
  { title: "Back to the 90s", views: 3420 },
  { title: "Aeropuerto Mariscal Sucre", views: 1850 },
  { title: "La comodidad no se negocia", views: 1240 },
];

const ctaClicks = [
  { label: "WhatsApp", clicks: 842 },
  { label: "Formulario Contacto", clicks: 634 },
  { label: "Ver Film", clicks: 1120 },
  { label: "Ver catálogo completo", clicks: 490 },
];

const recentActivity = [
  { time: "Hace 2 min", event: "Nuevo visitante desde Google — /productos/apollo" },
  { time: "Hace 8 min", event: "Click en WhatsApp — /contacto" },
  { time: "Hace 15 min", event: "Formulario de contacto enviado" },
  { time: "Hace 32 min", event: "Nuevo artículo de blog publicado" },
  { time: "Hace 1 hora", event: "5 nuevos visitantes desde Instagram" },
];

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-black mb-6">Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {overviewCards.map((card) => (
          <div key={card.label} className="border border-border rounded-md p-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{card.label}</p>
            <p className="text-xl font-black">{card.value}</p>
            <p className={`text-[10px] font-medium ${card.change.startsWith("+") ? "text-green-600" : "text-primary"}`}>
              {card.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Traffic over time */}
        <div className="border border-border rounded-md p-4 md:col-span-2">
          <h2 className="text-xs font-bold mb-4">Tráfico en el tiempo</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,88%)" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="visits" stroke="hsl(11,84%,51%)" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Device breakdown */}
        <div className="border border-border rounded-md p-4">
          <h2 className="text-xs font-bold mb-4">Dispositivos</h2>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={deviceData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" label={({ name, value }) => `${name} ${value}%`} labelLine={false}>
                {deviceData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sources bar chart */}
      <div className="border border-border rounded-md p-4 mb-8">
        <h2 className="text-xs font-bold mb-4">Fuentes de tráfico</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={sourceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,88%)" />
            <XAxis dataKey="source" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip contentStyle={{ fontSize: 11 }} />
            <Bar dataKey="value" fill="hsl(11,84%,51%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tables row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Top pages */}
        <div className="border border-border rounded-md p-4">
          <h2 className="text-xs font-bold mb-3">Páginas más visitadas</h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2">Página</th>
                <th className="pb-2 text-right">Vistas</th>
                <th className="pb-2 text-right">Únicas</th>
              </tr>
            </thead>
            <tbody>
              {topPages.map((p) => (
                <tr key={p.page} className="border-b border-border/50">
                  <td className="py-2 font-medium">{p.page}</td>
                  <td className="py-2 text-right">{p.views.toLocaleString()}</td>
                  <td className="py-2 text-right">{p.unique.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top blog posts */}
        <div className="border border-border rounded-md p-4">
          <h2 className="text-xs font-bold mb-3">Blog posts más vistos</h2>
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="pb-2">Artículo</th>
                <th className="pb-2 text-right">Vistas</th>
              </tr>
            </thead>
            <tbody>
              {topBlogPosts.map((p) => (
                <tr key={p.title} className="border-b border-border/50">
                  <td className="py-2 font-medium">{p.title}</td>
                  <td className="py-2 text-right">{p.views.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA tracking + Recent activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-border rounded-md p-4">
          <h2 className="text-xs font-bold mb-3">Clicks en CTAs</h2>
          <div className="space-y-2">
            {ctaClicks.map((c) => (
              <div key={c.label} className="flex justify-between items-center text-xs">
                <span>{c.label}</span>
                <span className="font-bold">{c.clicks}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-border rounded-md p-4">
          <h2 className="text-xs font-bold mb-3">Actividad reciente</h2>
          <div className="space-y-2.5">
            {recentActivity.map((a, i) => (
              <div key={i} className="text-xs">
                <span className="text-muted-foreground mr-2">{a.time}</span>
                <span>{a.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
