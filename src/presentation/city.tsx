import React, { memo } from "react";
import { StackProps, Text, VStack } from "@chakra-ui/react";
import { CityDto } from "@/data/dto/city-dto";

interface Props extends StackProps {
  city: CityDto;
}

export const City = memo(({ city, ...rest }: Props) => {
  return (
    <VStack
      p={"4"}
      shadow={"lg"}
      borderRadius={"lg"}
      borderColor={"gray.50"}
      borderWidth={"1px"}
      {...rest}
    >
      <Text>
        {city.name}, {city.country}
      </Text>
      <Text>
        Coordinate: {city.coord.lat}, {city.coord.lon}
      </Text>
    </VStack>
  );
});
