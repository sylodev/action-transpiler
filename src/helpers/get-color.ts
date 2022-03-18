const COLOURS = [
  {
    name: "RED",
    hex: "#F44336",
    light: false,
  },
  {
    name: "PINK",
    hex: "#E91E63",
    light: false,
  },
  {
    name: "PURPLE",
    hex: "#9C27B0",
    light: false,
  },
  {
    name: "DEEP PURPLE",
    hex: "#673AB7",
    light: false,
  },
  {
    name: "INDIGO",
    hex: "#3F51B5",
    light: false,
  },
  {
    name: "BLUE",
    hex: "#2196F3",
    light: false,
  },
  {
    name: "LIGHT BLUE",
    hex: "#03A9F4",
    light: false,
  },
  {
    name: "CYAN",
    hex: "#00BCD4",
    light: false,
  },
  {
    name: "TEAL",
    hex: "#009688",
    light: false,
  },
  {
    name: "GREEN",
    hex: "#4CAF50",
    light: false,
  },
  {
    name: "LIGHT GREEN",
    hex: "#8BC34A",
    light: false,
  },
  {
    name: "LIME",
    hex: "#CDDC39",
    light: true,
  },
  {
    name: "YELLOW",
    hex: "#FFEB3B",
    light: true,
  },
  {
    name: "AMBER",
    hex: "#FFC107",
    light: true,
  },
  {
    name: "ORANGE",
    hex: "#FF9800",
    light: true,
  },
  {
    name: "DEEP ORANGE",
    hex: "#FF5722",
    light: false,
  },
  {
    name: "BROWN",
    hex: "#795548",
    light: false,
  },
  {
    name: "GREY",
    hex: "#9E9E9E",
    light: false,
  },
  {
    name: "BLUE GREY",
    hex: "#607D8B",
    light: false,
  },
  {
    name: "ROLE DEFAULT",
    hex: "#4f545c",
    light: false,
  },
];

const COLOUR_MAP = new Map<string, typeof COLOURS[number]>();
for (const colour of COLOURS) {
  COLOUR_MAP.set(colour.name.toLowerCase(), colour);
}

// ported basically 1:1 from v8
export const getColour = (input: string) => {
  const colour = COLOUR_MAP.get(input.toLowerCase());
  if (colour) {
    return {
      ...colour,
      decimal: parseInt(colour.hex.replace(/#/g, ""), 16),
    };
  }
};
