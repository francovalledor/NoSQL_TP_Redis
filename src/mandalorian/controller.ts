import { RequestHandler, Request } from "express";
import { StatusCodes } from "http-status-codes";
import service from "./service";
import { isInteger, isUndefined } from "lodash";
import createHttpError from "http-errors";

const getDetails: RequestHandler = async (req, res) => {
  const response = await service.list();

  res.send(response);
};

const reserve: RequestHandler = async (req, res) => {
  const season = validateMandatoryInteger("season", req.query);
  const episode = validateMandatoryInteger("episode", req.query);

  validateEpisodeExists(season, episode);

  await service.reserve(Number(season), Number(episode));

  res.sendStatus(StatusCodes.OK);
};

const pay: RequestHandler = async (req, res) => {
  const season = validateMandatoryInteger("season", req.query);
  const episode = validateMandatoryInteger("episode", req.query);
  
  validateEpisodeExists(season, episode);

  // TODO: validate is reserved
  await service.confirmRent(Number(season), Number(episode));

  return res.sendStatus(StatusCodes.OK);
};

export default { getDetails, reserve, pay };


type RequestInputs = Request["query"] | Request["params"] | Request["body"]

const validateMandatoryInteger = (paramName: string, params: RequestInputs) => {
  const value = params[paramName];

  if (isUndefined(value)) {
    const error = createHttpError.BadRequest(`Missing required param "${paramName}"`)
    throw error;
  }

  const parsedValue = Number(value);

  if (isNaN(parsedValue) || !isInteger(parsedValue)) throw createHttpError.BadRequest(`The param "${paramName}" should be an integer. Received: "${value}"`);

  return parsedValue;
}

const validateEpisodeExists = (seasonNumber: number, episodeNumber: number) => {
  if (!service.seasonExists(seasonNumber)) throw new createHttpError.BadRequest(`The season ${seasonNumber} does not exist`);

  if (!service.episodeExists(seasonNumber, episodeNumber)) throw new createHttpError.BadRequest(`The episode does not exist. (season ${seasonNumber} episode ${episodeNumber})`);
}