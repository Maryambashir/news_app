import axios from "axios";
import { GuardianNewsType } from "../../types/NewsType";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const useGuardiansApi = () => {
  const newsApiBaseURL = process.env.REACT_APP_GUARDIANS_NEWS_API_URL;
  const newsApiKey = process.env.REACT_APP_GUARDIANS_NEWS_API_KEY;

  const preferredAuthor: string[] = useSelector(
    (state: RootState) => state?.preferences.authors
  );

  const getGuardianNews = async () => {
    const url = `${newsApiBaseURL}?api-key=${newsApiKey}${preferredAuthor?.length > 0 ? `&reference=${preferredAuthor}` : ""}`;

    const { data: {response: { results} } } = await axios.get<{
      response: { results: Array<GuardianNewsType> };
    }>(url);
    
    return results;
  };

  return {
    getGuardianNews,
  };
};
