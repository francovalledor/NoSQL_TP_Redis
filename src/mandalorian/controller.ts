import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import service from "./service";

const getDetails: RequestHandler = async (req, res) => {
  const response = await service.list();
  
  res.send(response);
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
