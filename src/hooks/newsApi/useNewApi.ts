import axios from "axios"
import { SelectOptionType } from "../../types/SelectOptionType"
import { SourceAPIResponseType } from "../../types/sourceType"

export const useNewsApi = () => {

    const newsApiBaseURL = process.env.REACT_APP_NEWS_API_URL
    const newsApiKey = process.env.REACT_APP_NEWS_API_KEY

    const getNews = async () => {
        const url = `${newsApiBaseURL}/everything?q=q&apiKey=${newsApiKey}`

        const { data } = await axios.get(url)

        return data.articles
    }

    const getSources = async () => {
        const url = `${newsApiBaseURL}/top-headlines/sources?apiKey=${newsApiKey}`

        const response  = await axios.get<{sources: Array<SourceAPIResponseType>}>(url);

        const { data: {sources} } = response


        const formattedSources = sources.map((source: SourceAPIResponseType) => ({
            label: source.name,
            value: source.id
        }));
        
        

        return formattedSources
    }

    return {
        getNews,
        getSources
    }
}