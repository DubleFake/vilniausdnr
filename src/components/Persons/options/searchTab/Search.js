import React, { useEffect } from "react"
import { matchSorter } from "match-sorter"
import { useTranslation } from "react-i18next"

import OutlinedInput from "@mui/material/OutlinedInput"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import SearchIcon from "@mui/icons-material/Search"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"

const Search = (props) => {
	const { t, i18n } = useTranslation()

	const handleSearch = (event) => {
		// const matchSorterAcrossKeys = (list, search, options) => {
		// 	const joinedKeysString = (item) => options.keys.map((key) => item[key]).join(" ")
		// 	return matchSorter(list, search, {
		// 		...options,
		// 		keys: [...options.keys, joinedKeysString],
		// 	})
		// }

		// props.setSearchInputValue(event.target.value)

		// const tempObjList = []
		// props.searchObjectsList.map((obj) =>
		// 	tempObjList.push({
		// 		Vardas_lietuviskai: obj.attributes.Vardas_lietuviskai,
		// 		Pavarde_lietuviskai: obj.attributes.Pavarde_lietuviskai,
		// 		OBJECTID: obj.attributes.OBJECTID,
		// 		Asmenybes_ID: obj.attributes.Asmenybes_ID,
		// 	})
		// )

		// const matches = matchSorterAcrossKeys(tempObjList, event.target.value, {
		// 	keys: ["Vardas_lietuviskai", "Pavarde_lietuviskai"],
		// })

		// matches.sort(
		// 	(a, b) =>
		// 		!a.Vardas_lietuviskai - !b.Vardas_lietuviskai ||
		// 		a.Vardas_lietuviskai.localeCompare(b.Vardas_lietuviskai)
		// )

		// const tempMatches = []
		// matches.map((obj) =>
		// 	tempMatches.push({
		// 		attributes: {
		// 			Vardas_lietuviskai: obj.Vardas_lietuviskai,
		// 			Pavarde_lietuviskai: obj.Pavarde_lietuviskai,
		// 			OBJECTID: obj.OBJECTID,
		// 			Asmenybes_ID: obj.Asmenybes_ID,
		// 		},
		// 	})
		// )
		props.setSearchInputValue(event.target.value)

		let match
		if (event.target.value !== "") {
			match = matchSorter(props.searchObjectsList, event.target.value, {
				keys: [(item) => `${item.attributes.Vardas_lietuviskai} ${item.attributes.Pavarde_lietuviskai}`],
				threshold: matchSorter.rankings.MATCHES,
				sorter: (rankedItems) =>
					rankedItems.sort((a, b) => {
						const rankA = a.rank || 0
						const rankB = b.rank || 0
						const nameA = `${a.item.attributes.Vardas_lietuviskai || ""} ${
							a.item.attributes.Pavarde_lietuviskai || ""
						}`
						const nameB = `${b.item.attributes.Vardas_lietuviskai || ""} ${
							b.item.attributes.Pavarde_lietuviskai || ""
						}`
						if (rankA !== rankB) {
							return ("" + rankB).localeCompare("" + rankA)
						}
						return nameA.localeCompare(nameB)
					}),
			})
		} else {
			match = matchSorter(props.searchObjectsList, "", {
				keys: [
					(item) => item.attributes.Vardas_lietuviskai,
					(item) => item.attributes.Pavarde_lietuviskai,
					{ maxRanking: matchSorter.rankings.MATCHES, key: (item) => item.attributes.Vardas_lietuviskai },
				],
				threshold: matchSorter.rankings.MATCHES,
				sorter: (rankedItems) =>
					rankedItems.sort((a, b) => {
						const nameA = a.item.attributes.Vardas_lietuviskai || a.item.attributes.Pavarde_lietuviskai || ""
						const nameB = b.item.attributes.Vardas_lietuviskai || b.item.attributes.Pavarde_lietuviskai || ""
						const surnameA = a.item.attributes.Pavarde_lietuviskai || ""
						const surnameB = b.item.attributes.Pavarde_lietuviskai || ""
						if (nameA.localeCompare(nameB) === 0) {
							return surnameA.localeCompare(surnameB)
						}
						return nameA.localeCompare(nameB)
					}),
			})
		}

		props.setTableObjectsList(match)
	}

	return (
		<Container variant="filterSearch">
			<Typography sx={{ fontWeight: "bold" }} variant="h5">
				Paieška
			</Typography>
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
