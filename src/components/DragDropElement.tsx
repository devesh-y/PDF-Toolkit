import React, {memo, ReactNode, useCallback} from "react";

export const DragDropElement=memo(({setFiles,children,index}:{children:ReactNode,setFiles: React.Dispatch<React.SetStateAction<File[]>>,index:number})=>{

	const dragStartFunc=useCallback((e: React.DragEvent<HTMLDivElement>)=>{
		e.dataTransfer.setData("from",e.currentTarget.id)
	},[])

	const dragEnterFunc=useCallback((e:React.DragEvent<HTMLDivElement>)=>{
		e.preventDefault();
		(e.currentTarget as HTMLDivElement).style.opacity="0.5";
		(e.currentTarget as HTMLDivElement).style.scale="0.8"
	},[])

	const dragOverFunc=useCallback((e:React.DragEvent<HTMLDivElement>)=>{
		e.preventDefault();
	},[])

	const dropFunc=useCallback((e:React.DragEvent<HTMLDivElement>)=>{
		e.preventDefault();
		(e.currentTarget as HTMLDivElement).style.opacity="1";
		(e.currentTarget as HTMLDivElement).style.scale="1"
		const prevId=(e.dataTransfer.getData("from")).split(" ")[0];
		const currId=(e.currentTarget.id).split(" ")[0];
		
		setFiles((files)=>{
			const newArray=files.map((item)=>item);
			[newArray[Number(prevId)],newArray[Number(currId)]]=[newArray[Number(currId)],newArray[Number(prevId)]]
			return newArray
		});
	},[setFiles])

	const dragLeaveFunc=useCallback((e:React.DragEvent<HTMLDivElement>)=>{
		e.preventDefault();
		let targetRect=e.currentTarget.getBoundingClientRect();
		if( e.clientX<=0 || e.clientY<=0 || (e.pageX<=targetRect.left) || (e.pageX>=targetRect.right) || (e.pageY<=targetRect.top) || (e.pageY)>=targetRect.bottom) {
			(e.currentTarget as HTMLDivElement).style.opacity="1";
			(e.currentTarget as HTMLDivElement).style.scale="1"
		}

	},[])


	return <div id={index+" d&d"} draggable={true} onDragStart={dragStartFunc} onDragLeave={dragLeaveFunc} onDragEnter={dragEnterFunc} onDragOver={dragOverFunc} onDrop={dropFunc} className={"flex items-center justify-center w-40 h-40 bg-blue-700 rounded-xl transition-all"}>
		{children}
	</div>


})