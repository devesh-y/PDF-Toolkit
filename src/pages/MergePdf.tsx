import {UploadFiles} from "@/components/UploadFiles";
import React, {useCallback, useState} from "react";
import {ToolHeading} from "@/components/ToolHeading";

export const MergePdf=()=>{
	const [uploaded,setUploaded]=useState(false);
	const getUploadedFiles=useCallback((files:File[])=>{
		setUploaded(true);

	},[])

	return <>
		<ToolHeading title={"Merge PDF files"} content={"Combine PDFs in the order you want with the easiest PDF merger available."}/>
		{uploaded ? <></> : <div className={"w-11/12 h-80 "}>
			<UploadFiles getUploadedFiles={getUploadedFiles} fileType={"application/pdf"}/>
		</div>}

	</>
}