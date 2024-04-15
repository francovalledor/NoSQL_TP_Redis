import { useEffect, useState } from "react";
import { Episode } from "../types";
import { fetchAllEpisodes } from "../fetch";
import { EpisodeListItem } from "./EpisodeListItem/EpisodeListItem";

export const AllTheEpisodes = () => {
  const [data, setData] = useState<Episode[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const response = await fetchAllEpisodes();
    setData(response);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <div>Loading</div>;

  return (
    <>
      <h2>All The Episodes</h2>
      <ul>
        {data?.map((ep) => (
          <li>
            <EpisodeListItem episode={ep} />
          </li>
        ))}
      </ul>
    </>
  );
};
