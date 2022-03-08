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
import Box from "@mui/material/Box"

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
				<Box sx={{ width: 350 }}>
					<Typography component={"div"}>{children}</Typography>
				</Box>
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
	const [visualizationType, setVisualizationType] = useState("0")
	const [visibleObjectIcons, setVisibleObjectIcons] = useState([])

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const handleChangeIndex = (index) => {
		setValue(index)
	}

	return (
		<Box sx={{ bgcolor: "background.paper", width: 350 }}>
			<AppBar position="static">
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor="secondary"
					textColor="secondary"
					variant="fullWidth"
				>
					<Tab
						sx={{
							color: "secondary.dark",
							transition: "0.3s",
							"&:hover": {
								bgcolor: "primary.light",
							},
						}}
						label={t("plaques.options.search")}
						{...a11yProps(0)}
					/>
					<Tab
						sx={{
							color: "secondary.dark",
							transition: "0.3s",
							"&:hover": {
								bgcolor: "primary.light",
							},
						}}
						label={t("plaques.options.visualization")}
						{...a11yProps(1)}
					/>
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
            setVisibleObjectIcons={setVisibleObjectIcons}
					/>
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					<Box sx={{ width: 350, height: "100vh", display: "flex", flexDirection: "column" }}>
						<VisualizationTab
							selectedObjectFilter={selectedObjectFilter}
							visualizationType={visualizationType}
							setVisualizationType={setVisualizationType}
							visibleObjectIcons={visibleObjectIcons}
						/>
					</Box>
				</TabPanel>
			</SwipeableViews>
		</Box>
	)
}

export default Options