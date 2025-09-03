export interface CreateClienteDto {
  nome: string;
  cpf?: string; 
  dataNascimento: string; 
  rendaFamiliar: number;
}

export interface UpdateClienteDto extends CreateClienteDto { }

export interface ClienteResponseDto {
  id: string; 
  nome: string;
  cpf: string;
  dataNascimento: string; 
  rendaFamiliar: number;
}
