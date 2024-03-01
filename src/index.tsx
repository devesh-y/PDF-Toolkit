import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "@/pages/HomePage";
import {MergePdf} from "@/pages/MergePdf";

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<BrowserRouter>
		<Routes>
			<Route path={"/"} element={<HomePage/>}/>
			<Route path={"/mergePdf"} element={<MergePdf/>}/>
		</Routes>
	</BrowserRouter>

);