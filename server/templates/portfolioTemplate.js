export const portfolioTemplate = (data) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>${data.name} Portfolio</title>
    <style>
      body { font-family: Arial; margin: 40px; }
      h1 { color: #333; }
      .section { margin-bottom: 20px; }
      .skills span {
        background: #eee;
        padding: 5px 10px;
        margin: 5px;
        display: inline-block;
        border-radius: 5px;
      }
    </style>
  </head>

  <body>
    <h1>${data.name}</h1>
    <h3>${data.title}</h3>

    <div class="section">
      <h2>Summary</h2>
      <p>${data.summary}</p>
    </div>

    <div class="section">
      <h2>Skills</h2>
      <div class="skills">
        ${data.skills.map(skill => `<span>${skill}</span>`).join("")}
      </div>
    </div>

    <div class="section">
      <h2>Projects</h2>
      ${data.projects.map(p => `
        <div>
          <h3>${p.name}</h3>
          <p>${p.description}</p>
        </div>
      `).join("")}
    </div>
  </body>
  </html>
  `;
};