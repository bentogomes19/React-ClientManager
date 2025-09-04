export interface RelatorioClientesDto {
  qtdClientesMaior18Anos: number;
  qtdClientesClasseA: number;
  qtdClientesClasseB: number;
  qtdClientesClasseC: number;
}

export interface RelatorioFilterDto {
  filtro?: "hoje" | "semana" | "mes";
}
