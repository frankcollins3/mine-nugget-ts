import { createContext, useContext, ReactNode, useState } from 'react'

type searchContextType = {
    searchHover: boolean;
    hoverSearch: () => void;
    unHoverSearch: () => void;

}

const searchDefaults: searchContextType = {
    searchHover: false,
    hoverSearch: () => {},
    unHoverSearch: () => {}
}

const SearchContext = createContext<searchContextType>(searchDefaults);

export default function useSearch() {
    return useContext(SearchContext)
}

type Props = {
    children: ReactNode;
}

export function SearchProvider( {children}: Props) {
    const [searchHover, setSearchHover] = useState<boolean>(false)

    const hoverSearch = () => setSearchHover(true)
    const unHoverSearch = () => setSearchHover(false)

    const value = {
        searchHover,
        hoverSearch,
        unHoverSearch
    };

    return (       
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider >
    )

}


