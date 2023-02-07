import React, { useEffect, useState, useRef } from "react"
import Filter from "./Filter"
import TableItems from "./SearchItems"
import Search from "./Search"

import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

const Table = (props) => {
	const [objectsList, setObjectsList] = useState([])
	const [searchObjectsList, setSearchObjectsList] = useState([])
	const [tableObjectsList, setTableObjectsList] = useState([])
	const [searchInputValue, setSearchInputValue] = useState("")
	const [objectCount, setObjectCount] = useState(0)

	const parentRef = useRef(null)

	const theme = useTheme()
	const isDownXl = useMediaQuery(theme.breakpoints.down("xl"))

	useEffect(() => {
		setObjectsList(props.initialObjectsList)
	}, [props.initialObjectsList])

	useEffect(() => {
    setTableObjectsList(searchObjectsList)

		// if (searchInputValue) {
		// 	setTableObjectsList(
		// 		matchSorter(searchObjectsList, searchInputValue, {
		// 			keys: [(item) => item.attributes.Pavadinimas],
		// 			threshold: matchSorter.rankings.MATCHES,
		// 		})
		// 	)
		// } else {
		// 	setTableObjectsList(
		// 		matchSorter(searchObjectsList, "", {
		// 			keys: [(item) => item.attributes.Pavadinimas],
		// 			threshold: matchSorter.rankings.MATCHES,
		// 		})
		// 	)
		// }
	}, [searchObjectsList])

	useEffect(() => {
		setObjectCount(tableObjectsList.length)
	}, [tableObjectsList])

	return (
		<Grid variant="options" ref={parentRef}>
			{objectsList.length ? (
				<Box
					sx={{
						overflowY: isDownXl ? "scroll !important" : "hidden !important",
						display: isDownXl ? "inline" : "flex",
						flexDirection: "column",
					}}
				>
					<Search
						searchObjectsList={searchObjectsList}
						searchInputValue={searchInputValue}
						setSearchInputValue={setSearchInputValue}
						setTableObjectsList={setTableObjectsList}
					/>
					<Filter
						searchObjectsList={searchObjectsList}
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
				</Box>
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
