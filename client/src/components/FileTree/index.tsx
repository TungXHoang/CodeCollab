import { DiCss3, DiJavascript, DiNpm } from "react-icons/di";
import { FaList } from "react-icons/fa";
import { AiFillFolderOpen,AiFillFolder } from "react-icons/ai";
import TreeView, { flattenTree } from "react-accessible-treeview";
import "./styles.css";

const folder = {
  name: "",
  children: [
    {
      name: "src",
      children: [{ name: "index.js" }, { name: "styles.css" }],
    },
    {
      name: "node_modules",
      children: [
        {
          name: "react-accessible-treeview",
          children: [{ name: "index.js" }],
        },
        { name: "react", children: [{ name: "index.js" }] },
      ],
    },
    {
      name: ".npmignore",
    },
    {
      name: "package.json",
    },
    {
      name: "webpack.config.js",
    },
  ],
};

const data = flattenTree(folder);
function MultiSelectDirectoryTreeView() {
  return (
		<div className="flex flex-col justify-center items-start">
			<div className="mx-[20px] mt-[5px] w-[90%] rounded-[6px] h-[2.3em] flex text-[hsl(0,0,80%)] items-center hover:bg-[#2B3245] bg-[#1C2333]">
				<input className="text-[13px] outline-none border-0  focus:ring-offset-0 focus:ring-0 focus:outline-offset-0 focus:ring-offset-0 rounded-[4px] px-2 py-1 w-full bg-transparent border-0" type="search" placeholder="Search" autoComplete="off" autoCorrect="off" autoCapitalize="off" />

			</div>
			<div className="flex text-[hsl(0,0,80%)] items-center">
										
			</div>
      <div className="ide">
        <TreeView
          data={data}
          aria-label="directory tree"
          togglableSelect
          clickAction="EXCLUSIVE_SELECT"
          multiSelect
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
            handleSelect,
          }) => (
            <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
              {isBranch ? (
                <FolderIcon isOpen={isExpanded} />
              ) : (
                <FileIcon filename={element.name} />
              )}
              {element.name}
            </div>
          )}
        />
      </div>
    </div>
  );
}

const FolderIcon = ({ isOpen }:any) =>
  isOpen ? (
    <AiFillFolderOpen color="e8a87c" className="icon" />
  ) : (
    <AiFillFolder color="e8a87c" className="icon" />
  );

const FileIcon = ({ filename }:any) => {
  const extension = filename.slice(filename.lastIndexOf(".") + 1);
  switch (extension) {
    case "js":
      return <DiJavascript color="yellow" className="icon" />;
    case "css":
      return <DiCss3 color="turquoise" className="icon" />;
    case "json":
      return <FaList color="yellow" className="icon" />;
    case "npmignore":
      return <DiNpm color="red" className="icon" />;
    default:
      return null;
  }
};
export default MultiSelectDirectoryTreeView;