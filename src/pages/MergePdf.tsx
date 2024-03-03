import {UploadFiles} from "@/components/UploadFiles";
import React, {useCallback, useState} from "react";
import {ToolHeading} from "@/components/ToolHeading";
import {DragDropElement} from "@/components/DragDropElement";
import {PdfPagePreview} from "@/components/PdfPagePreview";

export const MergePdf=()=>{
	const [uploaded,setUploaded]=useState(false);
	const [files,setFiles]=useState<File[]>([])
	const getUploadedFiles=useCallback((files:File[])=>{
		setUploaded(true);
		setFiles(files);
	},[])

	return <>
		<ToolHeading title={"Merge PDF files"} content={"Combine PDFs in the order you want with the easiest PDF merger available."}/>
		{uploaded ?
			<div className={"w-full flex flex-wrap gap-4"}>
				{files.map((file, index) => {
					return <DragDropElement key={index} setFiles={setFiles} index={index}>
						<PdfPagePreview file={file}/>
					</DragDropElement>
				})}
			</div> : <div className={"w-11/12 h-80 mx-auto"}>
			<UploadFiles getUploadedFiles={getUploadedFiles} fileType={"application/pdf"}/>
		</div>}

	</>
}