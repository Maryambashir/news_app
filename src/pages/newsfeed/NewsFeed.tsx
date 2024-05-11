import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { NewsType } from "../../types/NewsType";
import SpotlightNews from "../../components/news/SpotlightNews";
import NewsCard from "../../components/news/NewsCard";
import { useNewsApi } from "../../hooks/newsApi/useNewApi";
import HeadlineCard from "../../components/news/HeadlineCard";

const NewsFeed = () => {
  const { getNews } = useNewsApi();
  const [news, setNews] = useState<Awaited<Array<NewsType>>>([]);

  useEffect(() => {
    (async () => {
      const newsApiOrg = await getNews();
      setNews(newsApiOrg);
    })();
  }, []);

  return (
    <>
      <Grid container>
        <Grid item lg={9} spacing={4}>
          <SpotlightNews
            title={news[0]?.title}
            description={news[0]?.description}
            url={news[0]?.url}
            urlToImage={news[0]?.urlToImage}
            publishedAt={news[0]?.publishedAt}
          />
          <Grid item container lg={12} spacing={2}>
            {news.map((newsItem, index) =>
              index > 1 && index <= 4 ? (
                <Grid item key={index} lg={4}>
                  <NewsCard
                    title={newsItem.title}
                    description={newsItem.description}
                    url={newsItem.url}
                    urlToImage={newsItem.urlToImage}
                    publishedAt={newsItem.publishedAt}
                  />
                </Grid>
              ) : null
            )}
          </Grid>
        </Grid>
        <Grid item container lg={3} spacing={1}>
          {news.map((newsItem, index) =>
            index > 1 && index <= 10 ? (
              <Grid item lg={12} key={index}>
                <HeadlineCard
                  title={newsItem.title}
                  description={newsItem.description}
                  url={newsItem.url}
                  urlToImage={newsItem.urlToImage}
                  publishedAt={newsItem.publishedAt}
                />
              </Grid>
            ) : null
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default NewsFeed;
