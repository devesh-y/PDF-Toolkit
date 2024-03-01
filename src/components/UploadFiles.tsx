import {UploadCloud} from "lucide-react"
import {Button} from "@/components/ui/button";
import React, {memo, useCallback, useRef} from "react";
export const UploadFiles=memo(({getUploadedFiles,fileType}:{getUploadedFiles: (e:File[]) => void,fileType:string})=>{
	const inputFilesRef=useRef<HTMLInputElement|null>(null)

	const checkFileFormat=useCallback((files:FileList)=>{
		
		const file=Array.from(files).find((file)=>{
			return file.type!==fileType
		})
		if(file){
			alert("One of the files have invalid format");
		}
		return file===undefined
	},[fileType])
	const dragOverFunc=useCallback((e: React.DragEvent<HTMLDivElement>)=>{
		e.preventDefault()
		e.currentTarget.classList.add("dragDropActive")
	},[])

	const dragLeaveFunc=useCallback((e:React.DragEvent<HTMLDivElement>)=> {
		e.preventDefault()
		let targetRect=e.currentTarget.getBoundingClientRect();
		if( e.clientX<=0 || e.clientY<=0 || (e.pageX<=targetRect.left) || (e.pageX>=targetRect.right) || (e.pageY<=targetRect.top) || (e.pageY)>=targetRect.bottom) {
			e.currentTarget.classList.remove("dragDropActive")
		}
	},[])

	const dropFunc=useCallback((e:React.DragEvent<HTMLDivElement>)=>{
		e.preventDefault()
		e.currentTarget.classList.remove("dragDropActive")
		if(e.dataTransfer.files && checkFileFormat(e.dataTransfer.files)){
			getUploadedFiles(Array.from(e.dataTransfer.files))
		}
	},[checkFileFormat, getUploadedFiles])

	const browseFunc=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
		if(e.target.files && checkFileFormat(e.target.files)){
			getUploadedFiles(Array.from(e.target.files))
		}
	},[checkFileFormat, getUploadedFiles])

	return <div className={"border-2 border-dashed border-black rounded-xl w-full h-full flex flex-col items-center select-none "} onDragOver={dragOverFunc} onDragLeave={dragLeaveFunc} onDrop={dropFunc}>

		<div className={"flex-auto"} >
			<UploadCloud  className={"w-fit h-full"} strokeWidth={1}/>
		</div>
		<div className={"py-3"}>
			<input type={"file"} ref={inputFilesRef} accept={"application/pdf"} hidden={true} multiple={true}
				   onChange={browseFunc}/>
			<Button variant={"default"} className={"bg-blue-600 w-32"}
					onClick={() => inputFilesRef.current?.click()}>Browse</Button>
			<p className={"text-center font-semibold text-gray-500"}>or drag files here</p>
		</div>

	</div>
})