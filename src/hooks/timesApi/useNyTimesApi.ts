import axios from "axios";
import { NYTimesResponseType, NewsType } from "../../types/NewsType";

export const useNyTimesApi = () => {
  const newsApiBaseURL = process.env.REACT_APP_NY_TIMES_API_URL;
  const newsApiKey = process.env.REACT_APP_NY_TIMES_API_KEY;

  const getFormattedData = (newsData: NYTimesResponseType[]) => {
    let newsTypeFormatData: NewsType[] = [];

    newsData.forEach((newsItem: NYTimesResponseType) => {
      newsTypeFormatData.push({
        title: newsItem?.headline?.main,
        description: newsItem?.lead_paragraph,
        urlToImage: newsItem?.multimedia[0]?.url
          ? `https://www.nytimes.com/${newsItem?.multimedia[0]?.url}`
          : "",
        publishedAt: newsItem?.pub_date.slice(0, 10),
        author: newsItem?.byline.original,
        url: newsItem?.web_url,
      });
    });

    return newsTypeFormatData;
  };

  const getNYNews = async () => {
    const { data } = await axios.get<{
      response: { docs: Array<NYTimesResponseType> };
    }>(`${newsApiBaseURL}?api-key=${newsApiKey}`);

    const newsData: NYTimesResponseType[] = data.response.docs;

    const formattedData: NewsType[] = getFormattedData(newsData);

    return formattedData;
  };

  return {
    getNYNews,
  };
};
