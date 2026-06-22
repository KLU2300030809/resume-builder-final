import { templates } from "../../templates";

export default function PortfolioRenderer({ resume, template }) {
  const Template = templates[template] || templates.modern;

  return <Template resume={resume} />;
}