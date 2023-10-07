const colors = [
  "aqua",
  "azure",
  "beige",
  "bisque",
  "black",
  "blue",
  "brown",
  "chocolate",
  "coral" /* … */,
];

export const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(
  " | "
)};`;
