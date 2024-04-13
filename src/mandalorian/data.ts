/*
  TMDB id: 82856
  details:  'https://api.themoviedb.org/3/tv/82856?language=en-US'
  season details: `https://api.themoviedb.org/${seasonNumber}/tv/82856/season/0?language=en-US`;
*/

export const data = {
  name: "The Mandalorian",
  number_of_episodes: 24,
  number_of_seasons: 3,
  seasons: [
    {
      number: 0,
      name: "Specials",

      episodes: [
        {
          number: 1,
          name: "Remnants of the Empire",
        },
        {
          number: 2,
          name: "Forging the Covert: Part One",
        },
        {
          number: 3,
          name: "Designing the New Republic",
        },
        {
          number: 4,
          name: "Forging the Covert: Part Two",
        },
      ],
    },
    {
      number: 1,
      name: "Season 1",
      episodes: [
        {
          number: 1,
          name: "Chapter 1: The Mandalorian",
        },
        {
          number: 2,
          name: "Chapter 2: The Child",
        },
        {
          number: 3,
          name: "Chapter 3: The Sin",
        },
        {
          number: 4,
          name: "Chapter 4: Sanctuary",
        },
        {
          number: 5,
          name: "Chapter 5: The Gunslinger",
        },
        {
          number: 6,
          name: "Chapter 6: The Prisoner",
        },
        {
          number: 7,
          name: "Chapter 7: The Reckoning",
        },
        {
          number: 8,
          name: "Chapter 8: Redemption",
        },
      ],
    },
    {
      number: 2,
      name: "Season 2",
      episodes: [
        {
          number: 1,
          name: "Chapter 9: The Marshal",
        },
        {
          number: 2,
          name: "Chapter 10: The Passenger",
        },
        {
          number: 3,
          name: "Chapter 11: The Heiress",
        },
        {
          number: 4,
          name: "Chapter 12: The Siege",
        },
        {
          number: 5,
          name: "Chapter 13: The Jedi",
        },
        {
          number: 6,
          name: "Chapter 14: The Tragedy",
        },
        {
          number: 7,
          name: "Chapter 15: The Believer",
        },
        {
          number: 8,
          name: "Chapter 16: The Rescue",
        },
      ],
    },
    {
      number: 3,
      name: "Season 3",
      episodes: [
        {
          number: 1,
          name: "Chapter 17: The Apostate",
        },
        {
          number: 2,
          name: "Chapter 18: The Mines of Mandalore",
        },
        {
          number: 3,
          name: "Chapter 19: The Convert",
        },
        {
          number: 4,
          name: "Chapter 20: The Foundling",
        },
        {
          number: 5,
          name: "Chapter 21: The Pirate",
        },
        {
          number: 6,
          name: "Chapter 22: Guns for Hire",
        },
        {
          number: 7,
          name: "Chapter 23: The Spies",
        },
        {
          number: 8,
          name: "Chapter 24: The Return",
        },
      ],
    },
  ],
};

export type Season = (typeof data['seasons'])[number]