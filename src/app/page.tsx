"use client";

import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Target, Users } from "lucide-react";

// Dados fixos dos vendedores
const salesData = [
  { id: 1, vendedor: "João", categoria: "Eletrônicos", meta: 50000, realizado: 45000 },
  { id: 2, vendedor: "João", categoria: "Móveis", meta: 30000, realizado: 35000 },
  { id: 3, vendedor: "João", categoria: "Beleza", meta: 20000, realizado: 18000 },
  
  { id: 4, vendedor: "Maria", categoria: "Eletrônicos", meta: 60000, realizado: 62000 },
  { id: 5, vendedor: "Maria", categoria: "Móveis", meta: 40000, realizado: 38000 },
  { id: 6, vendedor: "Maria", categoria: "Beleza", meta: 25000, realizado: 27000 },
  
  { id: 7, vendedor: "Pedro", categoria: "Eletrônicos", meta: 45000, realizado: 40000 },
  { id: 8, vendedor: "Pedro", categoria: "Móveis", meta: 35000, realizado: 32000 },
  { id: 9, vendedor: "Pedro", categoria: "Beleza", meta: 15000, realizado: 16000 },
  
  { id: 10, vendedor: "Ana", categoria: "Eletrônicos", meta: 55000, realizado: 58000 },
  { id: 11, vendedor: "Ana", categoria: "Móveis", meta: 38000, realizado: 40000 },
  { id: 12, vendedor: "Ana", categoria: "Beleza", meta: 22000, realizado: 20000 },
  
  { id: 13, vendedor: "Lucas", categoria: "Eletrônicos", meta: 48000, realizado: 50000 },
  { id: 14, vendedor: "Lucas", categoria: "Móveis", meta: 32000, realizado: 30000 },
  { id: 15, vendedor: "Lucas", categoria: "Beleza", meta: 18000, realizado: 19000 },
];

export default function DashboardMetas() {
  const [vendedorSelecionado, setVendedorSelecionado] = useState<string>("Todos");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("Todas");

  // Extrair vendedores e categorias únicos
  const vendedores = ["Todos", ...Array.from(new Set(salesData.map(item => item.vendedor)))];
  const categorias = ["Todas", ...Array.from(new Set(salesData.map(item => item.categoria)))];

  // Filtrar dados
  const dadosFiltrados = useMemo(() => {
    return salesData.filter(item => {
      const matchVendedor = vendedorSelecionado === "Todos" || item.vendedor === vendedorSelecionado;
      const matchCategoria = categoriaSelecionada === "Todas" || item.categoria === categoriaSelecionada;
      return matchVendedor && matchCategoria;
    });
  }, [vendedorSelecionado, categoriaSelecionada]);

  // Calcular totais
  const totais = useMemo(() => {
    const metaTotal = dadosFiltrados.reduce((acc, item) => acc + item.meta, 0);
    const realizadoTotal = dadosFiltrados.reduce((acc, item) => acc + item.realizado, 0);
    const percentual = metaTotal > 0 ? (realizadoTotal / metaTotal) * 100 : 0;
    return { metaTotal, realizadoTotal, percentual };
  }, [dadosFiltrados]);

  // Preparar dados para o gráfico
  const dadosGrafico = useMemo(() => {
    const grouped = dadosFiltrados.reduce((acc, item) => {
      const key = vendedorSelecionado === "Todos" ? item.vendedor : item.categoria;
      if (!acc[key]) {
        acc[key] = { nome: key, meta: 0, realizado: 0 };
      }
      acc[key].meta += item.meta;
      acc[key].realizado += item.realizado;
      return acc;
    }, {} as Record<string, { nome: string; meta: number; realizado: number }>);
    
    return Object.values(grouped);
  }, [dadosFiltrados, vendedorSelecionado]);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-sky-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-xl">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Topdemais Piscinas</h1>
                <p className="text-cyan-100 text-sm">Dashboard de Metas</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <Users className="w-5 h-5" />
              <span className="text-sm font-medium">Equipe de Vendas</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Filtros */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-cyan-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-600" />
            Filtros
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendedor
              </label>
              <select
                value={vendedorSelecionado}
                onChange={(e) => setVendedorSelecionado(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-white text-gray-900"
              >
                {vendedores.map((vendedor) => (
                  <option key={vendedor} value={vendedor}>
                    {vendedor}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={categoriaSelecionada}
                onChange={(e) => setCategoriaSelecionada(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all bg-white text-gray-900"
              >
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Card de Progresso Total */}
        <div className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-2xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Progresso Total</h2>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-3xl font-bold">{totais.percentual.toFixed(1)}%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-cyan-100 text-sm mb-1">Meta Total</p>
              <p className="text-2xl font-bold">{formatarMoeda(totais.metaTotal)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-cyan-100 text-sm mb-1">Realizado Total</p>
              <p className="text-2xl font-bold">{formatarMoeda(totais.realizadoTotal)}</p>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="bg-white/20 backdrop-blur-sm rounded-full h-6 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-400 to-emerald-500 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-3"
              style={{ width: `${Math.min(totais.percentual, 100)}%` }}
            >
              {totais.percentual > 10 && (
                <span className="text-xs font-bold text-white drop-shadow-lg">
                  {totais.percentual.toFixed(1)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Gráfico */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-cyan-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Meta vs Realizado</h2>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dadosGrafico}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="nome" 
                  tick={{ fill: '#374151', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fill: '#374151', fontSize: 12 }}
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => formatarMoeda(value)}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #0891b2',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                />
                <Bar dataKey="meta" fill="#0891b2" name="Meta" radius={[8, 8, 0, 0]} />
                <Bar dataKey="realizado" fill="#10b981" name="Realizado" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tabela */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-cyan-100">
          <div className="px-6 py-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-cyan-100">
            <h2 className="text-xl font-bold text-gray-800">Detalhamento</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Vendedor
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Meta
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Realizado
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    % Atingido
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {dadosFiltrados.map((item) => {
                  const percentual = (item.realizado / item.meta) * 100;
                  const atingiuMeta = percentual >= 100;
                  
                  return (
                    <tr key={item.id} className="hover:bg-cyan-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold mr-3">
                            {item.vendedor[0]}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{item.vendedor}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-cyan-100 text-cyan-800">
                          {item.categoria}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-medium">
                        {formatarMoeda(item.meta)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 font-medium">
                        {formatarMoeda(item.realizado)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`text-sm font-bold ${atingiuMeta ? 'text-green-600' : 'text-amber-600'}`}>
                          {percentual.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {atingiuMeta ? (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            ✓ Atingida
                          </span>
                        ) : (
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                            Em andamento
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>© 2024 Topdemais Piscinas - Dashboard de Acompanhamento de Metas</p>
        </div>
      </main>
    </div>
  );
}
