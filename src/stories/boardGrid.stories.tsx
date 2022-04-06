import { ComponentStory, ComponentMeta } from '@storybook/react';

import '../styles/app.scss';
import { rows } from '../stockData';
import BoardTable from '../components/StockAnalysis/BoardTable';
import BoardTableGrid from '../components/StockAnalysis/BoardTableGrid';

export default {
    title: 'Component/Board/BoardGrid',
    component: BoardTable
  } as ComponentMeta<typeof BoardTable>;

const Template: ComponentStory<typeof BoardTableGrid> = (args) => <BoardTableGrid {...args} />;
const isin = (index:number) => {
  return rows.length > 0 ? rows[index].info.isin : '';
}

export const row1 = Template.bind({});
row1.args = {
  isin: isin(0),
  setIsin: () => {}
}

export const row2 = Template.bind({});
row2.args = {
  isin: isin(1),
  setIsin: () => {}
}