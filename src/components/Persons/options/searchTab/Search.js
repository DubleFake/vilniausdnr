import React, { useEffect } from "react"
import { matchSorter } from "match-sorter"
import { useTranslation } from "react-i18next"

import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"

const Search = (props) => {
	const { t, i18n } = useTranslation()

	const handleSearch = (event) => {
		props.setSearchInputValue(event.target.value)
		props.setTableObjectsList(
			matchSorter(props.searchObjectsList, event.target.value, {
				keys: [(item) => item.attributes.Vardas_lietuviskai, (item) => item.attributes.Pavarde_lietuviskai],
				threshold: matchSorter.rankings.MATCHES,
			})
		)
	}

	return (
		<Box sx={{ ml: 0.5, mr: 0.5 }}>
			<TextField
				variant="standard"
				size="small"
				sx={{ mt: 1 }}
				fullWidth
				id="outlined-search"
				label={t("plaques.options.search")+".."}
				type="search"
				value={props.searchInputValue}
				onChange={handleSearch}
			/>
		</Box>
	)
}

export default Search