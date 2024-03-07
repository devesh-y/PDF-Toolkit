import {ToolHeading} from "@/components/ToolHeading";
import {UploadFiles} from "@/components/UploadFiles";
import React, {useCallback, useState} from "react";
import {pdfItemType} from "@/lib/utils";
import {CombinePdf} from "@/components/CombinePdf";
import {PDFDocument} from "pdf-lib";
import {Loader2} from "lucide-react";

export const OrganizePdf=()=>{
	const [uploaded,setUploaded]=useState(false);
	const [items,setItems]=useState<pdfItemType[]>([])
	const getUploadedFiles=useCallback(async (files:File[])=>{
		setUploaded(true);
		let count=0;
		let items:pdfItemType[]=[];
		for (const file of files) {
			const res=await fetch(URL.createObjectURL(file));
			const arrayBuffer=await res.arrayBuffer();
			const srcDoc=await PDFDocument.load(arrayBuffer);
			for(const page of srcDoc.getPageIndices()){
				const tempPdf=await PDFDocument.create();
				const copiedPage=await tempPdf.copyPages(srcDoc,[page]);
				tempPdf.addPage(copiedPage[0]);
				const buffer=await tempPdf.save();
				const newFile=new File([buffer],`Page-${page+1} ${file.name}`,{type:"application/pdf"})
				items.push({file:newFile,id:count++});
			}
		}
		setItems(items);
	},[])
	return <>
		<ToolHeading title={"Organize PDF"} content={"Sort, add and delete PDF pages.\n" +
			"Drag and drop the page thumbnails and sort them in our PDF organizer."}/>
		{(uploaded && items.length>0) ? <CombinePdf files={items}/>
			: <div className={"w-11/12 h-80 mx-auto flex items-center justify-center"}>
				{(items.length===0 && uploaded) ?<Loader2 className={"animate-spin"}/>:<UploadFiles getUploadedFiles={getUploadedFiles} fileType={"application/pdf"} multiple={true}/>}
			</div>
		}
	</>
}