// 📁 utils/buildLogMessage.js
const buildLogMessage = (template, variables = {}) => {
  if (!template) return '';

  return template.replace(/\{(\w+)\}/g, (_, key) => {
    return variables[key] !== undefined ? variables[key] : `{${key}}`;
  });
};

module.exports = buildLogMessage;
