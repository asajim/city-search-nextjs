import React, { memo, useEffect, useState } from "react";
import { Flex, Heading, HStack, Image, Input } from "@chakra-ui/react";
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
        <Input
          flex={1}
          placeholder={"Enter cities count per page"}
          value={citiesCountPerPage}
          type={"number"}
          pattern={"[0-9]*(.[0-9]+)?"}
          inputMode={"decimal"}
          onChange={(event) => {
            event.preventDefault();
            var count = 0;
            try {
              count = parseInt(event.target.value);
              if (isNaN(count)) {
                count = 0;
              }
            } catch (e) {
              console.error(e);
            }
            setCitiesCountPerPage(count);
          }}
        />
      </HStack>

      <Cities
        cities={cities}
        citiesCountPerPage={citiesCountPerPageDebounced}
      />
    </Flex>
  );
});
