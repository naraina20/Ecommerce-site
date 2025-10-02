require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  extensions: [".js", ".jsx"],
  ignore: [/(node_modules)/],
});
require("ignore-styles"); // ignore CSS imports in React components
