import { ApiClient } from "./api";
import { RelatorioClientesDto, RelatorioFilterDto } from "../types/relatorio";
import { ApiResponse } from "../types";

const apiClient = ApiClient.getInstance();

export async function getRelatorio(
  filters?: RelatorioFilterDto
): Promise<ApiResponse<RelatorioClientesDto>> {
  try {
    const response = await apiClient.get<RelatorioClientesDto>(
      "/Cliente/relatorios",
      filters
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
