import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { RootStoreProvider } from "../providers/RootStoreProvider";
import RootStore from "../stores/RootStore";

export default function renderWithRootStore(ui: ReactElement, rootStore?: RootStore) {
    const wrapper = ({children}: {children: typeof ui}) => (
        <RootStoreProvider rootStore={rootStore}>{children}</RootStoreProvider>
    );
    return render(ui, { wrapper })
}