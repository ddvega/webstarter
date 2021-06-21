import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';

export const Navlist = (props) => {
  return (
    <List className="drawer-items">
      {props.items.map((field) => (
        <Link href={field.route} key={field.id}>
          <ListItem button component="a" onClick={props.drawer} key={field.id}>
            <ListItemIcon>{field.icon}</ListItemIcon>
            <ListItemText primary={field.text} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

Navlist.propTypes = {
  items: PropTypes.array.isRequired,
  drawer: PropTypes.func.isRequired,
};
