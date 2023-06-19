import { Layout, Text, Page } from '@vercel/examples-ui'
import { TPNCalc } from '../TPNCalc'
import { GIRCalc } from '../GIRCalc';
import { IVFCalc } from '../IVFCalc';

import clsx from 'clsx'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import * as React from 'react';

import styles from './index.module.css';;

function Chatbot() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (

    <div className={styles.center}>


      <Text variant="h2"> NICU Calculator</Text>

      <div className="lg:w-2/3">

        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="TPN Calculator" value="1" />
                <Tab label="IVF Calculator" value="2" />
                <Tab label="GIR Calculator" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1"> <TPNCalc /></TabPanel>
            <TabPanel value="2"><IVFCalc/></TabPanel>
            <TabPanel value="3"><GIRCalc/></TabPanel>
          </TabContext>
        </Box>


      </div>
    </div>

  )
}


export default Chatbot
