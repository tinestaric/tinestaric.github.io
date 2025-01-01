export const lookupFlow = `
graph TD
    A[Lookup Invoked] --> X{OnLookup Trigger Defined?}
    X --> |No| E{TableRelation Defined?}
    X --> |Yes| F[Core - PageExt <br> OnLookup Defined?]:::pageExt
    F --> |Yes| I[Core - PageExt <br> OnLookup Executed]:::pageExt
    F --> |No| G[Extension - PageExt <br> OnLookup Defined?]:::pageExt
    G --> |Yes| J[Extension - PageExt <br> OnLookup Executed]:::pageExt
    G --> |No| K[Core - Page <br> OnLookup Defined?]:::page
    K --> |Yes| L[Core - Page <br> OnLookup Executed]:::page
    K --> |No| H[Core - Table <br> OnLookup Executed]:::table
    E --> |Yes| B[Core - Page <br> OnAfterLookup]:::page --> C[Core - PageExt <br> OnAfterAfterLookup]:::pageExt --> D[Ext - PageExt <br> OnAfterAfterLookup]:::pageExt
`;
