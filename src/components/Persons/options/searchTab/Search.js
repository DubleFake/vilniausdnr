import React, { useEffect } from "react"
import { matchSorter } from "match-sorter"
import { useTranslation } from "react-i18next"

import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"

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
		<Box sx={{ ml: 0.5, mr: 0.5 }}>
			<TextField
				variant="standard"
				size="small"
				sx={{ mt: 1 }}
				fullWidth
				id="outlined-search"
				label={t("plaques.options.search") + ".."}
				type="search"
				value={props.searchInputValue}
				onChange={handleSearch}
			/>
		</Box>
	)
}

export default Search
