import React from "react"
import { useNavigate } from "react-router-dom"
import { CellMeasurer, CellMeasurerCache, List, AutoSizer } from "react-virtualized"

import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"

import { view, objects } from "../../../../utils/partsArcgisItems"

let highlight

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
					<ListItem
						variant="tableItem"
						style={style}
						key={key}
						component="div"
						disablePadding
						divider
						dense
						selected={parseInt(tableObjectsList[index].attributes.OBJECTID) === parseInt(selectedObject)}
					>
						<ListItemButton
							variant="tableItemButton"
							onClick={() => {
								setSelectedObject(`${tableObjectsList[index].attributes.OBJECTID}`)
								console.log(tableObjectsList[index])
								view.goTo({ target: tableObjectsList[index].geometry.extent })

								view.whenLayerView(objects).then((objectsView) => {
									if (highlight) {
										highlight.remove()
									}

									// highlight = objectsView.highlight(tableObjectsList[index])
								})
								// navigate(`object/${tableObjectsList[index].attributes.GlobalID.replace(/[{}]/g, "")}`)
							}}
						>
							<ListItemText primary={tableObjectsList[index].attributes.Pavad} />
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
