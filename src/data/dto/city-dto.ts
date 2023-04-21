import { CoordinateDto } from "@/data/dto/coordinate-dto";

export interface CityDto {
  _id: number;
  country: string;
  name: string;
  coord: CoordinateDto;
}
