import React, { useState, useEffect } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"

// import CompareTimeline from "../compare/CompareTimeline"
import CompareSwipe from "../compare/CompareSwipe"
import CompareWindow from "../compare/CompareWindow"
import CompareReview from "../compare/CompareReview"
import ObjectPopup from "../popup/ObjectPopup"

import CompareType from "./CompareType"

const CompareLayers = (props) => {
	const navigate = useNavigate()
	const [selectedCompare, setSelectedCompare] = useState(0)
	const [selectedMaps, setSelectedMaps] = useState([
		"42e1492a-d5ac-4d09-ac03-90a6efb54d6e",
		"c0b7610e-3e12-4e03-a915-9673d1906502",
	])

	useEffect(() => {
		if (window.location.href.includes("compare")) {
			props.setHistoryToggle(true)
			switch (true) {
				case window.location.href.includes("review"):
					setSelectedCompare(0)
					break
				case window.location.href.includes("swipe"):
					setSelectedCompare(1)
					break
				case window.location.href.includes("window"):
					setSelectedCompare(2)
					break
			}
		}
	}, [])

	return (
		<>
			<Routes>
				<Route
					path="compare/review/:globalID"
					element={
						<>
							<ObjectPopup />
							<CompareReview />
							<CompareType
								selectedCompare={selectedCompare}
								setSelectedCompare={setSelectedCompare}
								selectedMaps={selectedMaps}
                setSelectedMaps={setSelectedMaps}
							/>
						</>
					}
				/>
				<Route
					path="compare/swipe/:globalIDLeft/:globalIDRight"
					element={
						<>
							<CompareSwipe once={props.once} setOnce={props.setOnce} />
							<CompareType
								selectedCompare={selectedCompare}
								setSelectedCompare={setSelectedCompare}
								selectedMaps={selectedMaps}
                setSelectedMaps={setSelectedMaps}
							/>
						</>
					}
				/>
				<Route
					path="compare/window/:globalIDLeft/:globalIDRight"
					element={
						<>
							<CompareWindow setToggleCompareWindow={props.setToggleCompareWindow} />
							<CompareType
								selectedCompare={selectedCompare}
								setSelectedCompare={setSelectedCompare}
								selectedMaps={selectedMaps}
                setSelectedMaps={setSelectedMaps}
							/>
						</>
					}
				/>
			</Routes>
		</>
	)
}

export default CompareLayers
