import React, { useRef, useState } from 'react';
import { Animated, ViewStyle } from 'react-native';
import {
  SmartRefresh,
  SmartRefreshProps,
  OnChangeStateEvent,
  SmartRefreshHeader,
} from 'react-native-smart-refresh'
import { ActivityIndicator, ActivityIndicatorProps } from '../indicator';

export type RefreshControlProps = {
  // refreshing: boolean
  // firstRefresh?: boolean
  // onRefresh?: () => void
  // containerStyle?: StyleProp<ViewStyle>
  // children?: React.ReactElement
  activityIndicatorProps?: ActivityIndicatorProps
} & SmartRefreshProps

export const RefreshControl = (props: RefreshControlProps) => {
  const rotateAnimated = new Animated.Value(0);
  const smartRefreshRef = useRef<SmartRefresh>(undefined)
  const [title, setTitle] = useState('')
  const {
    children,
    refreshing,
    firstRefresh,
    activityIndicatorProps,
    containerStyle: $containerStyleOverride,
  } = props

  const autoRefresh = () => !!smartRefreshRef && smartRefreshRef.current.autoRefresh()

  const onPullingRefreshCallBack = () => {
    Animated.timing(rotateAnimated, {
      toValue: -180,
      duration: 200,
      useNativeDriver: true,
    }).start(() => { })
    setTitle('松开立即刷新')
  }

  const onRefreshCallBack = () => {
    const { onRefresh } = props
    onRefresh && onRefresh()
    setTitle('正在刷新...')
  }

  const onIdleRefreshCallBack = () => {
    Animated.timing(rotateAnimated, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => { })
    setTitle('下拉刷新')
  }

  const onChangeState = (event: OnChangeStateEvent) => {
    const { state } = event.nativeEvent
    switch (state) {
      case 0:
        onIdleRefreshCallBack()
        break
      case 1:
        onPullingRefreshCallBack()
        break
      case 2:
        onRefreshCallBack()
        break
      default:
    }
  }

  return (
    <SmartRefresh
      ref={smartRefreshRef}
      refreshing={refreshing}
      firstRefresh={firstRefresh}
      onChangeState={onChangeState} >
      <SmartRefreshHeader style={[$center, $containerStyleOverride]}>
        {/* <Animated.View style={[{ opacity: refreshing ? 1 : 0, }]}  > */}
        <ActivityIndicator {...activityIndicatorProps} />
        {/* </Animated.View> */}
      </SmartRefreshHeader>
      {children}
    </SmartRefresh>
  )
}

const $center: ViewStyle = { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }