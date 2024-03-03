import {UploadFiles} from "@/components/UploadFiles";
import React, {useCallback, useState} from "react";
import {ToolHeading} from "@/components/ToolHeading";
import {DragDrop} from "@/components/DragDrop";

export const MergePdf=()=>{
	const [uploaded,setUploaded]=useState(false);
	const [files,setFiles]=useState<File[]>([])
	const getUploadedFiles=useCallback((files:File[])=>{
		setUploaded(true);
		setFiles(files);
	},[])

	return <>
		<ToolHeading title={"Merge PDF files"} content={"Combine PDFs in the order you want with the easiest PDF merger available."}/>
		{uploaded ? <div>
			<DragDrop files={files}/>
		</div> : <div className={"w-11/12 h-80 mx-auto"}>
			<UploadFiles getUploadedFiles={getUploadedFiles} fileType={"application/pdf"}/>
		</div>}

	</>
}