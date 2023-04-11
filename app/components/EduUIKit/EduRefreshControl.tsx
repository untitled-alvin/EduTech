import React, { Component } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';
import { SmartRefreshHeader, OnChangeStateEvent, SmartRefresh } from 'react-native-smart-refresh'
import { EduActivityIndicator, EduActivityIndicatorProps } from './Indicator';

export interface EduRefreshControlProps {
    refreshing: boolean
    firstRefresh?: boolean
    onRefresh?: () => void
    activityIndicatorProps?: EduActivityIndicatorProps
    containerStyle?: StyleProp<ViewStyle>
    children?: React.ReactElement
}

interface EduRefreshControlState { title: string }

export class EduRefreshControl extends Component<EduRefreshControlProps, EduRefreshControlState> {
    rotateAnimated: Animated.Value = new Animated.Value(0);
    smartRefreshRef: SmartRefresh | null = null;
    state: Readonly<EduRefreshControlState> = { title: '下拉刷新 ' };

    private setTitle = (title: string) => {
        this.setState({ title });
    };

    private onPullingRefreshCallBack = () => {
        Animated.timing(this.rotateAnimated, {
            toValue: -180,
            duration: 200,
            useNativeDriver: true,
        }).start(() => { });
        this.setTitle('松开立即刷新');
    };

    private onRefreshCallBack = () => {
        const { onRefresh } = this.props;
        onRefresh && onRefresh();
        this.setTitle('正在刷新...');
    };

    private onIdleRefreshCallBack = () => {
        Animated.timing(this.rotateAnimated, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => { });
        this.setTitle('下拉刷新');
    };

    private onChangeStateCallBack = (event: OnChangeStateEvent) => {
        const { state } = event.nativeEvent;
        switch (state) {
            case 0:
                this.onIdleRefreshCallBack();
                break;
            case 1:
                this.onPullingRefreshCallBack();
                break;
            case 2:
                this.onRefreshCallBack();
                break;
            default:
        }
    };

    autoRefresh = () => {
        !!this.smartRefreshRef && this.smartRefreshRef.autoRefresh();
    };

    render(): React.ReactNode {
        const {
            children,
            refreshing,
            firstRefresh,
            activityIndicatorProps,
            containerStyle: $containerStyleOverride,
        } = this.props;

        return (
            // @ts-ignore
            <SmartRefresh
                ref={(ref) => (this.smartRefreshRef = ref)}
                refreshing={refreshing}
                firstRefresh={firstRefresh}
                onChangeState={this.onChangeStateCallBack}
            >
                <SmartRefreshHeader style={[$container, $containerStyleOverride]}>
                    {/* <Animated.View style={[{ opacity: refreshing ? 1 : 0, }]}  > */}
                    <EduActivityIndicator {...activityIndicatorProps} />
                    {/* </Animated.View> */}
                </SmartRefreshHeader>
                {children}
            </SmartRefresh>
        );
    }
}

const $container: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
}
