import CacheValidate from "./transversal/cache/cacheValidate";
import ErrorBoundary from "./transversal/error/errorBoundary";
import AppRouter from "./transversal/routes/appRouter";
import ContextState from "./transversal/context/contextStateConfig";
import "./transversal/language/i18n";
function App() {
  return (
    <CacheValidate>
      {(cache) => {
        if (cache === undefined || cache.loading === true) return null;
        if (cache.loading === false && cache.isLatestVersion === false) {
          // You can decide how and when you want to force reload
          cache.refreshCacheAndReload();
        }
        return (
          <ErrorBoundary>
            <ContextState>
              <AppRouter />
            </ContextState>
          </ErrorBoundary>
        );
      }}
    </CacheValidate>
  );
}
export default App;
