import { CityDto } from "@/data/dto/city-dto";
import { Button, SimpleGrid } from "@chakra-ui/react";
import { City } from "@/presentation/city";
import React, { memo, useEffect, useState } from "react";

interface Props {
  cities: CityDto[];
  citiesCountPerPage: number;
}

export const Cities = memo(({ cities, citiesCountPerPage }: Props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [cities]);

  return (
    <>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        gap={"4"}
        pt={"4"}
        w={"full"}
      >
        {cities
          .slice(0, Math.min(cities.length, page * citiesCountPerPage))
          .map((value) => {
            return <City city={value} key={value._id} />;
          })}
      </SimpleGrid>
      {page * citiesCountPerPage < cities.length && (
        <Button
          onClick={(event) => {
            event.preventDefault();
            setPage(page + 1);
          }}
          mt={"4"}
        >
          Load more cities
        </Button>
      )}
    </>
  );
});
