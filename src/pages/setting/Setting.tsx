import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button, Box, Chip } from '@mui/material';
import { styled } from '@mui/system';
import { newsAuthors } from '../../data/newsAuthors';
import { newsCategories } from '../../data/newsCategories';
import { SelectOptionType } from '../../types/SelectOptionType';
import { useNewsApi } from '../../hooks/newsApi/useNewApi';
import { useDispatch } from 'react-redux';
import { setPreferences } from '../../redux/reducer/preferences';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { PreferenceState } from '../../types/PreferencesType';
import { textStyle } from '../../commonStyles';

const StyledCard = styled(Card)({
    borderRadius: 12,
    boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.06)',
    '&:hover': {
        boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.1)',
    },
});

const StyledButton = styled(Button)({
    marginTop: '1rem',
});

const Setting = () => {
    const preferences: PreferenceState = useSelector((state: RootState) => state?.preferences);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>(preferences.authors || []);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(preferences.categories || []);
    const [selectedSources, setSelectedSources] = useState<string[]>(preferences.sources || []);
    const [newsSources, setNewsSources] = useState<Awaited<Array<SelectOptionType>>>([]);

    const dispatch = useDispatch();

    const { getSources } = useNewsApi()

    useEffect(() => {
        (async () => {
            const newsApiOrg = await getSources();
            setNewsSources(newsApiOrg);
        })();
    }, []);

    const handleAuthorChange = (event: any) => {
        setSelectedAuthors(event.target.value);
    };

    const handleCategoryChange = (event: any) => {
        setSelectedCategories(event.target.value);
    };

    const handleSourceChange = (event: any) => {
        setSelectedSources(event.target.value);
    };

    const handleSetPreferences = () => {

        dispatch(setPreferences({
            authors: selectedAuthors,
            categories: selectedCategories,
            sources: selectedSources
        }))
    }

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '90vh' }}>
            <Grid item xs={10} md={6}>
                <StyledCard>
                    <CardContent>
                        <Typography variant="h4" gutterBottom sx={textStyle}>
                            Settings Page
                        </Typography>
                        <Typography variant="body1" gutterBottom sx={textStyle}>
                            Customize your Newsfeed by choosing the right preferences.
                        </Typography>
                        <FormControl fullWidth sx={{ my: 2 }} variant='standard'>
                            <InputLabel id="author-select-label">Authors</InputLabel>
                            <Select
                                labelId="author-select-label"
                                id="author-select"
                                multiple
                                value={selectedAuthors}
                                onChange={handleAuthorChange}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value, index) => (
                                            <Chip key={index} label={value} />
                                        ))}
                                    </Box>
                                )}>
                                {newsAuthors.map((author, index) => (
                                    <MenuItem key={`author-${index}`} value={author.value}>
                                        {author.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ my: 2 }} variant='standard'>
                            <InputLabel id="category-select-label">Categories</InputLabel>
                            <Select
                                labelId="category-select-label"
                                id="category-select"
                                multiple
                                value={selectedCategories}
                                onChange={handleCategoryChange}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                            >
                                {newsCategories.map((category, index) => (
                                    <MenuItem key={`category-${index}`} value={category.value}>
                                        {category.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ my: 2 }} variant='standard'>
                            <InputLabel id="source-select-label">Sources</InputLabel>
                            <Select
                                labelId="source-select-label"
                                id="source-select"
                                multiple
                                value={selectedSources}
                                onChange={handleSourceChange}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}                            >
                                {newsSources.map((source, index) => (
                                    <MenuItem key={`source-${index}`} value={source.value}>
                                        {source.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <StyledButton variant="contained" color="primary" fullWidth onClick={handleSetPreferences}>
                            Save Changes
                        </StyledButton>
                    </CardContent>
                </StyledCard>
            </Grid>
        </Grid>
    );
};

export default Setting;
