export const renameFlow = `
flowchart TB
    subgraph Core
        SubsOnBeforeRename[Subscriber-Table <br> OnBeforeRename]:::subs
        TableExtOnBeforeRename[TableExt <br> OnBeforeRename]:::tableExt
        TableOnRename[Table <br> OnRename]:::table
        TableExtOnRename[TableExt <br> OnRename]:::tableExt
        SubsOnBeforeDBRename[Subscriber-Global <br> OnBeforeDatabaseRename]:::subs
        SubsOnAfterDBRename[Subscriber-Global <br> OnAfterDatabaseRename]:::subs
        SubsOnDBRename[Subscriber-Global <br> OnDatabaseRename]:::subs
        TableExtOnAfterRename[TableExt <br> OnAfterRename]:::tableExt
        SubsOnAfterRename[Subscriber-Table <br> OnAfterRename]:::subs
    end
    
    subgraph Extension
        SubsOnBeforeRenameExt[Subscriber-Table <br> OnBeforeRename]:::subs
        TableExtOnBeforeRenameExt[TableExt <br> OnBeforeRename]:::tableExt
        TableExtOnRenameExt[TableExt <br> OnRename]:::tableExt
        SubsOnBeforeDBRenameExt[Subscriber-Global <br> OnBeforeDatabaseRename]:::subs
        SubsOnAfterDBRenameExt[Subscriber-Global <br> OnAfterDatabaseRename]:::subs
        SubsOnDBRenameExt[Subscriber-Global <br> OnDatabaseRename]:::subs
        TableExtOnAfterRenameExt[TableExt <br> OnAfterRename]:::tableExt
        SubsOnAfterRenameExt[Subscriber-Table <br> OnAfterRename]:::subs
    end
    
    %% Arrows to show flow
    SubsOnBeforeRename --> SubsOnBeforeRenameExt
    SubsOnBeforeRenameExt --> TableExtOnBeforeRename
    TableExtOnBeforeRename --> TableExtOnBeforeRenameExt
    TableExtOnBeforeRenameExt --> TableOnRename
    TableOnRename --> TableExtOnRename
    TableExtOnRename --> TableExtOnRenameExt
    TableExtOnRenameExt --> SubsOnBeforeDBRename
    SubsOnBeforeDBRename --> SubsOnBeforeDBRenameExt
    SubsOnBeforeDBRenameExt --> SubsOnAfterDBRename
    SubsOnAfterDBRename --> SubsOnAfterDBRenameExt
    SubsOnAfterDBRenameExt --> SubsOnDBRename
    SubsOnDBRename --> SubsOnDBRenameExt
    SubsOnDBRenameExt --> TableExtOnAfterRename
    TableExtOnAfterRename --> TableExtOnAfterRenameExt
    TableExtOnAfterRenameExt --> SubsOnAfterRename
    SubsOnAfterRename --> SubsOnAfterRenameExt
`;
