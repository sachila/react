import { AppBar, Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import { useStyles } from "../styles/materialStyles";
import { SelectedItems } from "./Category/SelectedItems";
import { RemoveCategory } from "./Category/RemoveCategory";
import { TabPanel } from "./TabPanel";

export const CategoryDetails: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <div className={classes.tabsRoot}>
      <AppBar position="static">
        <Tabs
          data-testid="item-tab"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Selected Items" {...a11yProps(0)} />
          <Tab label="Remove Items" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={1}>
        <RemoveCategory />
      </TabPanel>
      <TabPanel value={value} index={0}>
        <SelectedItems />
      </TabPanel>
    </div>
  );
};
