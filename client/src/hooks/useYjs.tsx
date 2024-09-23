import { useEffect } from 'react';
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
	user: { auth: boolean; firstName: string; lastName: string; _id: string },
) => {
  useEffect(() => {
    if (editorRef) {
      const ydoc = new Y.Doc();
      const type = ydoc.getText('monaco');
      const provider = new WebsocketProvider(serverWsUrl, projectId, ydoc);
      const awareness = provider.awareness;

      awareness.setLocalStateField('user', {
        name: `${user.firstName} ${user.lastName}`,
        id: user._id,
        color: randomColor({luminosity:"dark"}),
      });

      awareness.on('change', () => {
				const statesArray = Array.from(awareness.getStates());
        statesArray.forEach(([clientId, state]) => {
          if (state.user) {
            CursorStyling(clientId, state.user.color, state.user.name);
          }
        });
      });

      const monacoBinding = new MonacoBinding(
        type,
        editorRef.getModel()!,
        new Set([editorRef]),
        awareness
      );

      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        event.preventDefault();
        monacoBinding.destroy();
        provider.disconnect();
        ydoc.destroy();
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        provider.disconnect();
        ydoc.destroy();
        monacoBinding.destroy();
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }
  }, [editorRef, serverWsUrl, projectId, user, randomColor, CursorStyling]);
};