import React, { useEffect, useState } from "react"
import Filter from "./Filter"
import TableItems from "./SearchItems"
import Search from "./Search"
import { matchSorter } from "match-sorter"

import Grid from "@mui/material/Grid"
import CircularProgress from "@mui/material/CircularProgress"

const Table = (props) => {
	const [objectsList, setObjectsList] = useState([])
	const [searchObjectsList, setSearchObjectsList] = useState([])
	const [tableObjectsList, setTableObjectsList] = useState([])
	const [searchInputValue, setSearchInputValue] = useState("")
	const [objectCount, setObjectCount] = useState(0)

	useEffect(() => {
		setObjectsList(props.initialObjectsList)
	}, [props.initialObjectsList])

	useEffect(() => {
		if (searchInputValue) {
			// setTableObjectsList(
			// 	matchSorter(searchObjectsList, searchInputValue, {
			//     keys: [(item) => item.attributes.Vardas_lietuviskai, (item) => item.attributes.Pavarde_lietuviskai],
			// 		threshold: matchSorter.rankings.MATCHES,
			// 	})
			// )
			const tempSorted = matchSorter(searchObjectsList, "", {
				keys: [(item) => item.attributes.Vardas_lietuviskai, (item) => item.attributes.Pavarde_lietuviskai],
				threshold: matchSorter.rankings.MATCHES,
			})
			tempSorted.sort(
				(a, b) =>
					!a.attributes.Vardas_lietuviskai - !b.attributes.Vardas_lietuviskai ||
					a.attributes.Vardas_lietuviskai.localeCompare(b.attributes.Vardas_lietuviskai)
			)
			setTableObjectsList(tempSorted)
		} else {
			// setTableObjectsList(
			// 	matchSorter(searchObjectsList, "", {
			//     keys: [(item) => item.attributes.Vardas_lietuviskai, (item) => item.attributes.Pavarde_lietuviskai],
			// 		threshold: matchSorter.rankings.MATCHES,
			// 	})
			// )
			const tempSorted = matchSorter(searchObjectsList, "", {
				keys: [(item) => item.attributes.Vardas_lietuviskai, (item) => item.attributes.Pavarde_lietuviskai],
				threshold: matchSorter.rankings.MATCHES,
			})
			tempSorted.sort(
				(a, b) =>
					!a.attributes.Vardas_lietuviskai - !b.attributes.Vardas_lietuviskai ||
					a.attributes.Vardas_lietuviskai.localeCompare(b.attributes.Vardas_lietuviskai)
			)
			setTableObjectsList(tempSorted)
		}
	}, [searchObjectsList])

	useEffect(() => {
		setObjectCount(tableObjectsList.length)
	}, [tableObjectsList])

	return (
		<Grid variant="options">
			{objectsList.length ? (
				<>
					<Search
						searchObjectsList={searchObjectsList}
						searchInputValue={searchInputValue}
						setSearchInputValue={setSearchInputValue}
						setTableObjectsList={setTableObjectsList}
					/>
					<Filter
						objectsList={objectsList}
						searchInputValue={searchInputValue}
						setSearchInputValue={setSearchInputValue}
						setSelectedObject={props.setSelectedObject}
						setObjectsList={setObjectsList}
						setSearchObjectsList={setSearchObjectsList}
						setTableObjectsList={setTableObjectsList}
						objectCount={objectCount}
					/>
					<TableItems
						tableObjectsList={tableObjectsList}
						setSelectedObject={props.setSelectedObject}
						selectedObject={props.selectedObject}
					/>
				</>
			) : (
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: "100vh" }}
				>
					<Grid item xs={3}>
						<CircularProgress />
					</Grid>
				</Grid>
			)}
		</Grid>
	)
}

export default Table
