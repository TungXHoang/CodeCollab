// import { DiCss3, DiJavascript, DiNpm } from "react-icons/di";
// import { FaList } from "react-icons/fa";
// import { AiFillFolderOpen,AiFillFolder } from "react-icons/ai";
// import TreeView, { flattenTree } from "react-accessible-treeview";
// import "./styles.css";
// // import { useYjs } from "../../hooks/useYjs";
// import { editor } from "monaco-editor";
// import { IProject } from "../../types/project";
// import React,{ useState,useEffect, useMemo } from 'react';
// // import { useAuthContext } from "../../context/AuthContext";

// type NodeId = number | string;

// export interface INode {
// 	/** A non-negative integer that uniquely identifies the node */
// 	id: NodeId;
// 	/** Used to match on key press */
// 	name: string;
// 	/** An array with the ids of the children nodes */
// 	children: NodeId[];
// 	/** The parent of the node; null for the root node */
// 	parent: NodeId | null;
// 	/** Used to indicated whether a node is branch to be able load async data onExpand*/
// 	isBranch?: boolean;
// 	/** User-defined metadata */
// 	metadata?: any;
// }

// const folder = {
// 	name: "",
// 	children: [
// 		{
// 			name: "src",
// 			children: [{ name: "main.js" }, { name: "helper.js" }],
// 		},
// 		{
//       name: "node_modules",
//       children: [
//         {
//           name: "react-accessible-treeview",
//           children: [{ name: "index.js" }],
//         },
//         { name: "react", children: [{ name: "index.js" }] },
//       ],
//     },
//     {
//       name: ".npmignore",
//     },
//     {
//       name: "package.json",
//     },
//     {
//       name: "webpack.config.js",
//     },
	
// 	],
// };



// const isBranchNode = (data: INode[], id: NodeId) => {
// 	const treeNode = data.find((node: any) => node.id === id);
// 	if (treeNode == null) {
//     throw Error(`Node with id=${id} doesn't exist in the tree.`);
//   }
//   return !!treeNode.children?.length;
// };

// // const data = flattenTree(folder)

// interface IFileTree {
// 	project: IProject,
// 	editorRef: editor.IStandaloneCodeEditor | null
// }
// const FileTree = ()=> {
// 	const data = useMemo(() => flattenTree(folder), [folder]); //temp holder data will be fetch from DB 
// 	console.log(data)
// 	// const user = useAuthContext();
// 	const [fileList, setFileList] = useState<INode[]>([])
// 	const [folderList, setFolderList] = useState<INode[]>([])

// 	useEffect(() => {
// 		const files:INode[] = [];
// 		const folders:INode[] = [];
// 		data.forEach(item => {
// 			if (isBranchNode(data, item.id)) {
// 				folders.push(item);
// 			} else {
// 				files.push(item); //
// 			}
// 		});
// 		setFolderList(folders);
// 		setFileList(files);
// 	}, []);




	
// 	const handleAddFile = () => {
// 		const newFile = { id: data.length+1,name:"tempholder",children:[], parent:0, metadata:undefined}
// 		data.push(newFile);
// 		console.log(data)
// 	}

// 	const handleAddFolder = () => {
		
// 	}
//   return (
// 		<div className="flex flex-col justify-center items-start">
// 			<div className="ml-[20px] mt-[5px] w-[90%] rounded-[6px] h-[2.3em] flex text-[hsl(0,0,80%)] items-center hover:bg-[#2B3245] bg-[#1C2333]">
// 				<input className="text-[13px] outline-none border-0  focus:ring-offset-0 focus:ring-0 focus:outline-offset-0 focus:ring-offset-0 rounded-[4px] px-2 py-1 w-full bg-transparent border-0" type="search" placeholder="Search" autoComplete="off" autoCorrect="off" autoCapitalize="off" />
// 			</div>
// 			<div className="text-white w-[90%] flex flex-row items-center justify-center gap-[10px] mt-3">
// 				<button onClick={handleAddFile}>Add file</button>
// 				<button onClick={handleAddFolder}>Add folder</button>
// 			</div>
//       <div className="ide w-[90%]">
//         <TreeView
// 					data={data}
//           aria-label="directory tree"
// 					togglableSelect
// 					expandedIds={folderList.length > 0 ? [folderList[1].id] : []}
// 					selectedIds={fileList.length > 0 ? [fileList[0].id] : []}
//           clickAction="EXCLUSIVE_SELECT"
//           multiSelect
//           nodeRenderer={({
//             element,
//             isBranch,
//             isExpanded,
//             getNodeProps,
// 						handleExpand,
// 						handleSelect
// 					}) => (
// 						<div {...getNodeProps({
// 							onClick: (e) => {
// 								handleExpand(e);
// 								if (!isBranch) {
// 									handleSelect(e)
// 									const index = fileList.findIndex((file) => {
// 										return (file.id) === (element.id);
// 									});
// 									// selectFile(index);
// 								}
// 							}
// 						})} 
// 							style={{ paddingLeft: 0 }}>
//               {isBranch ? (
//                 <FolderIcon isOpen={isExpanded} />
//               ) : (
//                 <FileIcon filename={element.name} />
//               )}
//               {element.name}
//             </div>
//           )}
//         />
//       </div>
//     </div>
//   );
// }

// const FolderIcon = ({ isOpen }:any) =>
//   isOpen ? (
//     <AiFillFolderOpen color="e8a87c" className="icon" />
//   ) : (
//     <AiFillFolder color="e8a87c" className="icon" />
//   );

// const FileIcon = ({ filename }:any) => {
//   const extension = filename.slice(filename.lastIndexOf(".") + 1);
//   switch (extension) {
//     case "js":
//       return <DiJavascript color="yellow" className="icon" />;
//     case "css":
//       return <DiCss3 color="turquoise" className="icon" />;
//     case "json":
//       return <FaList color="yellow" className="icon" />;
//     case "npmignore":
//       return <DiNpm color="red" className="icon" />;
//     default:
//       return null;
//   }
// };
// export default React.memo(FileTree);


