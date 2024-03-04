import React, {memo, useCallback, useEffect, useRef, useState} from "react";
import * as pdfjsLib from "pdfjs-dist"
import {Loader2, RotateCw, XCircle} from "lucide-react";
import {degrees, PDFDocument} from "pdf-lib";
pdfjsLib.GlobalWorkerOptions.workerSrc = "./pdf.worker.js";
export const PdfPagePreview=memo(({file,setFiles}:{file:File,setFiles:React.Dispatch<React.SetStateAction<File[]>>})=>{
	const canvasRef=useRef<null|HTMLCanvasElement>(null)
	const [loading,setLoading]=useState(true);
	const renderFirstPage = useCallback(async() => {
		try{
			const pdf=await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
			const page=await pdf.getPage(1);
			const viewport = page.getViewport({scale:1});

			const canvas = canvasRef.current!;
			const context = canvas.getContext('2d')!;

			canvas.height = viewport.height;
			canvas.width = viewport.width;
			const renderContext = {
				canvasContext: context,
				viewport: viewport
			};
			await page.render(renderContext).promise;
			setLoading(false);
		}catch (e){
			throw  new Error((e as Error).message);
		}

	}, [file])
	const removeFile=useCallback(()=>{
		setFiles((files)=>{
				return files.filter((value)=>value!==file);
		})
	},[file, setFiles])
	const rotatePdf=useCallback(async ()=>{
		try {
			const res=await fetch(URL.createObjectURL(file));
			const arrayBuffer=await res.arrayBuffer();
			const pdfDoc=await PDFDocument.load(arrayBuffer);

			pdfDoc.getPages().forEach((page)=>{
				const currRotation=page.getRotation().angle;
				page.setRotation(degrees(90+currRotation));
			})
			const pdfBytes=await pdfDoc.save();
			const newFile=new File([pdfBytes],file.name)
			setFiles((files)=>{
				const newFiles=files.map((value)=>value);
				let indexToChange=-1;
				for(let i=0;i<newFiles.length;i++){
					if(newFiles[i]===file){
						indexToChange=i;
						break;
					}
				}
				newFiles[indexToChange]=newFile;
				return newFiles;
			})
		}
		catch (e) {
			console.log(e)
		}

	},[file, setFiles])
	useEffect(() => {
		renderFirstPage().catch((e)=>{
			console.log(e)
		});
	}, [renderFirstPage]);
	return <div className={"w-full h-full relative"}>
		<XCircle strokeWidth={"1"} className={"absolute right-0 cursor-default fill-white hover:fill-red-600"} onClick={removeFile}/>
		<RotateCw strokeWidth={"1.5"} className={"absolute cursor-default fill-white text-blue-700 "} onClick={rotatePdf}/>
		<div className={"h-[90%] flex justify-center items-center p-2"}>
			<canvas ref={canvasRef} className={"rounded-xl w-full h-full"}></canvas>
			{loading ? <Loader2 className={"animate-spin absolute"}/> : <></>}
		</div>
		<div className={"h-[10%] flex items-center justify-center"}>
			<p className={"line-clamp-1 text-center text-sm"} title={file.name}>{file.name}</p>
		</div>
	</div>


})