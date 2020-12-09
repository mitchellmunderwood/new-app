import { NEWS_API_KEY } from "./config";

export const getArticles = async topic => {
  const response = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${topic}&api-key=${NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
};
