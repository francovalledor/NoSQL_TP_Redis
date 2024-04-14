const HOST = `http://localhost:3000`;

const BASE_URL = `${HOST}/the-mandalorian/`;

const fetchJson = async (...params: Parameters<typeof fetch>) => fetch(...params).then(res => res.json())

export const getAllEpisodes = () => fetchJson(BASE_URL);

export const getEpisodeDetails = (season: number, episode: number) => fetchJson(`${BASE_URL}/episode?season=${season}&episode=${episode}`);

export const reserve = (season: number, episode: number) => fetchJson(`${BASE_URL}/reserve?season=${season}&episode=${episode}`, {method: "POST"});

export const pay = (season: number, episode: number) => fetchJson(`${BASE_URL}/pay?season=${season}&episode=${episode}`, {method: "POST"});
