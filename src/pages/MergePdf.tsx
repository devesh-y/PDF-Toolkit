import {UploadFiles} from "@/components/UploadFiles";
import React, {useCallback, useState} from "react";
import {ToolHeading} from "@/components/ToolHeading";
import {PdfPagePreview} from "@/components/PdfPagePreview";
import {Button} from "@/components/ui/button";
import {PDFDocument} from "pdf-lib";
import {Loader2} from "lucide-react";
import {ReactSortable} from "react-sortablejs";
import {itemType} from "@/lib/utils";
import {downloadFile} from "@/lib/downloadFile";

export const MergePdf=()=>{
	const [uploaded,setUploaded]=useState(false);
	const [merging,setMerging]=useState(false);
	const [items,setItems]=useState<itemType[]>([])
	const getUploadedFiles=useCallback((files:File[])=>{
		setUploaded(true);
		let items:itemType[]=[];
		files.forEach((file,index)=>{
			items.push({id:index+1,file});
		})
		setItems(items);
	},[])
	const mergePdf=useCallback(async ()=>{
		setMerging(true);
		const finalPdf=await PDFDocument.create();
		for (const {file} of items) {
			const res=await fetch(URL.createObjectURL(file));
			const arrayBuffer=await res.arrayBuffer();
			const srcDoc=await PDFDocument.load(arrayBuffer);
			const copiedPages=await finalPdf.copyPages(srcDoc,srcDoc.getPageIndices());
			copiedPages.forEach((page)=>{
				finalPdf.addPage(page);
			})
		}

		const buffer=await finalPdf.save();
		downloadFile(buffer,"application/pdf");
		setMerging(false);


	},[items])
	return <>
		<ToolHeading title={"Merge PDF files"} content={"Combine PDFs in the order you want with the easiest PDF merger available."}/>
		{uploaded ?
			<>
				<Button  className={"flex justify-center mx-auto bg-blue-700 hover:bg-blue-600 my-2 w-40"} onClick={mergePdf}>{merging?<Loader2 className={"animate-spin"}/>:"Merge PDF"}</Button>
				<ReactSortable list={items} setList={setItems} animation={200} delayOnTouchOnly={true} delay={2} className={"w-full flex flex-wrap gap-4 justify-center px-4"}>
					{items.map((item) => (
						<div className={"w-48 h-56 rounded-xl border-2 hover:cursor-move"} key={item.id}>
							<PdfPagePreview file={item.file} setItems={setItems}/>
						</div>
					))}
				</ReactSortable>
			</>
			: <div className={"w-11/12 h-80 mx-auto"}>
				<UploadFiles getUploadedFiles={getUploadedFiles} fileType={"application/pdf"}/>
			</div>
		}

	</>
}