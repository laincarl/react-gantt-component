import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as Basic } from '../stories/Basic.stories';

describe('Basic', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Basic
        data={[
          {
            name: '一个名称',
            startDate: '2020-10-01',
            endDate: '2020-10-08',
            collapsed: false,
            children: [
              {
                startDate: '2020-10-01',
                endDate: '2020-10-08',
                name: '一个名称',
                collapsed: false,
              },
            ],
          },
        ]}
        columns={[
          {
            name: 'name',
            label: '名称',
          },
        ]}
        onUpdate={async () => {
          return true;
        }}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
