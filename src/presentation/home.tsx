import React, { memo, useEffect, useState } from "react";
import { Flex, Heading, HStack, Image, Input } from "@chakra-ui/react";
import { useDebounce } from "use-debounce";
import { CityDto } from "@/data/dto/city-dto";
import { searchCities } from "@/data/request/city";
import { Cities } from "@/presentation/cities";

export const Home = memo(() => {
  const [searchInput, setSearchInput] = useState("");
  const [cities, setCities] = useState<CityDto[]>([]);
  const [searchInputDebounced] = useDebounce(searchInput, 500);

  useEffect(() => {
    async function search() {
      const cities = await searchCities(searchInputDebounced.trim());
      setCities(cities.slice(0, Math.min(100, cities.length)));
    }
    search();
  }, [searchInputDebounced]);

  return (
    <Flex
      direction={"column"}
      w={"full"}
      h={"full"}
      align={"center"}
      maxW={"container.xl"}
      mx={"auto"}
      px={{ base: 2, md: "4" }}
    >
      <HStack w={"full"} py={"4"} px={"8"}>
        <Image src={"./logo.png"} alt={"logo"} boxSize={"8"} />
        <Heading>City Search</Heading>
      </HStack>
      <Input
        placeholder={"Enter city name"}
        value={searchInput}
        onChange={(event) => {
          event.preventDefault();
          setSearchInput(event.target.value);
        }}
      />
      <Cities cities={cities} />
    </Flex>
  );
});
