import React from "react"
import { useNavigate } from "react-router-dom"
import { CellMeasurer, CellMeasurerCache, List, AutoSizer } from "react-virtualized"

import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"

const TableItems = (props) => {
	const navigate = useNavigate()
	const cache = new CellMeasurerCache({
		defaultHeight: 38,
		fixedWidth: true,
	})

	function rowRenderer({ key, index, style, parent }) {
		const tableObjectsList = parent.props.tableObjectsList
		const setSelectedObject = parent.props.setSelectedObject
		const selectedObject = parent.props.selectedObject
		return (
			tableObjectsList && (
				<CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
					<ListItem style={style} key={key} component="div" disablePadding divider dense>
						<ListItemButton
							style={{ paddingLeft: 5, paddingRight: 5 }}
							onClick={() => {
								setSelectedObject(`${tableObjectsList[index].attributes.GlobalID.replace(/[{}]/g, "")}`)
								navigate(`objektas/${tableObjectsList[index].attributes.GlobalID.replace(/[{}]/g, "")}`)
							}}
							selected={tableObjectsList[index].attributes.GlobalID.replace(/[{}]/g, "") === selectedObject}
						>
							<ListItemText primary={tableObjectsList[index].attributes.OBJ_PAV} />
						</ListItemButton>
					</ListItem>
				</CellMeasurer>
			)
		)
	}

	return (
		<div style={{ flex: 1 }}>
			<AutoSizer>
				{({ height, width }) => (
					<List
						width={width}
						height={height}
						rowCount={props.tableObjectsList.length}
						deferredMeasurementCache={cache}
						rowHeight={cache.rowHeight}
						rowRenderer={rowRenderer}
						tableObjectsList={props.tableObjectsList}
						setSelectedObject={props.setSelectedObject}
						selectedObject={props.selectedObject}
					/>
				)}
			</AutoSizer>
		</div>
	)
}
export default TableItems
