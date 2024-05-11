import axios from "axios"

export const useNewsApi = () => {

    const newsApiBaseURL = process.env.REACT_APP_NEWS_API_URL
    const newsApiKey = process.env.REACT_APP_NEWS_API_KEY

    const getNews = async () => {
        const url = `${newsApiBaseURL}/everything?q=q&apiKey=${newsApiKey}`

        const { data } = await axios.get(url)

        return data.articles
    }

    return {
        getNews
    }
}