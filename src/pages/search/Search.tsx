
import { useState, useEffect } from 'react';
import { Container, Grid, CircularProgress, Box, TextField, Autocomplete, Chip, Button } from '@mui/material';
import { NewsType } from '../../types/NewsType';
import SearchNewsCard from '../../components/search/SearchNewsCard';
import { useNewsApi } from '../../hooks/newsApi/useNewApi';
import { newsCategories } from '../../data/newsCategories';
import { SelectOptionType } from '../../types/SelectOptionType';

const Search = () => {
  const [newsData, setNewsData] = useState<Awaited<Array<NewsType>>>([]);
  const [paginatedData, setPaginatedData] = useState<Awaited<Array<NewsType>>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newsSources, setNewsSources] = useState<Awaited<Array<SelectOptionType>>>([]);
  const [date, setDate] = useState<string>('')
  const [loading, setLoading] = useState(false);

  const { getSearchNews, getSources } = useNewsApi();

  useEffect(() => {
    (async () => {
      const newsData = await getSearchNews();

      setNewsData(newsData);
      setPaginatedData(newsData.slice(0, 10))

      const newsApiOrg = await getSources();
      setNewsSources(newsApiOrg);
    })();
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    setLoading(true)
    const bottom =
      event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
      event.currentTarget.clientHeight;

    const shouldLoadMore = newsData.length >= paginatedData.length
    if (bottom && shouldLoadMore) {
      const updatedData = newsData.slice(0, paginatedData.length + 10)
      setPaginatedData(updatedData)
    }
    setLoading(false)
  };
  const isButtonDisabled = searchQuery?.length == 0 && date?.length == 0 && selectedSource?.length == 0 && selectedCategory?.length == 0

  const handleSearch = async () => {
    setLoading(true)
    const newsData = await getSearchNews(searchQuery, date, selectedSource, selectedCategory);

    setNewsData(newsData);
    setPaginatedData(newsData.slice(0, 10))
    setLoading(false)
  }

  return (<>
    <Box sx={{ margin: '10px' }}>
      <Grid container alignItems="center" spacing={2} lg={12} >
        <Grid item lg={4}>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </Grid>
        <Grid item lg={2}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            variant="outlined"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </Grid>
        <Grid item lg={2}>
          <Autocomplete
            fullWidth
            value={selectedCategory}
            onChange={(event: React.ChangeEvent<{}>, newValue: string | null) => {
              if (newValue != null) {
                setSelectedCategory(newValue)
              } else {
                setSelectedCategory('')
              }
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            options={newsCategories.map((category) => category.label)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item lg={2}>
          <Autocomplete
            fullWidth
            value={selectedSource}
            onChange={(event: React.ChangeEvent<{}>, newValue: string | null) => {
              if (newValue != null) {
               setSelectedSource(newValue)
              } else {
                setSelectedSource('')
              }
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            options={newsSources.map((source) => source.label)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Source"
                variant="outlined"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" disabled={isButtonDisabled} onClick={handleSearch}>
            Search
          </Button>
        </Grid>
      </Grid >
    </Box>
    <Container style={{ maxHeight: '80vh', overflowY: 'auto' }} onScroll={handleScroll}>
      <Grid container spacing={2}>
        {paginatedData.map((news, i) => (
          <Grid item xs={12} key={i}>
            <SearchNewsCard {...news} />
          </Grid>
        ))}
      </Grid>
      {loading && <CircularProgress />}
      {!loading && paginatedData.length >= newsData.length && <p>No more news</p>}
    </Container>
  </>
  );
};

export default Search;