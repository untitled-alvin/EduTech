import { createContext, useContext } from "react"
import { LoadingService, LoadingServiceModel, } from "./loadingService"

/**
 * Create the initial (empty) global LoadingService instance here.
 *
 * If your LoadingService requires specific properties to be instantiated,
 * you can do so here.
 *
 * If your LoadingService has a _ton_ of sub-stores and properties (the tree is
 * very large), you may want to use a different strategy than immediately
 * instantiating it, although that should be rare.
 */
const _loadingService = LoadingServiceModel.create({})

/**
 * The LoadingServiceContext provides a way to access
 * the LoadingService in any screen or component.
 */
const LoadingServiceContext = createContext<LoadingService>(_loadingService)

/**
 * You can use this Provider to specify a *different* LoadingService
 * than the singleton version above if you need to. Generally speaking,
 * this Provider & custom LoadingService instances would only be used in
 * testing scenarios.
 */
export const LoadingServiceProvider = LoadingServiceContext.Provider

/**
 * A hook that screens and other components can use to gain access to
 * our stores:
 *
 * const loadingService = useLoadingService()
 *
 * or:
 *
 * const { isBusy, someProperties } = useLoadingService()
 */
export const useLoadingService = () => useContext(LoadingServiceContext)

/**
 * Used only in the app.tsx file, this hook sets up the LoadingService.
 * It connects everything with Reactotron
 * and then lets the app know that everything is ready to go.
 */
export const useInitialLoadingService = (callback: () => void | Promise<void>) => {
  const loadingService = useLoadingService()
  return { loadingService }
}
