import {UploadFiles} from "@/components/UploadFiles";
import React, {useCallback, useState} from "react";
import {ToolHeading} from "@/components/ToolHeading";
import {DragDropElement} from "@/components/DragDropElement";
import {PdfPagePreview} from "@/components/PdfPagePreview";
import {Button} from "@/components/ui/button";
import {PDFDocument} from "pdf-lib";
import {Loader2} from "lucide-react";

export const MergePdf=()=>{
	const [uploaded,setUploaded]=useState(false);
	const [merging,setMerging]=useState(false);
	const [files,setFiles]=useState<File[]>([])
	const getUploadedFiles=useCallback((files:File[])=>{
		setUploaded(true);
		setFiles(files);
	},[])
	const mergePdf=useCallback(async ()=>{
		setMerging(true);
		const finalPdf=await PDFDocument.create();
		for (const file of files) {
			const res=await fetch(URL.createObjectURL(file));
			const arrayBuffer=await res.arrayBuffer();
			const srcDoc=await PDFDocument.load(arrayBuffer);
			const copiedPages=await finalPdf.copyPages(srcDoc,srcDoc.getPageIndices());
			copiedPages.forEach((page)=>{
				finalPdf.addPage(page);
			})
		}

		const buffer=await finalPdf.save();
		const file=new File([buffer],"final.pdf")
		const a =document.createElement("a");
		a.download="merged.pdf";
		a.href=URL.createObjectURL(file);
		a.click()
		setMerging(false);


	},[files])
	return <>
		<ToolHeading title={"Merge PDF files"} content={"Combine PDFs in the order you want with the easiest PDF merger available."}/>
		{uploaded ?
			<>
				<Button  className={"flex justify-center mx-auto bg-blue-700 hover:bg-blue-600 my-2 w-40"} onClick={mergePdf}>{merging?<Loader2 className={"animate-spin"}/>:"Merge PDF"}</Button>
				<div className={"w-full flex flex-wrap gap-4 justify-center px-4"}>
					{files.map((file, index) => {
						return <DragDropElement key={index} setFiles={setFiles} index={index}>
							<PdfPagePreview file={file} setFiles={setFiles}/>
						</DragDropElement>
					})}
				</div>
			</>
			: <div className={"w-11/12 h-80 mx-auto"}>
				<UploadFiles getUploadedFiles={getUploadedFiles} fileType={"application/pdf"}/>
			</div>
		}

	</>
}