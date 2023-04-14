import React, { useMemo } from "react"
import { observer } from "mobx-react-lite"
import { useLoadingService } from "./hook"
import { LoadingDialog } from "./dialog"

export type LoadingProviderProps = {}

export const LoadingProvider = observer((_props: LoadingProviderProps) => {
  const { isBusy } = useLoadingService()
  const Loading = useMemo(() => () => <LoadingDialog open={isBusy} />, [isBusy])
  return <Loading />
})
