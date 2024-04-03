import { RequestHandler } from "express";
import { data } from "./data";
import { StatusCodes } from "http-status-codes";
import service from "./service";

const getDetails: RequestHandler = (req, res) => {
  res.send(data);
};

const reserve: RequestHandler = async (req, res) => {
  // TODO: validate input
  const { season, episode } = req.query;

  await service.reserve(Number(season), Number(episode));

  res.sendStatus(StatusCodes.OK);
};

const pay: RequestHandler = async (req, res) => {
  // TODO: validate input
  // TODO: validate is reserved
  const { season, episode } = req.query;
  await service.confirmRent(Number(season), Number(episode));

  return res.sendStatus(StatusCodes.OK);
};

export default { getDetails, reserve, pay };
