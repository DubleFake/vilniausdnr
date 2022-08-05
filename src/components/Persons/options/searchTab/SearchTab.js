import React, { useEffect, useState } from "react"
import Filter from "./Filter"
import TableItems from "./SearchItems"
import Search from "./Search"
import Count from "./Count"
import { matchSorter } from "match-sorter"

import Box from "@mui/material/Box"
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
			setTableObjectsList(
				matchSorter(searchObjectsList, searchInputValue, {
					keys: [(item) => item.attributes.Vardas_lietuviskai],
					threshold: matchSorter.rankings.MATCHES,
				})
			)
		} else {
			setTableObjectsList(
				matchSorter(searchObjectsList, "", {
					keys: [(item) => item.attributes.Vardas_lietuviskai],
					threshold: matchSorter.rankings.MATCHES,
				})
			)
		}
	}, [searchObjectsList])

	useEffect(() => {
		setObjectCount(tableObjectsList.length)
	}, [tableObjectsList])

	return (
		<Box
			sx={{
				width: 350,
				height: "calc(100vh - 87px)",
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
			}}
		>
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
					/>
					<Count objectCount={objectCount} />
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
		</Box>
	)
}

export default Table
