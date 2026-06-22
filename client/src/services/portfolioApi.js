import api from "../configs/api";

export const generatePortfolio = (userId) =>
  api.post("/portfolio/generate", { userId });

export const getPortfolio = (slug) =>
  api.get(`/portfolio/${slug}`);

export const updateTemplate = (data) =>
  api.put("/portfolio/template", data);