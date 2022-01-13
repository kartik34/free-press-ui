import { DOMMessage, DOMMessageResponse } from '../types';

const messagesFromReactAppListener = (msg: DOMMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: DOMMessageResponse) => void) => {
    console.log('[content.js]. Message received', msg);

    const response: DOMMessageResponse = {
        title: document.title,
        url: document.URL,
    };

    console.log('[content.js]. Message response', response);

    sendResponse(response)
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);