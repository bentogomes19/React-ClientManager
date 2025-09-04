export interface ClienteTypeDto {
  id?: string; 
  nome: string;
  cpf?: string; 
  dataNascimento: string; 
  rendaFamiliar: number;
  dataDeCadastro?: string;
}

export interface ClienteFilterDto {
  name?: string;
  cpf?: string;
  offset?: number;
  pageSize?: number;
}
