import axios from "axios";
import { SelectOptionType } from "../../types/SelectOptionType";
import { SourceAPIResponseType } from "../../types/sourceType";

export const useNewsApi = () => {
  const newsApiBaseURL = process.env.REACT_APP_NEWS_API_URL;
  const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;

  const constructQueryString = (
    searchQuery: string = "",
    date: string = "",
    source: string = "",
    category: string = ""
  ) => {
    const queryParams = [];

    if (searchQuery.trim() !== "") {
      queryParams.push(`q=${searchQuery}`);
    } else {
      queryParams.push(`q=q`);
    }
    if (date.trim() !== "") {
      queryParams.push(`date=${date}`);
    }
    if (source.trim() !== "") {
      queryParams.push(`sources=${(source.toLowerCase())}`);
    } else if (category.trim() !== "") {
      queryParams.push(`category=${category.toLowerCase()}`);
    }
    return queryParams.join("&");
  };

  const getNews = async () => {
    const url = `${newsApiBaseURL}/everything?q=q&apiKey=${newsApiKey}`;

    const { data } = await axios.get(url);

    return data.articles;
  };

  const getSearchNews = async (
    searchQuery: string = "",
    date: string = "",
    source: string = "",
    category: string = ""
  ) => {
    let queries = constructQueryString(searchQuery, date, source, category);
    const url = `${newsApiBaseURL}/top-headlines?apiKey=${newsApiKey}&${queries}`;

    const response = await axios.get(url);

    const {
      data: { articles },
    } = response;

    return articles;
  };

  const getSources = async () => {
    const url = `${newsApiBaseURL}/top-headlines/sources?apiKey=${newsApiKey}`;

    const response = await axios.get<{ sources: Array<SourceAPIResponseType> }>(
      url
    );

    const {
      data: { sources },
    } = response;

    const formattedSources = sources.map((source: SourceAPIResponseType) => ({
      label: source.name,
      value: source.id,
    }));

    return formattedSources;
  };

  return {
    getNews,
    getSources,
    getSearchNews,
  };
};
