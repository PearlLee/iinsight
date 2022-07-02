import { ComponentStory, ComponentMeta } from '@storybook/react';

import '../styles/app.scss';
import BoardTable from '../components/StockAnalysis/BoardTable';
import BoardTab from '../components/StockAnalysis/BoardTab';

export default {
    title: 'Component/Board',
    component: BoardTable
} as ComponentMeta<typeof BoardTable>;

const Template: ComponentStory<typeof BoardTab> = () => <BoardTab onSelectTab={() => { }} />;
export const boardTab = Template.bind({});