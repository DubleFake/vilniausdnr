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
		findAllMatches: true,
		minMatchCharLength: 2,
		threshold: 0.3,
		ignoreLocation: true,
		keys: ["attributes.Pavadinimas"],
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
