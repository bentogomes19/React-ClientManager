export function formatCpf(cpf) {
  if (!cpf) return "";
  return cpf
    .replace(/\D/g, "") // remove não dígitos
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
