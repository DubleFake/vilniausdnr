import React, { useEffect } from "react"
import { matchSorter } from "match-sorter"

import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"

const Search = (props) => {
	const handleSearch = (event) => {
		props.setSearchInputValue(event.target.value)
		props.setTableObjectsList(
			matchSorter(props.searchObjectsList, event.target.value, {
				keys: [(item) => item.attributes.OBJ_PAV],
				threshold: matchSorter.rankings.MATCHES,
			})
		)
	}

	return (
		<Box sx={{ ml: 0.5, mr: 0.5 }}>
			<TextField
				size="small"
				sx={{ mt: 1 }}
				fullWidth
				id="outlined-search"
				label="Paieška"
				type="search"
				value={props.searchInputValue}
				onChange={handleSearch}
			/>
		</Box>
	)
}

export default Search
