import redisClient from "../redisClient";
import { data, Season } from "./data";
import { fromPairs } from "lodash";

const getEpisodeIdentifier = (season: number, episode: number) =>
  `${season}:${episode}`;

const PREFIX = "mandalorian";

const REDIS_KEYS = {
  episodeStatus: (season: number, episode: number) =>
    `${PREFIX}:statuses:${getEpisodeIdentifier(season, episode)}`,
};

export enum EPISODE_STATUS {
  RESERVED = "RESERVED",
  RENTED = "RENTED",
  AVAILABLE = "AVAILABLE",
}

const getEpisodeStatus = async (season: number, episode: number): Promise<EPISODE_STATUS> => {
  const response = await redisClient.get(
    REDIS_KEYS.episodeStatus(season, episode)
  );

  return (response ?? EPISODE_STATUS.AVAILABLE) as EPISODE_STATUS;
};

const getAllStatuses = async () => {
  const allTheEpisodes = data.seasons
    .map((season) =>
      season.episodes.map((episode) => ({
        season: season.number,
        episode: episode.number,
      }))
    )
    .flat();

  const allTheKeys = allTheEpisodes.map(({ episode, season }) =>
    REDIS_KEYS.episodeStatus(season, episode)
  );

  const response = (await redisClient.mGet(allTheKeys)).map(
    (status) => status ?? EPISODE_STATUS.AVAILABLE
  );

  const dictionary = fromPairs(
    allTheEpisodes.map(({ episode, season }, index) => [
      getEpisodeIdentifier(season, episode),
      response[index],
    ])
  );

  return dictionary;
};

const isAvailable = async (season: number, episode: number) => {
  const status = await getEpisodeStatus(season, episode);

  return status === EPISODE_STATUS.AVAILABLE;
};

const reserve = async (season: number, episode: number) => {
  const RESERVATION_TTL = 60 * 4;

  await redisClient.set(
    REDIS_KEYS.episodeStatus(season, episode),
    EPISODE_STATUS.RESERVED,
    { EX: RESERVATION_TTL }
  );
};

const confirmRent = async (season: number, episode: number) => {
  const RENT_TTL = 60 * 60 * 24;

  await redisClient.set(
    REDIS_KEYS.episodeStatus(season, episode),
    EPISODE_STATUS.RENTED,
    { EX: RENT_TTL }
  );
};

const list = async () => {
  const statuses = await getAllStatuses();
  const enrichSeasonWithStatuses = (season: Season) => ({
    ...season,
    episodes: season.episodes.map((episode) => ({
      ...episode,
      status: statuses[getEpisodeIdentifier(season.number, episode.number)],
    })),
  });

  return { ...data, seasons: data.seasons.map(enrichSeasonWithStatuses) };
};

const getSeasonBySeasonNumber = (seasonNumber: number) => data.seasons.find(season => season.number === seasonNumber)

const seasonExists = (season: number) => !!getSeasonBySeasonNumber(season);

const episodeExists = (seasonNumber: number, episodeNumber: number) => {
  const season = getSeasonBySeasonNumber(seasonNumber);

  if (!season) return false;

  return !!season.episodes.find(ep => ep.number === episodeNumber);
};

export default { isAvailable, reserve, confirmRent, list, seasonExists, episodeExists, getEpisodeStatus };
