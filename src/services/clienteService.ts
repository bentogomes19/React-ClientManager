import { ApiClient } from "./api";
import { ClienteTypeDto, ClienteFilterDto } from "../types/client";
import { ApiResponse, ApiResponseMessage, ApiResponseTable } from "../types";
const apiClient = ApiClient.getInstance();

export async function addCliente(
  dto: ClienteTypeDto
): Promise<ApiResponse<ClienteTypeDto>> {
  try {
    const response = await apiClient.post<ClienteTypeDto, ClienteTypeDto>(
      "Cliente",
      dto
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCliente(
  dto: ClienteTypeDto
): Promise<ApiResponse<ClienteTypeDto>> {
  try {
    const response = await apiClient.put<ClienteTypeDto, ClienteTypeDto>(
      "Cliente",
      dto.id!,
      dto
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCliente(
  ids: string[]
): Promise<ApiResponseMessage[]> {
  try {
    console.log(ids);
    const results: ApiResponseMessage[] = [];

    for (const id of ids) {
      const response = await apiClient.delete<ApiResponseMessage, string>(
        `/Cliente/${id}`
      );
      results.push(response.data);
    }

    return results;
  } catch (error) {
    throw error;
  }
}

export async function getByIdCliente(
  id: string
): Promise<ApiResponse<ClienteTypeDto>> {
  try {
    const response = await apiClient.getById<ClienteTypeDto, string>(
      "Cliente",
      id
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllClientes(
  filters?: ClienteFilterDto
): Promise<ApiResponseTable<ClienteTypeDto>> {
  try {
    const response = await apiClient.getTableData<
      ClienteTypeDto,
      ClienteFilterDto
    >("/Cliente", filters);
    return response.data;
  } catch (error) {
    throw error;
  }
}
