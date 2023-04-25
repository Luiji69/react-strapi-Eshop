import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './SideNavbar.scss';
import useFetch from '../hooks/useFetch';

const SideNavbar = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch('/categories');
  const [expanded, setExpanded] = useState(false); // State to control collapse

  const handleCategoryClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Box className="side-navbar">
      {error && <div className="error">Something went wrong!</div>}
      {loading && <div className="loading">Loading...</div>}
      {data && (
        <List
          className="category-list"
          subheader={
            <ListSubheader component="div" className='category-subheader'>
              Categories
            </ListSubheader>
          }
        >
          <Divider />
          {data.slice(0, 5).map((category) => (
            <ListItem key={category.id} className="category-item">
              <ListItemButton
                className="category-button"
                onClick={() => handleCategoryClick(category.id)}
              >
                <ListItemIcon>
                  <NavigateNextIcon />
                </ListItemIcon>
                <ListItemText className='category-title' primary={category.attributes.title} />
              </ListItemButton>
            </ListItem>
          ))}
          {data.length > 5 && ( // Only show collapse if there are more than 5 categories
            <div>
              <Divider />
              <ListItemButton onClick={handleExpandClick}>
                <Typography variant="body1">
                  Show {expanded ? 'less' : 'more'}
                </Typography>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {data.slice(5).map((category) => (
                    <ListItem key={category.id} className="category-item">
                      <ListItemButton
                        className="category-button"
                        onClick={() => handleCategoryClick(category.id)}
                      >
                        <ListItemIcon>
                          <NavigateNextIcon />
                        </ListItemIcon>
                        <ListItemText className='category-title' primary={category.attributes.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </div>
          )}
          <Divider />
        </List>
      )}
    </Box>
  );
};

export default SideNavbar;
