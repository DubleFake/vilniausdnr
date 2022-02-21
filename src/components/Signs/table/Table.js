import React, { useEffect, useState } from "react"
import Filter from "./Filter"
import TableItems from "./TableItems"
import Search from "./Search"
import { matchSorter } from "match-sorter"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import CircularProgress from "@mui/material/CircularProgress"

const Table = (props) => {
	const [objectsList, setObjectsList] = useState([])
	const [searchObjectsList, setSearchObjectsList] = useState([])
	const [tableObjectsList, setTableObjectsList] = useState([])
	const [searchInputValue, setSearchInputValue] = useState("")

	useEffect(() => {
		setObjectsList(props.initialObjectsList)
	}, [props.initialObjectsList])

	useEffect(() => {
		if (searchInputValue) {
			setTableObjectsList(
				matchSorter(searchObjectsList, searchInputValue, {
					keys: [(item) => item.attributes.OBJ_PAV],
					threshold: matchSorter.rankings.MATCHES,
				})
			)
		} else {
      setTableObjectsList(
				matchSorter(searchObjectsList, "", {
					keys: [(item) => item.attributes.OBJ_PAV],
					threshold: matchSorter.rankings.MATCHES,
				})
			)
		}
	}, [searchObjectsList])

	return (
		<Box sx={{ width: 350, height: "100vh", display: "flex", flexDirection: "column" }}>
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
		</Box>
	)
}

export default Table
