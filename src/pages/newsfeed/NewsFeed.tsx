import { useEffect, useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import { GuardianNewsType, NewsType } from "../../types/NewsType";
import SpotlightNews from "../../components/news/SpotlightNews";
import NewsCard from "../../components/news/NewsCard";
import { useNewsApi } from "../../hooks/newsApi/useNewApi";
import HeadlineCard from "../../components/news/HeadlineCard";
import { useNyTimesApi } from "../../hooks/timesApi/useNyTimesApi";
import { useGuardiansApi } from "../../hooks/guardiansApi/useGuardiansApi";

const NewsFeed = () => {
  const [news, setNews] = useState<Awaited<Array<NewsType>>>([]);
  const [headlines, setHeadlines] = useState<Awaited<Array<GuardianNewsType>>>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const { getNews } = useNewsApi();
  const { getNYNews } = useNyTimesApi();
  const { getGuardianNews } = useGuardiansApi();


  useEffect(() => {
    (async () => {
      const newsApiOrg = await getNews();
      const nyNews = await getNYNews();
      const guardianNews = await getGuardianNews();

      setNews([...newsApiOrg, ...nyNews]);
      setHeadlines(guardianNews)
      setLoading(false)
    })();
  }, []);

  return (
    <>
      <Grid container sx={{height: '90vh', justifyContent: 'center'}}>
        {loading ? <CircularProgress></CircularProgress> : <>
          <Grid item lg={9} spacing={4}>
            <SpotlightNews
              title={news[0]?.title}
              description={news[0]?.description}
              url={news[0]?.url}
              urlToImage={news[0]?.urlToImage}
              publishedAt={news[0]?.publishedAt}
              author={news[0]?.author}
            />
            <Grid item container lg={12} spacing={2}>
              {news.map((newsItem, index) =>
                index > 1 ? (
                  <Grid item key={index} lg={4}>
                    <NewsCard
                      title={newsItem.title}
                      description={newsItem.description}
                      url={newsItem.url}
                      urlToImage={newsItem.urlToImage}
                      publishedAt={newsItem.publishedAt}
                      author={newsItem.author}
                    />
                  </Grid>
                ) : null
              )}
            </Grid>
          </Grid>
          <Grid item container lg={3} spacing={1} sx={{ display: 'block' }}>
            {headlines.map((headline, index) => (
              <Grid item lg={12} key={index}>
                <HeadlineCard
                  title={headline.webTitle}
                  url={headline.webUrl}
                  publishedAt={headline.webPublicationDate}
                />
              </Grid>
            )
            )}
          </Grid></>}
      </Grid>
    </>
  );
};

export default NewsFeed;
