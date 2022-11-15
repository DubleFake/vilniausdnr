import React, { useEffect } from "react"
import { matchSorter } from "match-sorter"
import { useTranslation } from "react-i18next"

import OutlinedInput from "@mui/material/OutlinedInput"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import SearchIcon from "@mui/icons-material/Search"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"

const Search = (props) => {
	const { t, i18n } = useTranslation()

	const handleSearch = (event) => {
		const matchSorterAcrossKeys = (list, search, options) => {
			const joinedKeysString = (item) => options.keys.map((key) => item[key]).join(" ")
			return matchSorter(list, search, {
				...options,
				keys: [...options.keys, joinedKeysString],
			})
		}

		props.setSearchInputValue(event.target.value)

		const tempObjList = []
		props.searchObjectsList.map((obj) =>
			tempObjList.push({
				Vardas_lietuviskai: obj.attributes.Vardas_lietuviskai,
				Pavarde_lietuviskai: obj.attributes.Pavarde_lietuviskai,
				OBJECTID: obj.attributes.OBJECTID,
				Asmenybes_ID: obj.attributes.Asmenybes_ID,
			})
		)

		const matches = matchSorterAcrossKeys(tempObjList, event.target.value, {
			keys: ["Vardas_lietuviskai", "Pavarde_lietuviskai"],
		})

		matches.sort(
			(a, b) =>
				!a.Vardas_lietuviskai - !b.Vardas_lietuviskai ||
				a.Vardas_lietuviskai.localeCompare(b.Vardas_lietuviskai)
		)

		const tempMatches = []
		matches.map((obj) =>
			tempMatches.push({
				attributes: {
					Vardas_lietuviskai: obj.Vardas_lietuviskai,
					Pavarde_lietuviskai: obj.Pavarde_lietuviskai,
					OBJECTID: obj.OBJECTID,
					Asmenybes_ID: obj.Asmenybes_ID,
				},
			})
		)

		props.setTableObjectsList(tempMatches)
	}

	return (
		<Box sx={{ px: 5, pt: 4, backgroundColor: "#F6F6F6" }}>
			<Typography sx={{ fontWeight: "bold" }} variant="h5">
				Paieška
			</Typography>
			<OutlinedInput
				variant="outlined"
				size="small"
				sx={{ mt: 1, borderRadius: "30px", backgroundColor: "white", boxShadow: 3 }}
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
		</Box>
	)
}

export default Search
