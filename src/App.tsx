import React, {useCallback} from "react";
import * as pdfjsLib from "pdfjs-dist"
pdfjsLib.GlobalWorkerOptions.workerSrc = "./pdf.worker.js";

function App() {
	const func = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {

		if (e.target && e.target.files && e.target.files.length > 0) {
			pdfjsLib.getDocument(URL.createObjectURL(e.target.files[0])).promise.then((pdf) => {
				console.log(pdf.numPages)
			}).catch((e: any) => {
				console.log(e)
				console.log("err")
			})
		}

	}, [])
	return (
		<div>
			<input type={"file"} accept={"application/pdf"} onChange={func}/>
		</div>
	);
}

export default App;
