import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Users, Search } from "lucide-react";
import { deleteCliente, getAllClientes } from "../../services/clienteService";
import { ClienteTypeDto } from "../../types/client";
import { formatCpf } from "../../utils/formatCpf";

export default function ClientesList() {
  const [clientes, setClientes] = useState<ClienteTypeDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // filtros
  const [searchName, setSearchName] = useState("");
  const [searchCpf, setSearchCpf] = useState("");

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = async (name?: string, cpf?: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await getAllClientes({
        name,
        cpf: cpf?.replace(/\D/g, ""),
        offset: 0,
        pageSize: 20,
      });

      setClientes(
        Array.isArray(response.data) ? response.data : [response.data]
      );
    } catch (err: any) {
      setError("Erro ao carregar clientes");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    carregarClientes(searchName || undefined, searchCpf || undefined);
  };

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? clientes.map((c) => c.id!.toString()) : []);
  };

  const handleSelectItem = (id: string, checked: boolean) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  const handleDelete = async (ids: string[]) => {
    if (!window.confirm("Deseja realmente excluir?")) return;
    try {
      await deleteCliente(ids);
      setClientes((prev) =>
        prev.filter((c) => !ids.includes(c.id!.toString()))
      );
      setSelectedIds([]);
    } catch (err) {
      alert("Erro ao excluir cliente");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-10 h-10"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="flex justify-center" style={{ marginTop: "50px" }}>
      <div className="px-0 md:px-[30px] py-8 w-full max-w-[1200px] mx-auto">
        {/* título */}
        <div
          className="flex items-center space-x-3"
          style={{ marginBottom: 8 }}
        >
          <Users className="w-6 h-6" />
          <h1 className="text-3xl font-bold">Clientes</h1>
        </div>

        {/* barra de busca */}
        <div className="flex flex-wrap gap-4 mb-6" style={{ marginBottom: 10 }}>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Pesquisar por nome..."
            className="px-4 py-3 border rounded-md w-full md:w-64"
            style={{
              padding: "5px 10px",
              border: "1px solid #ccc",
              background: "white",
            }}
          />
          <input
            type="text"
            value={formatCpf(searchCpf)}
            maxLength={15}
            onChange={(e) => setSearchCpf(e.target.value)}
            placeholder="Pesquisar por CPF..."
            className="px-4 py-3 border rounded-md w-full md:w-64"
            style={{
              padding: "5px 10px",
              border: "1px solid #ccc",
              background: "white",
            }}
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full md:w-auto"
            style={{ padding: "5px 20px" }}
          >
            <Search size={18} />
            Buscar
          </button>
        </div>

        {/* tabela */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex justify-end items-center mb-6">
              {selectedIds.length > 0 ? (
                <button
                  onClick={() => handleDelete(selectedIds)}
                  className="flex items-center gap-2 px-5 py-3 text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50"
                  style={{ padding: "5px 20px" }}
                >
                  <Trash2 size={20} />
                  Excluir Selecionados ({selectedIds.length})
                </button>
              ) : (
                <Link
                  to="/clientes/forms"
                  className="flex items-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  style={{ padding: "5px 20px" }}
                >
                  <Plus size={20} />
                  Adicionar
                </Link>
              )}
            </div>

            <table
              className="w-full border-collapse text-sm"
              style={{ overflow: "scroll" }}
            >
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4" style={{ padding: 10 }}>
                    <input
                      type="checkbox"
                      checked={
                        selectedIds.length === clientes.length &&
                        clientes.length > 0
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  </th>
                  <th
                    className="p-4 text-left"
                    style={{ padding: 10, minWidth: 100 }}
                  >
                    Nome
                  </th>
                  <th
                    className="p-4 text-left"
                    style={{ padding: 10, minWidth: 100 }}
                  >
                    CPF
                  </th>
                  <th
                    className="p-4 text-left"
                    style={{ padding: 10, minWidth: 100 }}
                  >
                    Renda Familiar
                  </th>
                  <th
                    className="p-4 text-center"
                    style={{ padding: 10, minWidth: 100 }}
                  >
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {clientes.length > 0 ? (
                  clientes.map((c) => (
                    <tr key={c.id} className="border-t hover:bg-gray-50">
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(c.id!.toString())}
                          onChange={(e) =>
                            handleSelectItem(c.id!.toString(), e.target.checked)
                          }
                        />
                      </td>
                      <td style={{ padding: 10, minWidth: 100 }}>{c.nome}</td>
                      <td style={{ padding: 10, minWidth: 100 }}>
                        {formatCpf(c.cpf)}
                      </td>
                      <td style={{ padding: 10, minWidth: 100 }}>
                        {c.rendaFamiliar != null &&
                        typeof c.rendaFamiliar === "number" ? (
                          <span
                            style={{
                              display: "inline-block",
                              padding: "0.25rem 0.75rem",
                              borderRadius: "9999px",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color:
                                c.rendaFamiliar <= 980
                                  ? "white"
                                  : c.rendaFamiliar <= 2500
                                  ? "black"
                                  : "white",
                              backgroundColor:
                                c.rendaFamiliar <= 980
                                  ? "#f56565"
                                  : c.rendaFamiliar <= 2500
                                  ? "#ecc94b"
                                  : "#48bb78",
                            }}
                          >
                            {`R$ ${Math.floor(c.rendaFamiliar).toLocaleString(
                              "pt-BR"
                            )}`}
                          </span>
                        ) : (
                          "--"
                        )}
                      </td>
                      <td
                        className="p-4 flex justify-center gap-3"
                        style={{ padding: 10, minWidth: 100 }}
                      >
                        <Link
                          to={`/clientes/forms/${c.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Pencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete([c.id!.toString()])}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500">
                      Nenhum cliente encontrado
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
