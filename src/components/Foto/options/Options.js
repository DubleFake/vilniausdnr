import React, { useState } from "react"
import PropTypes from "prop-types"
import SwipeableViews from "react-swipeable-views"
import { useTranslation } from "react-i18next"

import SearchTab from "./searchTab/SearchTab"
import VisualizationTab from "./visualizationTab/VisualizationTab"

import { useTheme } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Container variant="optionsDiv">
					<Typography component={"div"}>{children}</Typography>
				</Container>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
}

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	}
}

const Options = (props) => {
	const { t, i18n } = useTranslation()
	const theme = useTheme()

	const [value, setValue] = useState(0)
	const [selectedObjectFilter, setSelectedObjectFilter] = useState("")
	const [selectedMemoryFilter, setSelectedMemoryFilter] = useState("")
	const [selectedPeriodFilter, setSelectedPeriodFilter] = useState("")
	const [visualizationType, setVisualizationType] = useState("0")
	const [visibleObjectIcons, setVisibleObjectIcons] = useState([])
	const [visibleMemoryIcons, setVisibleMemoryIcons] = useState([])

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleChangeIndex = (index) => {
		setValue(index)
	}

	return (
		<Container variant="optionsDiv">
			{/*<AppBar sx={{ height: "auto" }} position="static">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="secondary"
					// textColor="secondary"
					variant="fullWidth"
				>
					<Tab label={t("plaques.options.search")} {...a11yProps(0)} />
					<Tab label={t("plaques.options.visualization")} {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			 <SwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={value}
				onChangeIndex={handleChangeIndex}
			>
				<TabPanel value={value} index={0} dir={theme.direction}>
					<SearchTab
						initialObjectsList={props.initialObjectsList}
						setSelectedObject={props.setSelectedObject}
						selectedObject={props.selectedObject}
						selectedObjectFilter={selectedObjectFilter}
						setSelectedObjectFilter={setSelectedObjectFilter}
						selectedMemoryFilter={selectedMemoryFilter}
						setSelectedMemoryFilter={setSelectedMemoryFilter}
						selectedPeriodFilter={selectedPeriodFilter}
						setSelectedPeriodFilter={setSelectedPeriodFilter}
						setVisibleObjectIcons={setVisibleObjectIcons}
						setVisibleMemoryIcons={setVisibleMemoryIcons}
					/>
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<Container variant="optionsVisualizeTab">
						<VisualizationTab
							selectedObjectFilter={selectedObjectFilter}
							selectedMemoryFilter={selectedMemoryFilter}
							visualizationType={visualizationType}
							setVisualizationType={setVisualizationType}
							visibleObjectIcons={visibleObjectIcons}
							visibleMemoryIcons={visibleMemoryIcons}
						/>
					</Container>
				</TabPanel>
			</SwipeableViews> */}
			<SearchTab
				initialObjectsList={props.initialObjectsList}
				setSelectedObject={props.setSelectedObject}
				selectedObject={props.selectedObject}
				selectedObjectFilter={selectedObjectFilter}
				setSelectedObjectFilter={setSelectedObjectFilter}
				selectedMemoryFilter={selectedMemoryFilter}
				setSelectedMemoryFilter={setSelectedMemoryFilter}
				selectedPeriodFilter={selectedPeriodFilter}
				setSelectedPeriodFilter={setSelectedPeriodFilter}
				setVisibleObjectIcons={setVisibleObjectIcons}
				setVisibleMemoryIcons={setVisibleMemoryIcons}
        setVisible={props.setVisible}
			/>
		</Container>
	)
}

export default Options
