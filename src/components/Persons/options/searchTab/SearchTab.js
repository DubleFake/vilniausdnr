import React, { useEffect, useState, useRef } from "react"
import Filter from "./Filter"
import TableItems from "./SearchItems"
import Search from "./Search"
import { matchSorter } from "match-sorter"

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
		const match = matchSorter(searchObjectsList, "", {
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

		setTableObjectsList(match)
		// if (searchInputValue) {
		// 	// setTableObjectsList(
		// 	// 	matchSorter(searchObjectsList, searchInputValue, {
		// 	//     keys: [(item) => item.attributes.Vardas_lietuviskai, (item) => item.attributes.Pavarde_lietuviskai],
		// 	// 		threshold: matchSorter.rankings.MATCHES,
		// 	// 	})
		// 	// )
		// 	const tempSorted = matchSorter(searchObjectsList, "", {
		// 		keys: [(item) => item.attributes.Vardas_lietuviskai, (item) => item.attributes.Pavarde_lietuviskai],
		// 		threshold: matchSorter.rankings.MATCHES,
		// 	})
		// 	tempSorted.sort(
		// 		(a, b) =>
		// 			!a.attributes.Vardas_lietuviskai - !b.attributes.Vardas_lietuviskai ||
		// 			a.attributes.Vardas_lietuviskai.localeCompare(b.attributes.Vardas_lietuviskai)
		// 	)
		// 	setTableObjectsList(tempSorted)
		// } else {
		// 	// setTableObjectsList(
		// 	// 	matchSorter(searchObjectsList, "", {
		// 	//     keys: [(item) => item.attributes.Vardas_lietuviskai, (item) => item.attributes.Pavarde_lietuviskai],
		// 	// 		threshold: matchSorter.rankings.MATCHES,
		// 	// 	})
		// 	// )
		// 	const tempSorted = matchSorter(searchObjectsList, "", {
		// 		keys: [(item) => item.attributes.Vardas_lietuviskai, (item) => item.attributes.Pavarde_lietuviskai],
		// 		threshold: matchSorter.rankings.MATCHES,
		// 	})
		// 	tempSorted.sort(
		// 		(a, b) =>
		// 			!a.attributes.Vardas_lietuviskai - !b.attributes.Vardas_lietuviskai ||
		// 			a.attributes.Vardas_lietuviskai.localeCompare(b.attributes.Vardas_lietuviskai)
		// 	)
		// 	setTableObjectsList(tempSorted)
		// }
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
