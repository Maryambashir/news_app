
import SearchFilters from '../../components/search/SearchFilters';
import { useState, useEffect } from 'react';
import { Container, Grid, CircularProgress, Box } from '@mui/material';
import { GuardianNewsType, NewsType } from '../../types/NewsType';
import SearchNewsCard from '../../components/search/SearchNewsCard';
import { useNewsApi } from '../../hooks/newsApi/useNewApi';
import { useGuardiansApi } from '../../hooks/guardiansApi/useGuardiansApi';
import { useNyTimesApi } from '../../hooks/timesApi/useNyTimesApi';

const Search = () => {
  const [newsData, setNewsData] = useState<Awaited<Array<NewsType>>>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { getNYNews } = useNyTimesApi();

  useEffect(() => {
    (async () => {
      const newsData = await getNYNews();
      console.log(newsData)
      setNewsData(newsData);
    })();
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const bottom =
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight;
    if (bottom && hasMore) {

    }
  };

  return (<>
    <Box sx={{ margin: '10px' }}>
      <SearchFilters />
    </Box>
    <Container style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <Grid container spacing={2} onScroll={handleScroll}>
        {newsData.map((d, i) => (
          <Grid item xs={12} key={i}>
            <SearchNewsCard {...d} />
          </Grid>
        ))}
      </Grid>
      {loading && <CircularProgress />}
      {!loading && !hasMore && <p>No more news</p>}
    </Container>
  </>
  );
};

export default Search;