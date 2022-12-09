import React, { useEffect } from "react"
import { matchSorter } from "match-sorter"
import { useTranslation } from "react-i18next"

import OutlinedInput from "@mui/material/OutlinedInput"
import Container from "@mui/material/Container"
import SearchIcon from "@mui/icons-material/Search"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"

const Search = (props) => {
	const { t, i18n } = useTranslation()

	const handleSearch = (event) => {
		props.setSearchInputValue(event.target.value)
		props.setTableObjectsList(
			matchSorter(props.searchObjectsList, event.target.value, {
				keys: [(item) => item.attributes.Pavadinimas],
				threshold: matchSorter.rankings.MATCHES,
			})
		)
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