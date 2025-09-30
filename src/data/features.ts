export const LatestBuild = "0.2.9.9";

function GetUIDataURL(path: string) {
  const base =
    "https://raw.githubusercontent.com/mspaint-cc/assets/refs/heads/main/uidata";

  const parts = path
    .split("/")
    .filter(Boolean)
    .map(encodeURIComponent)
    .join("/");

  return `${base}/${parts}.json`;
}

interface Mapping {
  Game: string; // Footer text basically
  DataURL: string;
}

function SetupGameMapping(
  name: string,
  data:
    | {
        [key: string]: Mapping;
      }
    | Mapping
) {
  const IsSingleGame = "Game" in data;

  if (IsSingleGame) {
    return {
      [name]: {
        [name]: data,
      },
    };
  }

  return {
    [name]: data,
  };
}

export const MenuMapping = {
  ...SetupGameMapping("DOORS", {
    "The Hotel": {
      Game: "DOORS",
      DataURL: GetUIDataURL("doors/hotel"),
    },

    Backdoor: {
      Game: "DOORS",
      DataURL: GetUIDataURL("doors/backdoor"),
    },

    "The Mines": {
      Game: "DOORS",
      DataURL: GetUIDataURL("doors/mines"),
    },

    "The Rooms": {
      Game: "DOORS",
      DataURL: GetUIDataURL("doors/rooms"),
    },

    /*
    TODO: uncomment when they are no longer under maintenance
    "Hotel-": {
      Game: "DOORS (Doors)",
      DataURL: GetUIDataURL("doors/hotelminus"),
    },

    "Super Hard Mode": {
      Game: "DOORS",
      DataURL: GetUIDataURL("doors/superhardmode"),
    },

    "Retro Mode": {
      Game: "DOORS",
      DataURL: GetUIDataURL("doors/retromode"),
    },*/

    Lobby: {
      Game: "DOORS (Lobby)",
      DataURL: GetUIDataURL("doors/lobby"),
    },
  }),

  ...SetupGameMapping("Fisch", {
    Game: "Fisch",
    DataURL: GetUIDataURL("fisch"),
  }),

  ...SetupGameMapping("R&D", {
    Game: "R&D",
    DataURL: GetUIDataURL("R&D"),
  }),

  ...SetupGameMapping("Pressure", {
    Pressure: {
      Game: "Pressure",
      DataURL: GetUIDataURL("pressure/main"),
    },

    Raveyard: {
      Game: "Pressure",
      DataURL: GetUIDataURL("pressure/raveyard"),
    },

    "The Hunted": {
      Game: "Pressure",
      DataURL: GetUIDataURL("pressure/hunted"),
    },

    "Three Nights at the Blacksite": {
      Game: "Pressure (Three Nights at the Blacksite)",
      DataURL: GetUIDataURL("pressure/threenightsatblacksite"),
    },

    Lobby: {
      Game: "Pressure (Lobby)",
      DataURL: GetUIDataURL("pressure/lobby"),
    },
  }),

  ...SetupGameMapping("3008", {
    Game: "3008",
    DataURL: GetUIDataURL("3008"),
  }),

  ...SetupGameMapping("Build A Boat For Treasure", {
    Game: "Build A Boat For Treasure",
    DataURL: GetUIDataURL("babft"),
  }),

  ...SetupGameMapping("Grace", {
    Game: "Grace [BETA]",
    DataURL: GetUIDataURL("grace"),
  }),

  ...SetupGameMapping("Murder Mystery 2", {
    Game: "Murder Mystery 2 [BETA]",
    DataURL: GetUIDataURL("mm2"),
  }),

  ...SetupGameMapping("Word Bomb", {
    Game: "Word Bomb",
    DataURL: GetUIDataURL("wordbomb"),
  }),

  ...SetupGameMapping("Notoriety", {
    Notoriety: {
      Game: "Notoriety [BETA]",
      DataURL: GetUIDataURL("notoriety/main"),
    },

    Lobby: {
      Game: "Notoriety [BETA]",
      DataURL: GetUIDataURL("notoriety/lobby"),
    },
  }),

  ...SetupGameMapping("Bubble Gum Simulator Infinity", {
    Game: "Bubble Gum Simulator Infinity [BETA]",
    DataURL: GetUIDataURL("bgsi"),
  }),

  ...SetupGameMapping("Dead Rails", {
    Game: "Dead Rails [BETA]",
    DataURL: GetUIDataURL("deadrails"),
  }),

  ...SetupGameMapping("Grow A Garden", {
    Game: "Grow A Garden [BETA]",
    DataURL: GetUIDataURL("gag"),
  }),

  ...SetupGameMapping("99 Nights In The Forest", {
    Game: "99 Nights In The Forest [BETA]",
    DataURL: GetUIDataURL("99nightsintheforest"),
  }),

  ...SetupGameMapping("Forsaken", {
    Game: "Forsaken [BETA]",
    DataURL: GetUIDataURL("forsaken"),
  }),

  ...SetupGameMapping("Universal", {
    Game: "Universal",
    DataURL: GetUIDataURL("universal"),
  }),
  ...SetupGameMapping("Fortnite", {
    Game: "Fortnite",
    DataURL: GetUIDataURL("fortnite"),
  }),
  ...SetupGameMapping("Fortntie", {
    Game: "Fortntie",
    DataURL: GetUIDataURL("fortnite"),
  }),

};
