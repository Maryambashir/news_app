import axios from "axios";
import { SourceAPIResponseType } from "../../types/sourceType";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const useNewsApi = () => {
  const newsApiBaseURL = process.env.REACT_APP_NEWS_API_URL;
  const newsApiKey = process.env.REACT_APP_NEWS_API_KEY;
  const preferredSources: string[] = useSelector(
    (state: RootState) => state?.preferences.sources
  );

  const constructQueryString = (
    searchQuery: string = "",
    date: string = "",
    sources: string | string[] = "",
    categories: string | string[] = "",
  ) => {
    const queryParams = [];

    if (searchQuery.trim() !== "") {
      queryParams.push(`q=${searchQuery}`);
    } else {
      queryParams.push(`q=q`);
    }
    if (date.trim() !== "") {
      queryParams.push(`from=${date}`);
    }
    if (typeof sources === "string" && sources.trim() !== "") {
      queryParams.push(`sources=${sources}`);
    } else if (Array.isArray(sources) && sources.length > 0) {
      const formattedSources = sources.join(",");
      queryParams.push(`sources=${formattedSources}`);
    } else if (typeof categories === "string" && categories.trim() !== "") {
      queryParams.push(`category=${categories}`);
    } else if (Array.isArray(categories) && categories.length > 0) {
      const formattedCategories = categories.join(",");
      queryParams.push(`category=${formattedCategories}`);
    }

    return queryParams.join("&");
  };

  const getNews = async () => {
    const queries = constructQueryString("", "", preferredSources, []);
    const url = `${newsApiBaseURL}/everything?apiKey=${newsApiKey}&${queries}`;

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
