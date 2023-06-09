import { CityDto } from "@/data/dto/city-dto";
import client from "@/data/network";
import { apiEndpoints } from "@/data/apiEndpoints";

export async function searchCities(name: string): Promise<CityDto[]> {
  const result = await client.get(apiEndpoints.searchCities(name));
  return result.data;
}
