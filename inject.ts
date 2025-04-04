function findQueryClient(): any | null {
  // Search React’s global Fiber tree for QueryClient
  const reactRoot = (document.getElementById("root") as any)?._reactRootContainer?._internalRoot;
  if (!reactRoot) return null;

  let node = reactRoot.current;
  while (node) {
    if (node.stateNode?.queryClient) {
      return node.stateNode.queryClient;
    }
    node = node.child;
  }
  return null;
}

(() => {
  function storeQueryState() {
    const queryClient = findQueryClient();
    console.log("queryClient", queryClient);
    if (!queryClient) return;

    const queries = queryClient.getQueryCache().getAll().map((query: any) => ({
      queryKey: query.queryKey,
      state: query.state,
    }));

    console.log("queries", queries);
    window.postMessage({ type: "TANSTACK_QUERY_STATE", queries }, "*");
  }

  setInterval(storeQueryState, 2000);
})();

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

// the "(window as any).__REACT_QUERY_DEVTOOLS__;" is reliant on react dev tools to be installed
// (() => {
//   function storeQueryState() {
//     const queryClient = (window as any).__REACT_QUERY_DEVTOOLS__;
//     if (!queryClient) return;

//     const queries = queryClient.getQueryCache().getAll().map((query: any) => ({
//       queryKey: query.queryKey,
//       state: query.state,
//     }));

//     // this might not be needed?
//     // (window as any).__TANSTACK_QUERY_STATE__ = queries;
//     window.postMessage({ type: "TANSTACK_QUERY_STATE", queries }, "*");
//   }

//   setInterval(storeQueryState, 2000);
// })();