import { useEffect, useState } from "react";
import { Box, Text, Spinner, SimpleGrid } from "@chakra-ui/react";
import apiClient from "../services/api-client";

interface Game {
  id: number;
  name: string;
  background_image: string;
}

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get("/games")
      .then((response) => {
        setGames(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(
          "Failed to fetch games. Please check your API key or network."
        );
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner size="xl" />;
  if (error) return <Text color="red">{error}</Text>;

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} padding="10px">
      {games.map((game) => (
        <Box key={game.id} borderRadius="lg" overflow="hidden" boxShadow="lg">
          <img src={game.background_image} alt={game.name} />
          <Text
            padding="15px"
            fontWeight="bold"
            fontStyle="italic"
            fontSize="22"
          >
            {game.name}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default GameGrid;
