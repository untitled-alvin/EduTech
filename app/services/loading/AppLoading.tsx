import { observer } from "mobx-react-lite"
import React, { FC, useMemo, useRef } from "react"
import { LoadingDialog } from "../../components"
import { useLoadingService } from "."

interface AppLoadingProps { }

export const AppLoading: FC<AppLoadingProps> = observer(
  function AppLoading(_props) {
    const { isBusy } = useLoadingService()
    const Loading = useMemo(() => () => <LoadingDialog open={isBusy} />, [isBusy])
    return <Loading />
  }
)
