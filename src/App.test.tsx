import { screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    beforeAll(() => {
        window.matchMedia = window.matchMedia || function () {
            return {
                matches: false,
                addListener: function () { },
                removeListener: function () { }
            };
        };
    })

    // test('Check the main menu is stock analysis', () => {
    //     renderWithStockAnalysisStore(<App />);
    //     const stockAnalysis = screen.getByText('종목 분석');
    //     expect(stockAnalysis).toHaveAttribute('aria-selected', "true");
    // });
});
