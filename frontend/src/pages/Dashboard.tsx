import React from "react";
import {
  BarChart, Bar,
  AreaChart, Area,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  { month: "Oca 2025", count: 30, sales: 400, quality: 90 },
  { month: "Şub 2025", count: 45, sales: 300, quality: 80 },
  { month: "Mar 2025", count: 50, sales: 350, quality: 75 },
  { month: "Nis 2025", count: 60, sales: 500, quality: 95 },
  { month: "May 2025", count: 70, sales: 600, quality: 85 },
];

// Radar için ayrı veri yapısı (özellikler vs.)
const radarData = [
  { subject: "Kalite", A: 90, B: 85, fullMark: 100 },
  { subject: "Hız", A: 80, B: 70, fullMark: 100 },
  { subject: "Fiyat", A: 75, B: 95, fullMark: 100 },
  { subject: "Müşteri Memnuniyeti", A: 95, B: 90, fullMark: 100 },
  { subject: "Teslimat", A: 85, B: 80, fullMark: 100 },
];

const DashboardCharts = () => {
  return (
    <div className="space-y-16 p-8">
      {/* Bar Chart */}
      <div style={{ width: "100%", height: 300 }}>
        <h3 className="text-xl font-semibold mb-2">Ürün Sayısı (Aylık)</h3>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3182ce" name="Ürün Sayısı" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart */}
      <div style={{ width: "100%", height: 300 }}>
        <h3 className="text-xl font-semibold mb-2">Satış (Aylık)</h3>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#38b2ac" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#38b2ac" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="sales" stroke="#38b2ac" fill="url(#colorSales)" name="Satış" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Radar Chart */}
      <div style={{ width: "100%", height: 350 }}>
        <h3 className="text-xl font-semibold mb-2">Performans Kriterleri</h3>
        <ResponsiveContainer>
          <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="80%">
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Biz" dataKey="A" stroke="#e53e3e" fill="#e53e3e" fillOpacity={0.6} />
            <Radar name="Rakip" dataKey="B" stroke="#3182ce" fill="#3182ce" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
