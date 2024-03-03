import {memo} from "react";

export const PdfPagePreview=memo(({file}:{file:File})=>{
	return <>
		{file.size}
	</>
})