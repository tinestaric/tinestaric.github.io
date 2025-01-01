import { flowStyles } from './flows/flowStyles.js';

export async function loadFlow(type) {
    let module;
    try {
        if (type === 'insert') {
            module = await import('./flows/insertFlow.js');
        } else if (type === 'modify') {
            module = await import('./flows/modifyFlow.js');
        } else if (type === 'delete') {
            module = await import('./flows/deleteFlow.js');
        } else if (type === 'validate') {
            module = await import('./flows/validateFlow.js');
        } else if (type === 'lookup') {
            module = await import('./flows/lookupFlow.js');
        } else if (type === 'rename') {
            module = await import('./flows/renameFlow.js');
        }
        return `${module[`${type}Flow`]}\n${flowStyles}`;
    } catch (error) {
        console.error('Flow not found:', error);
        return `flowchart TB\n${flowStyles}\nStart --> Error(Not Found)`;
    }
}
