import axios from "axios";
import { GuardianNewsType } from "../../types/NewsType";

export const useGuardiansApi = () => {
  const newsApiBaseURL = process.env.REACT_APP_GUARDIANS_NEWS_API_URL;
  const newsApiKey = process.env.REACT_APP_GUARDIANS_NEWS_API_KEY;

  const getGuardianNews = async () => {
    const url = `${newsApiBaseURL}?api-key=${newsApiKey}`;

    const { data: {response: { results} } } = await axios.get<{
      response: { results: Array<GuardianNewsType> };
    }>(url);
    
    return results;
  };

  return {
    getGuardianNews,
  };
};
