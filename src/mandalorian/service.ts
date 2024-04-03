import redisClient from "../redisClient";
import { data } from "./data";

const PREFIX = "mandalorian";

const REDIS_KEYS = {
  episodeStatus: (season: number, episode: number) =>
    `${PREFIX}:statuses:${season}:${episode}`,
};

enum STATUS {
  RESERVED = "RESERVED",
  RENTED = "RENTED",
  AVAILABLE = "AVAILABLE",
}

const getStatus = async (season: number, episode: number): Promise<STATUS> => {
  const response = await redisClient.get(
    REDIS_KEYS.episodeStatus(season, episode)
  );

  return (response ?? STATUS.AVAILABLE) as STATUS;
};

const getAllStatuses = async () => {
  const allTheEpisodes = data.seasons.map((season) =>
    season.episodes.map((episode) => ({season: season.number, episode: episode.number }))
  ).flat();

  const allTheKeys = allTheEpisodes.map(({episode, season}) => REDIS_KEYS.episodeStatus(season, episode));

  const response = (await redisClient.mGet(allTheKeys)).map(status => status ?? STATUS.AVAILABLE);

  const joined = allTheEpisodes.map(({episode, season}, index) => ({season, episode, status: response[index]}))

  return joined;
};

const isAvailable = async (season: number, episode: number) => {
  const status = await getStatus(season, episode);

  return status === STATUS.AVAILABLE;
};

const reserve = async (season: number, episode: number) => {
  const RESERVATION_TTL = 60 * 4;

  await redisClient.set(
    REDIS_KEYS.episodeStatus(season, episode),
    STATUS.RESERVED,
    { EX: RESERVATION_TTL }
  );
};

const confirmRent = async (season: number, episode: number) => {
  const RENT_TTL = 60 * 60 * 24;

  await redisClient.set(
    REDIS_KEYS.episodeStatus(season, episode),
    STATUS.RENTED,
    { EX: RENT_TTL }
  );
};

export default { isAvailable, reserve, confirmRent };
