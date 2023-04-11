import React, { useMemo } from "react"
import { observer } from "mobx-react-lite"
import { useLoadingService } from "."
import { LoadingDialog } from "../../components"

type AppLoadingProps = {}

export const AppLoading = observer((_props: AppLoadingProps) => {
  const { isBusy } = useLoadingService()
  const Loading = useMemo(() => () => <LoadingDialog open={isBusy} />, [isBusy])
  return <Loading />
})
