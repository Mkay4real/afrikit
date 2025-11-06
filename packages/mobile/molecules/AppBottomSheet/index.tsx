import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'
import colors from 'afrikit-shared/dist/colors'
import { useColorScheme } from 'nativewind'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Dimensions, Platform, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AppBottomSheetProps } from '../../types/molecules'
import checkBottomSheetProps from './checkBottomSheetProps'
import RenderedSheet from './RenderedSheet'

const AppBottomSheet = <T extends boolean>(props: AppBottomSheetProps<T>) => {
  const checkedProps = checkBottomSheetProps(props)
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const screenHeight = Dimensions.get('window').height
  const insets = useSafeAreaInsets()
  const [contentHeight, setContentHeight] = useState(screenHeight)
  const buttonAnimation = useRef(new Animated.Value(0)).current
  const { colorScheme } = useColorScheme()

  const { isDetached, showModal, setShowModal, backdropClose, height } = checkedProps

  // Calculate max height to avoid overlap with top bar
  // Account for status bar and safe area insets
  const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0
  const maxSheetHeight = screenHeight - insets.top - statusBarHeight - 60 // 60px margin from top

  // variables
  const snapPoints = useMemo(() => {
    if (isDetached) {
      // Ensure detached height doesn't exceed max height
      const detachedHeight = height ?? 300
      return [Math.min(detachedHeight, maxSheetHeight)]
    }

    // For regular mode, calculate snap points respecting max height
    const calculateSnapPoint = (percentage: string): number => {
      const value = parseInt(percentage, 10)
      const calculatedHeight = (screenHeight * value) / 100
      return Math.min(calculatedHeight, maxSheetHeight)
    }

    const percentageSnapPoints = ['25%', '35%', '50%', '70%', '90%']
    const calculatedSnapPoints = percentageSnapPoints.map(calculateSnapPoint)

    if ('height' in checkedProps && height) {
      // If custom height is provided, ensure it respects max height
      const constrainedHeight = Math.min(height, maxSheetHeight)
      return [constrainedHeight, ...calculatedSnapPoints]
    }

    return calculatedSnapPoints
  }, [isDetached, checkedProps, height, maxSheetHeight, screenHeight])

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setShowModal(false)
        return
      }

      const currentSnapPoint = snapPoints[index]
      let newHeight: number

      if (typeof currentSnapPoint === 'string') {
        if (currentSnapPoint.endsWith('%')) {
          const percentage = parseInt(currentSnapPoint, 10)
          newHeight = (screenHeight * percentage) / 100
        } else if (isDetached) {
          // For detached mode, we'll let the content determine the height
          return
        } else {
          newHeight = parseInt(currentSnapPoint, 10)
        }
      } else {
        newHeight = currentSnapPoint
      }

      setContentHeight(newHeight)

      // Animate button
      const maxIndex = Math.max(snapPoints.length - 1, 1)
      Animated.spring(buttonAnimation, {
        toValue: index / maxIndex,
        useNativeDriver: true,
      }).start()
    },
    [setShowModal, buttonAnimation, snapPoints, screenHeight, isDetached],
  )

  const buttonTranslateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0], // Adjust these values to control the slide distance
  })

  // effects
  useEffect(() => {
    if (showModal) {
      bottomSheetRef.current?.present()
    } else {
      bottomSheetRef.current?.dismiss()
    }
  }, [showModal])

  // renders

  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        enableTouchThrough={false}
        pressBehavior={backdropClose ? 'close' : 'none'}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        style={[
          props.style,
          {
            // backgroundColor: colorScheme === 'dark' ? colors.dark.slateA8 : colors.light.slateA8,
            backgroundColor: 'rgba(0,0,0,0.6)',
          },
        ]}
      />
    ),
    [backdropClose, colorScheme],
  )

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={isDetached ? 0 : 'index' in checkedProps ? checkedProps.index : 0}
      snapPoints={!isDetached ? snapPoints : undefined}
      onChange={handleSheetChanges}
      enableOverDrag={!isDetached}
      enableContentPanningGesture={
        !isDetached && ('isSwipeable' in checkedProps ? checkedProps.isSwipeable : true)
      }
      enableHandlePanningGesture={
        !isDetached && ('isSwipeable' in checkedProps ? checkedProps.isSwipeable : true)
      }
      enablePanDownToClose={true} // Enable for both detached and regular modes
      backdropComponent={renderBackdrop}
      enableDynamicSizing={isDetached}
      maxDynamicContentSize={maxSheetHeight} // Constrain dynamic sizing
      android_keyboardInputMode="adjustResize"
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      // Improve Android dismissal behavior
      animationConfigs={{
        overshootClamping: true,
        stiffness: 250,
        damping: 30,
        mass: 0.5,
      }}
      // Better gesture handling for Android
      activeOffsetY={[-10, 10]}
      failOffsetX={[-10, 10]}
      backgroundStyle={[
        {
          backgroundColor:
            colorScheme === 'dark' ? colors.dark['page-bg2'] : colors.light['page-bg2'],
        },
        props.backgroundStyle,
      ]}
      handleIndicatorStyle={
        isDetached
          ? {
              display: 'none',
            }
          : undefined
      }
      style={
        isDetached
          ? {
              marginHorizontal: 16,
              borderRadius: 20,
              overflow: 'hidden',
            }
          : undefined
      }
      detached={isDetached}
      bottomInset={isDetached ? 50 : 0}
      animateOnMount={true}
      stackBehavior={'replace'}
      //
      onDismiss={() => setShowModal(false)}>
      {
        <RenderedSheet
          isDetached={isDetached}
          checkedProps={checkedProps}
          height={contentHeight}
          btnTranslateY={buttonTranslateY}
          maxHeight={maxSheetHeight}
        />
      }
    </BottomSheetModal>
  )
}

export default React.memo(AppBottomSheet)
