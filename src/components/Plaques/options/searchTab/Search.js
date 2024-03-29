import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import Fuse from "fuse.js"

import OutlinedInput from "@mui/material/OutlinedInput"
import Container from "@mui/material/Container"
import SearchIcon from "@mui/icons-material/Search"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"

const Search = (props) => {
	const { t, i18n } = useTranslation()

	const options = {
		// isCaseSensitive: false,
		// includeScore: true,
		// shouldSort: true,
		// includeMatches: false,
		findAllMatches: true,
		minMatchCharLength: 2,
		// location: 0,
		threshold: 0.3,
		// distance: 100,
		// useExtendedSearch: false,
		ignoreLocation: true,
		// ignoreFieldNorm: false,
		// fieldNormWeight: 1,
		keys: ["attributes.OBJ_PAV"],
	}

	const handleSearch = (event) => {
		props.setSearchInputValue(event.target.value)

		const fuse = new Fuse(props.searchObjectsList, options)
		const searchResult = fuse.search(event.target.value)
		const newList = []

		if (searchResult.length > 0) {
			for (let item of searchResult) {
				newList.push(item.item)
			}
			props.setTableObjectsList(newList)
		} else {
			props.setTableObjectsList(props.searchObjectsList)
		}

		// props.setTableObjectsList(
		// 	matchSorter(props.searchObjectsList, event.target.value, {
		// 		keys: [(item) => item.attributes.OBJ_PAV],
		// 		threshold: matchSorter.rankings.MATCHES,
		// 		sorter: (matchedItems) =>
		// 			matchedItems.sort((a, b) => {
		// 				// console.log(a.rankedValue, a.rank)
		// 				const rankA = a.rank || 0
		// 				const rankB = b.rank || 0
		// 				if (rankA !== rankB) {
		// 					return rankB - rankA
		// 				}
		// 				return a.rankedValue.localeCompare(b.rankedValue)
		// 			}),
		// 	})
		// )
	}

	return (
		<Container variant="filterSearch">
			<OutlinedInput
				variant="outlined"
				size="small"
				fullWidth
				id="outlined-search"
				placeholder={t("plaques.options.search") + ".."}
				type="search"
				value={props.searchInputValue}
				onChange={handleSearch}
				endAdornment={
					<InputAdornment position="end">
						<IconButton edge="end">
							<SearchIcon />
						</IconButton>
					</InputAdornment>
				}
			/>
		</Container>
	)
}

export default Search
