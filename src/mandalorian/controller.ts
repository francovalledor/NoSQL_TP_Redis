import { RequestHandler } from "express";
import { data } from "./data";

const getDetails: RequestHandler = (req, res) => {
  res.send(data);
};

export default {
  getDetails,
};
