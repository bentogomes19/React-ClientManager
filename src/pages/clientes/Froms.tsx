import { useEffect, useState, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getByIdCliente,
  addCliente,
  updateCliente,
} from "../../services/clienteService";
import { ClienteTypeDto } from "../../types/client";
import { formatCpf } from "../../utils/formatCpf";

export default function ClienteForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState<ClienteTypeDto>({
    id: undefined,
    nome: "",
    cpf: "",
    dataNascimento: "",
    rendaFamiliar: 0,
    dataDeCadastro: new Date().toISOString().split("T")[0],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (id) {
      setLoading(true);
      getByIdCliente(id)
        .then((res) => setCliente(res.data))
        .catch((er) => setError(`Erro ao carregar cliente: ${er}`))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (field: keyof ClienteTypeDto, value: any) => {
    setCliente((prev) => ({ ...prev, [field]: value }));
  };

  const handleCpfChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (!/[\d]/.test(key) && key !== "Backspace" && key !== "Tab") {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      var clienteRequest = cliente;
      clienteRequest.cpf = clienteRequest.cpf?.replace(/\D/g, "");
      if (cliente.id) {
        await updateCliente(clienteRequest);
        alert("Cliente atualizado com sucesso!");
      } else {
        await addCliente(clienteRequest);
        alert("Cliente criado com sucesso!");
      }
      navigate("/clientes");
    } catch (ex: any) {
      if (ex.response?.data?.Message) {
        alert(ex.response.data.Message);
      } else {
        alert(`Erro ao salvar cliente: ${ex.message || ex}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center p-6">Carregando...</div>;
  }

  return (
    <div
      className=" px-0 md:px-[30px] py-8 min-w-[100%] flex justify-center mx-auto my-2"
      style={{ marginTop: "50px" }}
    >
      <div
        className="bg-white rounded-xl shadow w-full max-w-[60%] p-6 md:p-12 mt-[20px]"
        style={{ padding: "25px 20px" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Cadastro de Cliente
        </h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-6 "
          style={{ marginTop: "20px" }}
        >
          <div
            className="w-full max-w-[250px]"
            style={{ width: "100%", maxWidth: "250px" }}
          >
            <label
              htmlFor="nome"
              className="block text-sm font-medium text-gray-700"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              value={cliente.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              required
              minLength={3}
              maxLength={150}
              placeholder="Digite o nome completo"
              className="form-input w-full border border rounded-md "
              style={{ padding: "5px 10px", border: "1px solid #ccc" }}
            />
          </div>

          <div
            className="w-full max-w-[250px]"
            style={{ width: "100%", maxWidth: "250px" }}
          >
            <label
              htmlFor="cpf"
              className="block text-sm font-medium text-gray-700"
            >
              CPF
            </label>
            <input
              type="text"
              id="cpf"
              value={formatCpf(cliente.cpf)}
              onChange={(e) => handleChange("cpf", e.target.value)}
              onKeyDown={handleCpfChange}
              minLength={14}
              maxLength={14}
              placeholder="Apenas números"
              className="form-input w-full border border rounded-md "
              style={{ padding: "5px 10px", border: "1px solid #ccc" }}
            />
          </div>

          <div
            className="w-full max-w-[250px]"
            style={{ width: "100%", maxWidth: "250px" }}
          >
            <label
              htmlFor="dataNascimento"
              className="block text-sm font-medium text-gray-700"
            >
              Data de Nascimento
            </label>
            <input
              type="date"
              id="dataNascimento"
              value={cliente.dataNascimento}
              onChange={(e) => handleChange("dataNascimento", e.target.value)}
              required
              max={today}
              className="form-input w-full border border rounded-md "
              style={{ padding: "5px 10px", border: "1px solid #ccc" }}
            />
          </div>

          <div
            className="w-full max-w-[250px]"
            style={{ width: "100%", maxWidth: "250px" }}
          >
            <label
              htmlFor="rendaFamiliar"
              className="block text-sm font-medium text-gray-700"
            >
              Renda Familiar
            </label>
            <input
              type="number"
              id="rendaFamiliar"
              value={cliente.rendaFamiliar ?? ""}
              onChange={(e) =>
                handleChange("rendaFamiliar", parseFloat(e.target.value))
              }
              min={0.01}
              step={0.01}
              placeholder="Ex: 2500.50"
              className="form-input w-full border border rounded-md "
              style={{ padding: "5px 10px", border: "1px solid #ccc" }}
            />
          </div>

          <div
            className="w-full max-w-[250px]"
            style={{ width: "100%", maxWidth: "250px" }}
          >
            <label
              htmlFor="dataDeCadastro"
              className="block text-sm font-medium text-gray-700"
            >
              Data de Cadastro
            </label>
            <input
              type="date"
              id="dataDeCadastro"
              value={cliente.dataDeCadastro ?? ""}
              onChange={(e) => handleChange("dataDeCadastro", e.target.value)}
              readOnly // se você quiser apenas exibir, sem permitir edição
              className="form-input w-full border border rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
              style={{ padding: "5px 10px", border: "1px solid #ccc" }}
            />
          </div>

          <div className="w-full flex flex-col sm:flex-row justify-between mt-6 gap-4">
            <button
              type="button"
              onClick={() => navigate("/clientes")}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex-1 sm:flex-none"
              style={{ padding: "5px 20px" }}
            >
              Voltar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex-1 sm:flex-none"
              style={{ padding: "5px 20px" }}
            >
              {cliente.id ? "Atualizar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
