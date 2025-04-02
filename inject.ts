// (function () {
//     function sendQueryState() {
//       const queryClient = window.__REACT_QUERY_DEVTOOLS__;
//       if (!queryClient) return;
  
//       const queries = queryClient.getQueryCache().getAll();
//       const queryData = queries.map((query) => ({
//         queryKey: query.queryKey,
//         state: query.state,
//       }));
  
//       window.postMessage({ type: "TANSTACK_QUERY_STATE", payload: queryData }, "*");
//     }
  
//     setInterval(sendQueryState, 2000); // Update every 2 seconds
//   })();
(() => {
  function storeQueryState() {
    const queryClient = (window as any).__REACT_QUERY_DEVTOOLS__;
    if (!queryClient) return;

    const queries = queryClient.getQueryCache().getAll().map((query: any) => ({
      queryKey: query.queryKey,
      state: query.state,
    }));

    (window as any).__TANSTACK_QUERY_STATE__ = queries;
    window.postMessage({ type: "TANSTACK_QUERY_STATE", queries }, "*");
  }

  setInterval(storeQueryState, 2000);
})();