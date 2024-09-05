import { useEffect, useState,useRef } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { editor } from "monaco-editor";
import randomColor from "randomcolor"
import { CursorStyling } from "../foundation/utils/CursorStyling";


const serverWsUrl = `ws://localhost:${import.meta.env.VITE_SOCKET_PORT}`

export const useYjs = (
	editorRef: editor.IStandaloneCodeEditor | null,
	projectId: string,
	fileTree: any,
	user: { auth: boolean; firstName: string; lastName: string; _id: string },
) => {


	const [docList, setDocList] = useState<Y.Array<Y.Text> | undefined>(undefined);
	// const [bindEditorFnc, setBindEditorFnc] = useState<any>();
	const bindEditorRef = useRef<any>(null);


	
	useEffect(() => {
		//read from db
		const ydoc = new Y.Doc();
		// const type = ydoc.getText('monaco');
		const doc_list: Y.Array<Y.Text> = ydoc.getArray("doc-list");
		// this step not need in production; we will populate doc_list from db
		for (let i = 0; i < fileTree.length; i++) {
			const newDoc = new Y.Text();
			newDoc.applyDelta([{ insert: `Document #${doc_list.length}` }, { insert: '\n', attributes: { header: 1 } }, { insert: '\n' }])
			doc_list.push([newDoc])
		}
		setDocList(doc_list)

		if (editorRef && docList) {
			// Provider and awareness
			const provider = new WebsocketProvider(serverWsUrl, projectId, ydoc);
			const awareness = provider.awareness;

			//cursor handling
			// awareness.setLocalStateField('user', {
			// 	name: `${user.firstName} ${user.lastName}`,
			// 	id: user._id,
			// 	color: randomColor({luminosity:"dark"}),
			// });

			// awareness.on('change', () => {
			// 	const statesArray = Array.from(awareness.getStates());
			// 	statesArray.forEach(([clientId, state]) => {
			// 		if (state.user) {
			// 			CursorStyling(clientId, state.user.color, state.user.name);
			// 		}
			// 	});
			// });
			
			//create a new Binding
		
			console.log(docList.toArray())
			let binding = new MonacoBinding(
				docList.get(1),
        editorRef.getModel()!,
        new Set([editorRef]),
        awareness
			);


			const bindEditor = (yText: Y.Text) => {
				const ytext = yText;
				if (binding) {
					binding.destroy()
				}
				binding = new MonacoBinding(ytext, editorRef.getModel()!, new Set([editorRef]), awareness);
			}
			bindEditorRef.current = bindEditor;


      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
				event.preventDefault();
				binding.destroy();

        provider.disconnect();
        ydoc.destroy();
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        provider.disconnect();
				ydoc.destroy();
				binding.destroy();
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
	}, [editorRef, projectId, user,randomColor,fileTree]);

	const selectFile = (index: number) => {
		if (docList) {
			console.log(index)
			const yText = docList.get(index);
			console.log(yText);
			bindEditorRef.current(yText);
		}
		else {
			// throw Error
			console.log("doclist undefined")
		}
		
	}
	return {docList,selectFile}
};

