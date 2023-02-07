import React, { useEffect, useState, useRef } from "react"
import Filter from "./Filter"
import TableItems from "./SearchItems"
import Search from "./Search"

import Grid from "@mui/material/Grid"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

const Table = (props) => {
	const [objectsList, setObjectsList] = useState([])
	const [searchObjectsList, setSearchObjectsList] = useState([])
	const [tableObjectsList, setTableObjectsList] = useState([])
	const [searchInputValue, setSearchInputValue] = useState("")
	const [objectCount, setObjectCount] = useState(0)

	const parentRef = useRef(null)

	const generateElements = () => {
		const elements = []

		for (let i = 0; i < 25; i++) {
			const height = Math.random() < 0.8 ? 40 : 80
			const width = height === 40 ? `${Math.random() * (100 - 70) + 70}%` : "100%"

			elements.push(<Skeleton variant="rectangular" height={height} width={width} />)
		}

		return elements
	}

	useEffect(() => {
		setObjectsList(props.initialObjectsList)
	}, [props.initialObjectsList])

	useEffect(() => {
		setTableObjectsList(searchObjectsList)
	}, [searchObjectsList])

	useEffect(() => {
		setObjectCount(tableObjectsList.length)
	}, [tableObjectsList])

	return (
		<Grid variant="options" ref={parentRef}>
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
						parentRef={parentRef}
					/>
				</>
			) : (
				<Stack sx={{ m: 1.5 }} spacing={1}>
					{generateElements()}
				</Stack>
			)}
		</Grid>
	)
}

export default Table
