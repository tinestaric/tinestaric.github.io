export const insertFlow = `
flowchart TB
    subgraph Core
        PageOnInsert[Page <br> OnInsertRecord]:::page
        PageExtOnInsert[PageExt <br> OnInsertRecord]:::pageExt
        SubsOnInsertEvent[Subscriber-Page <br> OnInsertRecordEvent]:::subs
        SubsOnBeforeInsert[Subscriber-Table <br> OnBeforeInsert]:::subs
        TableExtOnBeforeInsert[TableExt <br> OnBeforeInsert]:::tableExt
        TableOnInsert[Table <br> OnInsert]:::table
        TableExtOnInsert[TableExt <br> OnInsert]:::tableExt
        SubsOnBeforeDBInsert[Subscriber-Global <br> OnBeforeDatabaseInsert]:::subs
        SubsOnAfterDBInsert[Subscriber-Global <br> OnAfterDatabaseInsert]:::subs
        SubsOnDBInsert[Subscriber-Global <br> OnDatabaseInsert]:::subs
        TableExtOnAfterInsert[TableExt <br> OnAfterInsert]:::tableExt
        SubsOnAfterInsert[Subscriber-Table <br> OnAfterInsert]:::subs
    end
    
    subgraph Extension
        PageExtOnInsertExt[PageExt <br> OnInsertRecord]:::pageExt
        SubsOnInsertEventExt[Subscriber-Page <br> OnInsertRecordEvent]:::subs
        SubsOnBeforeInsertExt[Subscriber-Table <br> OnBeforeInsert]:::subs
        TableExtOnBeforeInsertExt[TableExt <br> OnBeforeInsert]:::tableExt
        TableExtOnInsertExt[TableExt <br> OnInsert]:::tableExt
        SubsOnBeforeDBInsertExt[Subscriber-Global <br> OnBeforeDatabaseInsert]:::subs
        SubsOnAfterDBInsertExt[Subscriber-Global <br> OnAfterDatabaseInsert]:::subs
        SubsOnDBInsertExt[Subscriber-Global <br> OnDatabaseInsert]:::subs
        TableExtOnAfterInsertExt[TableExt <br> OnAfterInsert]:::tableExt
        SubsOnAfterInsertExt[Subscriber-Table <br> OnAfterInsert]:::subs
    end
    
    %% Arrows to show flow
    PageOnInsert --> PageExtOnInsert
    PageExtOnInsert --> PageExtOnInsertExt
    PageExtOnInsertExt --> SubsOnInsertEvent
    SubsOnInsertEvent --> SubsOnInsertEventExt
    SubsOnInsertEventExt --> SubsOnBeforeInsert
    SubsOnBeforeInsert --> SubsOnBeforeInsertExt
    SubsOnBeforeInsertExt --> TableExtOnBeforeInsert
    TableExtOnBeforeInsert --> TableExtOnBeforeInsertExt
    TableExtOnBeforeInsertExt --> TableOnInsert
    TableOnInsert --> TableExtOnInsert
    TableExtOnInsert --> TableExtOnInsertExt
    TableExtOnInsertExt --> SubsOnBeforeDBInsert
    SubsOnBeforeDBInsert --> SubsOnBeforeDBInsertExt
    SubsOnBeforeDBInsertExt --> SubsOnAfterDBInsert
    SubsOnAfterDBInsert --> SubsOnAfterDBInsertExt
    SubsOnAfterDBInsertExt --> SubsOnDBInsert
    SubsOnDBInsert --> SubsOnDBInsertExt
    SubsOnDBInsertExt --> TableExtOnAfterInsert
    TableExtOnAfterInsert --> TableExtOnAfterInsertExt
    TableExtOnAfterInsertExt --> SubsOnAfterInsert
    SubsOnAfterInsert --> SubsOnAfterInsertExt
`;
