import { Episode } from "../../types";
import { Cast } from "./Cast";

interface Props {
  episode: Episode;
}

export const EpisodeListItem: React.FC<Props> = ({ episode }) => {
  return (
    <>
      <div className="season-title">{episode.season}</div>
      <div className="episode-number">{episode.episode}</div>
      <h3 className="episode-title">{episode.name}</h3>
      <div className="status">{episode.status}</div>
      <Cast cast={episode.cast}/>
    </>
  );
};



