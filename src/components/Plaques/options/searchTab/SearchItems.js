import React from "react"
import { useNavigate } from "react-router-dom"
import { CellMeasurer, CellMeasurerCache, List, AutoSizer, WindowScroller } from "react-virtualized"

import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

const TableItems = (props) => {
	const navigate = useNavigate()

	const theme = useTheme()
	const isDownSm = useMediaQuery(theme.breakpoints.down("sm"))
	const isDownXl = useMediaQuery(theme.breakpoints.down("xl"))

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
						component="div"
						disablePadding
						divider
						dense
						selected={tableObjectsList[index].attributes.GlobalID.replace(/[{}]/g, "") === selectedObject}
					>
						<ListItemButton
							variant="tableItemButton"
							onClick={() => {
								if (isDownSm) {
									props.setVisible(false)
								}
								setSelectedObject(`${tableObjectsList[index].attributes.GlobalID.replace(/[{}]/g, "")}`)
								navigate(`object/${tableObjectsList[index].attributes.GlobalID.replace(/[{}]/g, "")}`)
							}}
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
			{isDownXl ? (
				<WindowScroller scrollElement={props.parentRef.current}>
					{({ height, scrollTop }) => (
						<AutoSizer disableHeight>
							{({ width }) => (
								<List
									autoHeight
									height={height}
									width={width}
									scrollTop={scrollTop}
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
					)}
				</WindowScroller>
			) : (
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
			)}
		</div>
	)
}
export default TableItems
