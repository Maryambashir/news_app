import { TextField, Grid, Button, Chip, Autocomplete } from '@mui/material';
import { newsCategories } from '../../data/newsCategories';
import { useState } from 'react';
import { newsAuthors } from '../../data/newsAuthors';

const SearchFilters = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    return (
        <Grid container alignItems="center" spacing={2} lg={12} >
            <Grid item lg={4}>
                <TextField
                    fullWidth
                    label="Search"
                    variant="outlined"
                />
            </Grid>
            <Grid item lg={2}>
                <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    variant="outlined"
                />
            </Grid>
            <Grid item lg={2}>
                <Autocomplete
                    fullWidth
                    multiple
                    value={selectedCategories}
                    onChange={(event: any) => setSelectedCategories(event.target.value)}
                    limitTags={1}
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
                    multiple
                    value={selectedAuthors}
                    onChange={(event, newValue) => setSelectedAuthors(newValue)}
                    limitTags={1}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                label={option}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    options={newsAuthors.map((author) => author.label)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Author"
                            variant="outlined"
                        />
                    )}
                />
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary">
                    Search
                </Button>
            </Grid>
        </Grid >
    );
};

export default SearchFilters;
