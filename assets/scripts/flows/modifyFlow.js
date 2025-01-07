export const modifyFlow = `
flowchart TB
    subgraph Core
        PageOnModify[Page <br> OnModifyRecord]:::page
        PageExtOnModify[PageExt <br> OnModifyRecord]:::pageExt
        SubsOnModifyEvent[Subscriber-Page <br> OnModifyRecordEvent]:::subs
        SubsOnBeforeModify[Subscriber-Table <br> OnBeforeModify]:::subs
        TableExtOnBeforeModify[TableExt <br> OnBeforeModify]:::tableExt
        TableOnModify[Table <br> OnModify]:::table
        TableExtOnModify[TableExt <br> OnModify]:::tableExt
        SubsOnBeforeDBModify[Subscriber-Global <br> OnBeforeDatabaseModify]:::subs
        SubsOnAfterDBModify[Subscriber-Global <br> OnAfterDatabaseModify]:::subs
        SubsOnDBModify[Subscriber-Global <br> OnDatabaseModify]:::subs
        DBOperation[Database <br> Operation]:::dboperation
        TableExtOnAfterModify[TableExt <br> OnAfterModify]:::tableExt
        SubsOnAfterModify[Subscriber-Table <br> OnAfterModify]:::subs
    end
    
    subgraph Extension
        PageExtOnModifyExt[PageExt <br> OnModifyRecord]:::pageExt
        SubsOnModifyEventExt[Subscriber-Page <br> OnModifyRecordEvent]:::subs
        SubsOnBeforeModifyExt[Subscriber-Table <br> OnBeforeModify]:::subs
        TableExtOnBeforeModifyExt[TableExt <br> OnBeforeModify]:::tableExt
        TableExtOnModifyExt[TableExt <br> OnModify]:::tableExt
        SubsOnBeforeDBModifyExt[Subscriber-Global <br> OnBeforeDatabaseModify]:::subs
        SubsOnAfterDBModifyExt[Subscriber-Global <br> OnAfterDatabaseModify]:::subs
        SubsOnDBModifyExt[Subscriber-Global <br> OnDatabaseModify]:::subs
        TableExtOnAfterModifyExt[TableExt <br> OnAfterModify]:::tableExt
        SubsOnAfterModifyExt[Subscriber-Table <br> OnAfterModify]:::subs
    end
    
    %% Arrows to show flow
    PageOnModify --> PageExtOnModify
    PageExtOnModify --> PageExtOnModifyExt
    PageExtOnModifyExt --> SubsOnModifyEvent
    SubsOnModifyEvent --> SubsOnModifyEventExt
    SubsOnModifyEventExt --> SubsOnBeforeModify
    SubsOnBeforeModify --> SubsOnBeforeModifyExt
    SubsOnBeforeModifyExt --> TableExtOnBeforeModify
    TableExtOnBeforeModify --> TableExtOnBeforeModifyExt
    TableExtOnBeforeModifyExt --> TableOnModify
    TableOnModify --> TableExtOnModify
    TableExtOnModify --> TableExtOnModifyExt
    TableExtOnModifyExt --> SubsOnBeforeDBModify
    SubsOnBeforeDBModify --> SubsOnBeforeDBModifyExt
    SubsOnBeforeDBModifyExt --> SubsOnAfterDBModify
    SubsOnAfterDBModify --> SubsOnAfterDBModifyExt
    SubsOnAfterDBModifyExt --> SubsOnDBModify
    SubsOnDBModify --> SubsOnDBModifyExt
    SubsOnDBModifyExt --> DBOperation
    DBOperation --> TableExtOnAfterModify
    TableExtOnAfterModify --> TableExtOnAfterModifyExt
    TableExtOnAfterModifyExt --> SubsOnAfterModify
    SubsOnAfterModify --> SubsOnAfterModifyExt
`;
