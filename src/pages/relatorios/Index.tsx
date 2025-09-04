import { useEffect, useState } from "react";
import { ApiClient } from "../../services/api";
import { getRelatorio } from "../../services/relatorioService";
import { RelatorioFilterDto, RelatorioClientesDto } from "../../types/relatorio";


export default function Relatorios() {
  const [relatorio, setRelatorio] = useState<RelatorioClientesDto | null>(null);
  const [relatorioFilterDto, setRelatorioFilterDto] = useState<RelatorioFilterDto>({ filtro: "hoje" });
  const [loading, setLoading] = useState(false);
  const api = ApiClient.getInstance();

  const [periodo, setPeriodo] = useState<"hoje" | "semana" | "mes">("hoje");

  const fetchRelatorio = async () => {
    setLoading(true);
    try {
        const response = await getRelatorio(relatorioFilterDto)
        console.log(response);
        setRelatorio(response as unknown as RelatorioClientesDto);
    } catch (error) {
      console.error("Erro ao buscar relatório:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRelatorio();
  }, [relatorioFilterDto]);

  if (loading) return <p>Carregando...</p>;

   return (
    <div className=" px-0 md:px-[10px] py-8 min-w-[100%] flex justify-center mx-auto my-2" style={{marginTop: '50px'}}>
      <div>
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="mb-4 flex gap-2">
        {["hoje", "semana", "mes"].map((p) => (
          <button style={{padding: '5px 20px'}}
            key={p}
            onClick={() => setRelatorioFilterDto({ filtro: p as "hoje" | "semana" | "mes" })}
            className={`px-4 py-2 rounded cursor-pointer transition-colors ${
              relatorioFilterDto.filtro === p ? "bg-green-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {p === "hoje" ? "Hoje" : p === "semana" ? "Esta semana" : "Este mês"}
          </button>
        ))}
      </div>

      {relatorio && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Card titulo="Clientes com 18 anos e renda acima da média" valor={relatorio.qtdClientesMaior18Anos} />
          <Card titulo="Classe A" valor={relatorio.qtdClientesClasseA} />
          <Card titulo="Classe B" valor={relatorio.qtdClientesClasseB} />
          <Card titulo="Classe C" valor={relatorio.qtdClientesClasseC} />
        </div>
      )}
      </div>
    </div>
  );
}

function Card({ titulo, valor }: { titulo: string; valor: number }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow" style={{padding: 10}}>
      <h3 className="font-bold mb-2">{titulo}</h3>
      <p className="text-3xl">{valor}</p>
    </div>
  );
}
