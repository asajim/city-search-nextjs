import React, { memo, useEffect, useState } from "react";
import { Flex, Heading, HStack, Image, Input, Select } from "@chakra-ui/react";
import { useDebounce } from "use-debounce";
import { CityDto } from "@/data/dto/city-dto";
import { searchCities } from "@/data/request/city";
import { Cities } from "@/presentation/cities";

export const Home = memo(() => {
  const [searchInput, setSearchInput] = useState("");
  const [cities, setCities] = useState<CityDto[]>([]);
  const [citiesCountPerPage, setCitiesCountPerPage] = useState(30);
  const [searchInputDebounced] = useDebounce(searchInput, 500);
  const [citiesCountPerPageDebounced] = useDebounce(citiesCountPerPage, 500);

  useEffect(() => {
    async function search() {
      const cities = await searchCities(searchInputDebounced.trim());
      setCities(cities);
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

      <HStack w={"full"}>
        <Input
          flex={2}
          placeholder={"Enter city name"}
          value={searchInput}
          onChange={(event) => {
            event.preventDefault();
            setSearchInput(event.target.value);
          }}
        />
        <Select
          placeholder={"Cities count per page"}
          value={citiesCountPerPage}
          onChange={(event) => {
            if (event.target.value) {
              setCitiesCountPerPage(parseInt(event.target.value));
            }
          }}
          w={"fit-content"}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </Select>
      </HStack>

      <Cities
        cities={cities}
        citiesCountPerPage={citiesCountPerPageDebounced}
      />
    </Flex>
  );
});
