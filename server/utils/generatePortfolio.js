import fs from "fs";
import path from "path";
import slugify from "slugify";
import Portfolio from "../models/Portfolio.js";
import { portfolioTemplate } from "../templates/portfolioTemplate.js";

export const generatePortfolio = async (resume) => {
  const slug = slugify(resume.name + "-" + Date.now(), { lower: true });

  const html = portfolioTemplate(resume);

  const filePath = path.join("public", `${slug}.html`);

  fs.writeFileSync(filePath, html);

  const portfolio = await Portfolio.create({
    resumeId: resume._id,
    slug,
    url: `/portfolio/${slug}`,
    htmlPath: filePath,
  });

  return portfolio;
};