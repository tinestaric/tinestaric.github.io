export const validateFlow = `
flowchart TB
    subgraph Core
        SubsTableBeforeValidate[Subscriber-Table <br> OnBeforeValidateEvent]:::subs
        TableExtOnValidate[TableExt <br> OnBeforeValidate]:::tableExt
        TableOnValidate[Table <br> OnValidate]:::table
        TableExtAfterValidate[TableExt <br> OnAfterValidate]:::tableExt
        SubsTableAfterValidate[Subscriber-Table <br> OnAfterValidateEvent]:::subs
        SubsPageBeforeValidate[Subscriber-Page <br> OnBeforeValidateEvent]:::subs
        PageExtBeforeValidate[PageExt <br> OnBeforeValidate]:::pageExt
        PageOnValidate[Page <br> OnValidate]:::page
        PageExtAfterValidate[PageExt <br> OnAfterValidate]:::pageExt
        SubsPageAfterValidate[Subscriber-Page <br> OnAfterValidateEvent]:::subs
    end
    
    subgraph Extension
        SubsTableBeforeValidateExt[Subscriber-Table <br> OnBeforeValidateEvent]:::subs
        TableExtOnValidateExt[TableExt <br> OnBeforeValidate]:::tableExt
        TableExtAfterValidateExt[TableExt <br> OnAfterValidate]:::tableExt
        SubsTableAfterValidateExt[Subscriber-Table <br> OnAfterValidateEvent]:::subs
        SubsPageBeforeValidateExt[Subscriber-Page <br> OnBeforeValidateEvent]:::subs
        PageExtBeforeValidateExt[PageExt <br> OnBeforeValidate]:::pageExt
        PageExtAfterValidateExt[PageExt <br> OnAfterValidate]:::pageExt
        SubsPageAfterValidateExt[Subscriber-Page <br> OnAfterValidateEvent]:::subs
    end
    
    %% Arrows to show flow
    SubsTableBeforeValidate --> SubsTableBeforeValidateExt
    SubsTableBeforeValidateExt --> TableExtOnValidate
    TableExtOnValidate --> TableExtOnValidateExt
    TableExtOnValidateExt --> TableOnValidate
    TableOnValidate --> TableExtAfterValidate
    TableExtAfterValidate --> TableExtAfterValidateExt
    TableExtAfterValidateExt --> SubsTableAfterValidate
    SubsTableAfterValidate --> SubsTableAfterValidateExt
    SubsTableAfterValidateExt --> SubsPageBeforeValidate
    SubsPageBeforeValidate --> SubsPageBeforeValidateExt
    SubsPageBeforeValidateExt --> PageExtBeforeValidate
    PageExtBeforeValidate --> PageExtBeforeValidateExt
    PageExtBeforeValidateExt --> PageOnValidate
    PageOnValidate --> PageExtAfterValidate
    PageExtAfterValidate --> PageExtAfterValidateExt
    PageExtAfterValidateExt --> SubsPageAfterValidate
    SubsPageAfterValidate --> SubsPageAfterValidateExt
`;
