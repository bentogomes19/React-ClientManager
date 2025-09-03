import { useEffect, useState } from 'react'
import { ApiClient } from '../../services/api'
import './style.css'

function Home() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    rendaMedia: ""
  });

  const [errorCpf, setErrorCpf] = useState(""); // estado para o erro de CPF


  const api = ApiClient.getInstance();

  // Buscar clientes ao carregar a página
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await api.get("Cliente");
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const formatCpf = (cpf) => {
    if (!cpf) return "";
    const digits = cpf.replace(/\D/g, ""); // remove qualquer caractere que não seja número
    return digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  // Atualiza o state do form
  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // se for o CPF, aplica a máscara
    if (name === "cpf") {
      // remove tudo que não for número
      newValue = value.replace(/\D/g, "");

      // aplica máscara conforme o tamanho
      if (newValue.length > 3 && newValue.length <= 6) {
        newValue = newValue.replace(/(\d{3})(\d+)/, "$1.$2");
      } else if (newValue.length > 6 && newValue.length <= 9) {
        newValue = newValue.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
      } else if (newValue.length > 9) {
        newValue = newValue.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4");
      }

      setErrorCpf(""); // limpa erro enquanto digita
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  // Cadastrar cliente
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("Cliente", formData); // envia para API
      await fetchUsers(); // atualiza lista
      setFormData({ nome: "", cpf: "", dataNascimento: "", rendaMedia: "" });
    } catch (error) {
      // captura o erro de validação de CPF
      if (error.response && error.response.data && error.response.data.Message) {
        const msg = error.response.data.Message;
        if (msg.includes("CPF inválido")) {
          setErrorCpf("CPF inválido"); // mostra mensagem abaixo do input
        }
      } else {
        console.error("Erro ao cadastrar:", error);
      }
    }
  };

  // função handleDelete
  const handleDelete = async (id) => {
    try {
      await api.delete(`Cliente/${id}`); // chama DELETE /Cliente/{id}
      setUsers((prev) => prev.filter((user) => user.id !== id)); // remove do state
    } catch (error) {
      console.error("Erro ao excluir:", error);
    }
  };

  return (
    <div className="home-container">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Clientes</h1>
        <input
          name="nome"
          type="text"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome"
          required            // campo obrigatório
          maxLength={100}     // tamanho máximo
        />

        <input
          name="cpf"
          type="text"
          value={formData.cpf}
          onChange={handleChange}
          placeholder="CPF"
          required            // obrigatório
          maxLength={14}      // 11 dígitos + 2 pontos + 1 hífen
          pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" // regex para CPF formatado
          title="Digite um CPF válido: XXX.XXX.XXX-XX"
        />
        {errorCpf && <p style={{ color: "red" }}>{errorCpf}</p>} {/* mensagem de erro */}

        <input
          name="dataNascimento"
          type="date"
          value={formData.dataNascimento}
          onChange={handleChange}
        />
        <input
          name="rendaMedia"
          type="decimal"
          value={formData.rendaMedia}
          onChange={handleChange}
          placeholder="Renda Média"
        />
        <button type="submit">Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card-user">
          <div>
            <p>Nome: <span>{user.nome}</span></p>
            <p>CPF: <span>{formatCpf(user.cpf)}</span></p>
            <p>Data de Nascimento: <span>{user.dataNascimento}</span></p>
            <p>Renda Média: <span>{user.rendaMedia}</span></p>
          </div>
          <button type="button">Editar</button>
          <button type="button" onClick={() => handleDelete(user.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}

export default Home;