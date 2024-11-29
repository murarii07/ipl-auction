import React from 'react'
import { Tab, TabPanel,TabGroup,TabList,TabPanels } from '@headlessui/react';
import { TeamList } from './TeamList';
export const Toggle = ({displayQList,displayDQList}) => {
  return (

    <TabGroup className="w-11/12 mx-auto mt-10">
      <TabList className=" w-full flex justify-evenly ">
        <Tab
          className={({ selected }) =>
            `py-3 px-4 text-sm font-medium rounded-lg ${
              selected
                ? 'bg-neutral-800 text-blue-600 '
                : 'bg-neutral-800 text-gray-500 hover:text-gray-700'
            }`
          }
        >
          Qualified
        </Tab>
        <Tab
          className={({ selected }) =>
            `py-3 px-4 text-sm font-medium rounded-lg ${
              selected
                ? 'bg-neutral-800 text-blue-600 border-b-transparent'
                : 'bg-neutral-800 text-gray-500 hover:text-gray-700'
            }`
          }
        >
          disQualified
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <TeamList teamDetails={displayQList} />
        </TabPanel>
        <TabPanel>
          <TeamList teamDetails={displayDQList} />
        </TabPanel>
      </TabPanels>
    </TabGroup>

  )
}
