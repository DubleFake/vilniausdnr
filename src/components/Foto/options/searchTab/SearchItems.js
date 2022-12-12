import React from "react"
import { useNavigate } from "react-router-dom"
// import { CellMeasurer, CellMeasurerCache, List, AutoSizer } from "react-virtualized"

import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"

const TableItems = (props) => {
		const navigate = useNavigate()
	// 	const cache = new CellMeasurerCache({
	// 		defaultHeight: 108,
	// 		minHeight: 108,
	// 		fixedWidth: true,
	// 	})

	// 	function rowRenderer({ key, index, style, parent }) {
	// 		const tableObjectsList = parent.props.tableObjectsList
	// 		const setSelectedObject = parent.props.setSelectedObject
	// 		const selectedObject = parent.props.selectedObject
	// 		return (
	// 			tableObjectsList && (
	// 				<CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
	// 					<ListItem
	// 						variant="tableItem"
	// 						style={style}
	// 						key={key}
	// 						component="div"
	// 						disablePadding
	// 						divider
	// 						dense
	// 						selected={tableObjectsList[index].attributes.GlobalID.replace(/[{}]/g, "") === selectedObject}
	// 					>
	// 						<ListItemButton
	// 							variant="tableItemButton"
	// 							onClick={() => {
	// 								setSelectedObject(`${tableObjectsList[index].attributes.GlobalID.replace(/[{}]/g, "")}`)
	// 								navigate(`object/${tableObjectsList[index].attributes.GlobalID.replace(/[{}]/g, "")}`)
	// 							}}
	// 						>
	// 							<img
	// 								src={tableObjectsList[index].attributes.Nuotraukos_URL}
	// 								style={{ maxHeight: 100, marginLeft: -16, marginRight: 4 }}
	// 							/>
	// 							<ListItemText
	// 								primary={
	// 									<>
	// 										<Typography color="text.secondary" variant="body2">
	// 											{tableObjectsList[index].attributes.Data_tekstu}
	// 										</Typography>
	// 										{tableObjectsList[index].attributes.Pavadinimas}
	// 									</>
	// 								}
	// 							/>
	// 						</ListItemButton>
	// 					</ListItem>
	// 				</CellMeasurer>
	// 			)
	// 		)
	// }

	return (
		<List sx={{ overflowY: "scroll" }}>
			{Object.keys(props.tableObjectsList).map((index) => (
				<ListItem
					variant="tableItem"
					// style={style}
					key={index}
					component="div"
					disablePadding
					divider
					dense
					selected={
						props.tableObjectsList[index].attributes.GlobalID.replace(/[{}]/g, "") === props.selectedObject
					}
				>
					<ListItemButton
						variant="tableItemButton"
						onClick={() => {
							props.setSelectedObject(
								`${props.tableObjectsList[index].attributes.GlobalID.replace(/[{}]/g, "")}`
							)
							navigate(`object/${props.tableObjectsList[index].attributes.GlobalID.replace(/[{}]/g, "")}`)
						}}
					>
						<img
							src={props.tableObjectsList[index].attributes.Nuotraukos_URL}
							style={{ maxWidth: 180, marginLeft: -16, marginRight: 4, marginTop: -2, marginBottom: -2 }}
						/>
						<ListItemText
							primary={
								<>
									<Typography color="text.secondary" variant="body2">
										{props.tableObjectsList[index].attributes.Data_tekstu}
									</Typography>
									{props.tableObjectsList[index].attributes.Pavadinimas}
								</>
							}
						/>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	)
}
export default TableItems
