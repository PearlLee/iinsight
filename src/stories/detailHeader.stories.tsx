import { ComponentStory, ComponentMeta } from '@storybook/react';

import '../styles/app.scss';
import { rows } from '../stockData';
import Detail from '../components/StockAnalysis/Detail';
import DetailHeader from '../components/StockAnalysis/DetailHeader';

export default {
    title: 'Component/Detail',
    component: Detail,
    argTypes: {
    },
  } as ComponentMeta<typeof Detail>;

const detailHeaderTemplate: ComponentStory<typeof DetailHeader> = (args) => <DetailHeader {...args} />;
export const detailHeader = detailHeaderTemplate.bind({});
const isin = rows.length > 0 ? rows[0].info.isin : '';
detailHeader.args = {
  isin: isin
}
