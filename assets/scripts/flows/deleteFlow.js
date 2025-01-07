export const deleteFlow = `
flowchart TB
    subgraph Core
        PageOnDelete[Page <br> OnDeleteRecord]:::page
        PageExtOnDelete[PageExt <br> OnDeleteRecord]:::pageExt
        SubsOnDeleteEvent[Subscriber-Page <br> OnDeleteRecordEvent]:::subs
        SubsOnBeforeDelete[Subscriber-Table <br> OnBeforeDelete]:::subs
        TableExtOnBeforeDelete[TableExt <br> OnBeforeDelete]:::tableExt
        TableOnDelete[Table <br> OnDelete]:::table
        TableExtOnDelete[TableExt <br> OnDelete]:::tableExt
        SubsOnBeforeDBDelete[Subscriber-Global <br> OnBeforeDatabaseDelete]:::subs
        SubsOnAfterDBDelete[Subscriber-Global <br> OnAfterDatabaseDelete]:::subs
        SubsOnDBDelete[Subscriber-Global <br> OnDatabaseDelete]:::subs
        DBOperation[Database <br> Operation]:::dboperation
        TableExtOnAfterDelete[TableExt <br> OnAfterDelete]:::tableExt
        SubsOnAfterDelete[Subscriber-Table <br> OnAfterDelete]:::subs
    end
    
    subgraph Extension
        PageExtOnDeleteExt[PageExt <br> OnDeleteRecord]:::pageExt
        SubsOnDeleteEventExt[Subscriber-Page <br> OnDeleteRecordEvent]:::subs
        SubsOnBeforeDeleteExt[Subscriber-Table <br> OnBeforeDelete]:::subs
        TableExtOnBeforeDeleteExt[TableExt <br> OnBeforeDelete]:::tableExt
        TableExtOnDeleteExt[TableExt <br> OnDelete]:::tableExt
        SubsOnBeforeDBDeleteExt[Subscriber-Global <br> OnBeforeDatabaseDelete]:::subs
        SubsOnAfterDBDeleteExt[Subscriber-Global <br> OnAfterDatabaseDelete]:::subs
        SubsOnDBDeleteExt[Subscriber-Global <br> OnDatabaseDelete]:::subs
        TableExtOnAfterDeleteExt[TableExt <br> OnAfterDelete]:::tableExt
        SubsOnAfterDeleteExt[Subscriber-Table <br> OnAfterDelete]:::subs
    end
    
    %% Arrows to show flow
    PageOnDelete --> PageExtOnDelete
    PageExtOnDelete --> PageExtOnDeleteExt
    PageExtOnDeleteExt --> SubsOnDeleteEvent
    SubsOnDeleteEvent --> SubsOnDeleteEventExt
    SubsOnDeleteEventExt --> SubsOnBeforeDelete
    SubsOnBeforeDelete --> SubsOnBeforeDeleteExt
    SubsOnBeforeDeleteExt --> TableExtOnBeforeDelete
    TableExtOnBeforeDelete --> TableExtOnBeforeDeleteExt
    TableExtOnBeforeDeleteExt --> TableOnDelete
    TableOnDelete --> TableExtOnDelete
    TableExtOnDelete --> TableExtOnDeleteExt
    TableExtOnDeleteExt --> SubsOnBeforeDBDelete
    SubsOnBeforeDBDelete --> SubsOnBeforeDBDeleteExt
    SubsOnBeforeDBDeleteExt --> SubsOnAfterDBDelete
    SubsOnAfterDBDelete --> SubsOnAfterDBDeleteExt
    SubsOnAfterDBDeleteExt --> SubsOnDBDelete
    SubsOnDBDelete --> SubsOnDBDeleteExt
    SubsOnDBDeleteExt --> DBOperation
    DBOperation --> TableExtOnAfterDelete
    TableExtOnAfterDelete --> TableExtOnAfterDeleteExt
    TableExtOnAfterDeleteExt --> SubsOnAfterDelete
    SubsOnAfterDelete --> SubsOnAfterDeleteExt
`;
