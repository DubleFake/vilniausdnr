import React, { useState, useEffect } from "react"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import Box from "@mui/material/Box"

const Options = (props) => {
	const [eventGroups, setEventGroups] = useState([])
	const [selectedGroup, setSelectedGroup] = useState()

	useEffect(() => {
		const tempSet = new Set()

		for (let event of props.eventsList) {
			console.log(event)
			tempSet.add(event.attributes.Ivykio_grupe_LT)
		}

		setEventGroups([...tempSet])
	}, [props.eventsList])

	return (
		<Container variant="optionsDiv">
			<Typography sx={{ mx: 2, mt: 2 }} variant="h5">
				Istorinių įvykių juosta
			</Typography>
			<List>
				{eventGroups.length > 0 &&
					eventGroups.map((group, index) => (
						<ListItem
							sx={{
								color: "gray",
								"&:hover": {
									transition: "0.3s",
								},
								"&.Mui-selected": {
									backgroundColor: "white",
									transition: "0.3s",
									color: "#D72E30",
								},
							}}
							key={index}
							component="div"
							disablePadding
							selected={index === selectedGroup}
						>
							<ListItemButton
								sx={{ height: "auto" }}
								onClick={() => {
									setSelectedGroup(index)
								}}
							>
								<Box
									sx={{
										borderLeft: index === selectedGroup ? "4px solid #D72E30" : "2px solid lightgray",
										position: "absolute",
										left: 0,
										height: "100%",
										width: "3px",
										ml: index === selectedGroup ? 3.9 : 4,
									}}
									component="div"
								/>
								<Typography
									sx={{ ml: 4, fontWeight: index === selectedGroup ? 500 : 400, fontSize: "20px" }}
									variant="body2"
								>
									{group}
								</Typography>
							</ListItemButton>
						</ListItem>
					))}
			</List>
		</Container>
	)
}

export default Options
