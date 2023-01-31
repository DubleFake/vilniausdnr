import React, { useEffect, useState, useRef } from "react"
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

	const parentRef = useRef(null)

	useEffect(() => {
		setObjectsList(props.initialObjectsList)
	}, [props.initialObjectsList])

	useEffect(() => {
		if (searchInputValue) {
			setTableObjectsList(
				matchSorter(searchObjectsList, searchInputValue, {
					keys: [(item) => item.attributes.OBJ_PAV],
					threshold: matchSorter.rankings.MATCHES,
					sorter: (matchedItems) =>
						matchedItems.sort((a, b) => {
							const rankA = a.rank || 0
							const rankB = b.rank || 0
							if (rankA !== rankB) {
								return rankB - rankA
							}
							return a.rankedValue.localeCompare(b.rankedValue)
						}),
				})
			)
		} else {
			setTableObjectsList(
				matchSorter(searchObjectsList, "", {
					keys: [(item) => item.attributes.OBJ_PAV],
					threshold: matchSorter.rankings.MATCHES,
					sorter: (matchedItems) =>
						matchedItems.sort((a, b) => {
							return a.rankedValue.localeCompare(b.rankedValue)
						}),
				})
			)
		}
	}, [searchObjectsList])

	useEffect(() => {
		setObjectCount(tableObjectsList.length)
	}, [tableObjectsList])

	return (
		<Grid variant="optionsTabs" ref={parentRef}>
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
						setSearchInputValue={setSearchInputValue}
						setSelectedObject={props.setSelectedObject}
						setObjectsList={setObjectsList}
						setSearchObjectsList={setSearchObjectsList}
						selectedObjectFilter={props.selectedObjectFilter}
						setSelectedObjectFilter={props.setSelectedObjectFilter}
						selectedMemoryFilter={props.selectedMemoryFilter}
						setSelectedMemoryFilter={props.setSelectedMemoryFilter}
						selectedPeriodFilter={props.selectedPeriodFilter}
						setSelectedPeriodFilter={props.setSelectedPeriodFilter}
						setVisibleObjectIcons={props.setVisibleObjectIcons}
						setVisibleMemoryIcons={props.setVisibleMemoryIcons}
						objectCount={objectCount}
						searchInputValue={searchInputValue}
					/>
					<TableItems
						tableObjectsList={tableObjectsList}
						setSelectedObject={props.setSelectedObject}
						selectedObject={props.selectedObject}
						parentRef={parentRef}
						setVisible={props.setVisible}
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
