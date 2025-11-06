import {
  BottomSheetModalProvider as AppBottomSheetModalProvider,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Icon from 'react-native-remix-icon'
import { AppText } from '../../../atoms'
import { AppBottomSheet, AppListItem, AppSearchInput } from '../../../molecules'
import AppButton from '../../../molecules/AppButton'
import { AppBottomSheetProps } from '../../../types/molecules'

const meta: Meta<typeof AppBottomSheet> = {
  title: 'AppBottomSheet',
  component: AppBottomSheet,
  decorators: [
    Story => (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppBottomSheetModalProvider>
          <Story />
        </AppBottomSheetModalProvider>
      </GestureHandlerRootView>
    ),
  ],
  argTypes: {
    isDetached: {
      control: 'boolean',
      defaultValue: false,
    },
    showModal: {
      control: 'boolean',
      defaultValue: false,
    },
    backdropClose: {
      control: 'boolean',
      defaultValue: true,
    },
    index: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5],
      if: { arg: 'isDetached', truthy: false },
    },
    height: {
      control: 'number',
      if: { arg: 'index', exists: false },
    },
    title: {
      control: 'object',
    },
    isSwipeable: {
      control: 'boolean',
      if: { arg: 'isDetached', truthy: false },
    },
  },
}

export default meta

type Story = StoryObj<typeof AppBottomSheet>

// Styles for the new stories
const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  gap4: {
    gap: 4,
  },
  gap8: {
    gap: 8,
  },
  gap12: {
    gap: 12,
  },
  gap16: {
    gap: 16,
  },
  mt8: {
    marginTop: 8,
  },
  mt16: {
    marginTop: 16,
  },
  badge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  greenIndicator: {
    width: 8,
    height: 8,
    backgroundColor: '#22C55E',
    borderRadius: 4,
  },
  premiumCard: {
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  gradientBox: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
})

const BottomSheetWrapper = (props: AppBottomSheetProps<boolean>) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <GestureHandlerRootView className={'flex-1'}>
      <BottomSheetModalProvider>
        <View className={'flex-1 items-center justify-center'}>
          <AppButton
            size={4}
            text={'Open Bottom Sheet'}
            color={'neutral'}
            variant={'solid'}
            highContrast
            onPress={() => setShowModal(true)}
          />
          <AppBottomSheet {...props} showModal={showModal} setShowModal={setShowModal} />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export const Default: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: false,
    backdropClose: true,
    index: 2,
    title: {
      text: 'Default Bottom Sheet',
      align: 'center',
      titleProps: { color: 'error', className: '!text-light-accent' },
    },
    isSwipeable: true,
    children: (
      <AppText className={'text-light-type-gray-muted dark:text-dark-type-gray-muted'}>
        This is the content of the bottom sheet.
      </AppText>
    ),
    actionButton: {
      text: 'Close',
      action: () => {},
    },
  },
}

export const DetachedSheet: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: true,
    backdropClose: true,
    height: 300,
    title: 'Detached Bottom Sheet',
    titleProps: { size: 2, className: '!text-lg', highContrast: true, weight: 'bold' },
    content: 'This is a detached bottom sheet with fixed content.',
    icon: <Icon name={'search-line'} size="76" color="#000" />,
    actionButton: {
      text: 'Confirm',
      action: () => {},
      color: 'error',
      variant: 'soft',
      highContrast: false,
      iconStart: 'settings-line',
    },
    secondaryActionButton: {
      text: 'Cancel',
      action: () => {},
    },
  },
}

export const CustomHeightSheet: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: false,
    backdropClose: true,
    height: 400,
    title: { text: 'Custom Height Sheet', align: 'left' },
    isSwipeable: true,
    children: <AppText>This bottom sheet has a custom height of 400.</AppText>,
  },
}

export const NonSwipeableSheet: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: false,
    backdropClose: false,
    index: 3,
    title: { text: 'Non-Swipeable Sheet', align: 'center' },
    isSwipeable: false,
    children: <AppText>This bottom sheet cannot be swiped.</AppText>,
    actionButton: {
      text: 'Close',
      action: () => {},
    },
  },
}

export const SheetWithSubtitle: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: false,
    backdropClose: true,
    index: 1,
    title: {
      text: 'Sheet with Subtitle',
      align: 'left',
      subtitle: 'This is a subtitle for the bottom sheet',
    },
    isSwipeable: true,
    children: <AppText>Content with a title and subtitle.</AppText>,
  },
}

const ListWithSearchBottomSheet = () => {
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const items = [
    { id: '1', title: 'Item 1', subtitle: 'Description for item 1' },
    { id: '2', title: 'Item 2', subtitle: 'Description for item 2' },
    { id: '3', title: 'Item 3', subtitle: 'Description for item 3' },
    { id: '4', title: 'Item 4', subtitle: 'Description for item 4' },
    { id: '5', title: 'Item 5', subtitle: 'Description for item 5' },
    { id: '6', title: 'Item 6', subtitle: 'Description for item 6' },
    { id: '7', title: 'Item 7', subtitle: 'Description for item 7' },
    { id: '8', title: 'Item 8', subtitle: 'Description for item 8' },
    { id: '9', title: 'Item 9', subtitle: 'Description for item 9' },
    { id: '10', title: 'Item 10', subtitle: 'Description for item 10' },
  ]
  const filteredItems = items.filter(
    item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  return (
    <>
      <AppButton
        size={4}
        text={'Open Bottom Sheet'}
        color={'neutral'}
        variant={'solid'}
        highContrast
        onPress={() => setShowModal(true)}
      />
      <AppBottomSheet
        isDetached={false}
        showModal={showModal}
        setShowModal={setShowModal}
        backdropClose
        index={3}
        title={{ text: 'Searchable List', align: 'center' }}
        fixedHeader={
          <AppSearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search items..."
            onClear={() => setSearchQuery('')}
          />
        }>
        <View className="mt-lg pb-2xl flex-1">
          {filteredItems.map((item, index) => (
            <AppListItem
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              variant="2-line"
              leading="icon"
              trailing="icon"
              trailingIcon="arrow-right-s-line"
              separator={index !== filteredItems.length - 1}
            />
          ))}
        </View>
      </AppBottomSheet>
    </>
  )
}
export const WithListAndSearch: Story = {
  render: () => <ListWithSearchBottomSheet />,
}
export const Basic: Story = {
  args: {
    isDetached: false,
    showModal: true,
    backdropClose: true,
    index: 3,
    title: { text: 'Basic Bottom Sheet', align: 'center' },
    children: (
      <View className="p-lg">
        <AppListItem title="Basic List Item" />
      </View>
    ),
  },
}

// Stories showcasing ReactNode support for titles and subtitles

export const ReactNodeTitleDetached: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: true,
    backdropClose: true,
    height: 350,
    title: (
      <View style={styles.flexRow}>
        <Icon name="star-fill" size="24" color="#FFD700" />
        <AppText className="text-2xl-bold text-light-type-gray dark:text-dark-type-gray">
          Premium Feature
        </AppText>
        <Icon name="star-fill" size="24" color="#FFD700" />
      </View>
    ),
    content: (
      <View style={styles.itemsCenter}>
        <AppText className="text-center text-sm-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
          Unlock exclusive features with our premium plan
        </AppText>
        <View style={[styles.flexRow, styles.mt8]}>
          <Icon name="check-line" size="16" color="#22C55E" />
          <AppText className="text-xs-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
            Advanced analytics
          </AppText>
        </View>
        <View style={styles.flexRow}>
          <Icon name="check-line" size="16" color="#22C55E" />
          <AppText className="text-xs-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
            Priority support
          </AppText>
        </View>
      </View>
    ),
    icon: <Icon name="vip-crown-line" size="76" color="#FFD700" />,
    actionButton: {
      text: 'Upgrade Now',
      action: () => {},
      color: 'accent',
      variant: 'solid',
      highContrast: true,
      iconStart: 'arrow-up-line',
    },
    secondaryActionButton: {
      text: 'Maybe Later',
      action: () => {},
    },
  },
}

export const ReactNodeTitleRegular: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: false,
    backdropClose: true,
    index: 2,
    title: {
      text: (
        <View style={styles.flexRowBetween}>
          <View style={styles.flexRow}>
            <Icon name="notification-badge-line" size="20" color="#EF4444" />
            <AppText className="text-lg-bold text-light-type-gray dark:text-dark-type-gray">
              Notifications
            </AppText>
          </View>
          <View style={styles.badge}>
            <AppText className="text-xs-bold text-red-600">3 New</AppText>
          </View>
        </View>
      ),
      align: 'left',
      subtitle: (
        <View style={[styles.flexRow, styles.mt8]}>
          <Icon name="time-line" size="14" color="#6B7280" />
          <AppText className="text-sm-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
            Last updated 2 minutes ago
          </AppText>
        </View>
      ),
    },
    isSwipeable: true,
    children: (
      <View style={styles.gap16}>
        <AppListItem
          title="Payment Successful"
          subtitle="Your transaction has been completed"
          variant="2-line"
          leading="icon"
          leadingIcon="check-circle-line"
          trailing="icon"
          trailingIcon="arrow-right-s-line"
          separator
        />
        <AppListItem
          title="Security Alert"
          subtitle="New device login detected"
          variant="2-line"
          leading="icon"
          leadingIcon="shield-line"
          trailing="icon"
          trailingIcon="arrow-right-s-line"
          separator
        />
        <AppListItem
          title="System Update"
          subtitle="New features available"
          variant="2-line"
          leading="icon"
          leadingIcon="download-line"
          trailing="icon"
          trailingIcon="arrow-right-s-line"
        />
      </View>
    ),
    actionButton: {
      text: 'Mark All as Read',
      action: () => {},
      color: 'neutral',
      variant: 'soft',
    },
  },
}

export const CustomStyledTitleSubtitle: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: false,
    backdropClose: true,
    index: 2,
    title: {
      text: (
        <View style={styles.itemsCenter}>
          <View style={styles.gradientBox}>
            <AppText className="text-lg-bold text-white">Welcome Back!</AppText>
          </View>
        </View>
      ),
      align: 'center',
      subtitle: (
        <View style={[styles.itemsCenter, styles.mt16]}>
          <AppText className="text-center text-sm-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
            You have been missed. Here's what happened while you were away:
          </AppText>
          <View style={[styles.statsContainer, styles.mt16]}>
            <View style={styles.statItem}>
              <AppText className="text-xl-bold text-light-accent dark:text-dark-accent">12</AppText>
              <AppText className="text-xs-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
                Messages
              </AppText>
            </View>
            <View style={styles.statItem}>
              <AppText className="text-xl-bold text-light-accent dark:text-dark-accent">5</AppText>
              <AppText className="text-xs-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
                Updates
              </AppText>
            </View>
            <View style={styles.statItem}>
              <AppText className="text-xl-bold text-light-accent dark:text-dark-accent">2</AppText>
              <AppText className="text-xs-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
                Alerts
              </AppText>
            </View>
          </View>
        </View>
      ),
    },
    isSwipeable: true,
    children: (
      <View style={styles.gap16}>
        <AppText className="text-center text-sm-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
          Ready to get started? Let's catch up on everything you missed.
        </AppText>
      </View>
    ),
    actionButton: {
      text: 'Continue',
      action: () => {},
      color: 'accent',
      variant: 'solid',
      iconEnd: 'arrow-right-line',
    },
  },
}

export const MixedStringAndReactNode: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: false,
    backdropClose: true,
    index: 2,
    title: {
      text: 'Account Settings', // String title
      align: 'center',
      // ReactNode subtitle
      subtitle: (
        <View style={[styles.flexRowCenter, styles.mt8]}>
          <Icon name="user-line" size="16" color="#6B7280" />
          <AppText className="text-sm-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
            Manage your profile and preferences
          </AppText>
          <Icon name="settings-3-line" size="16" color="#6B7280" />
        </View>
      ),
    },
    isSwipeable: true,
    children: (
      <View style={styles.gap16}>
        <AppListItem
          title="Profile Information"
          subtitle="Update your personal details"
          variant="2-line"
          leading="icon"
          leadingIcon="profile-line"
          trailing="icon"
          trailingIcon="arrow-right-s-line"
          separator
        />
        <AppListItem
          title="Security Settings"
          subtitle="Password and two-factor authentication"
          variant="2-line"
          leading="icon"
          leadingIcon="shield-check-line"
          trailing="icon"
          trailingIcon="arrow-right-s-line"
          separator
        />
        <AppListItem
          title="Notification Preferences"
          subtitle="Choose what updates you receive"
          variant="2-line"
          leading="icon"
          leadingIcon="notification-3-line"
          trailing="icon"
          trailingIcon="arrow-right-s-line"
        />
      </View>
    ),
  },
}

export const DetachedWithComplexContent: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: true,
    backdropClose: true,
    height: 400,
    title: (
      <View style={styles.flexRow}>
        <View style={styles.greenIndicator} />
        <AppText className="text-2xl-bold text-light-type-gray dark:text-dark-type-gray">
          Connection Status
        </AppText>
      </View>
    ),
    content: (
      <View style={styles.gap16}>
        <View style={styles.premiumCard}>
          <View style={[styles.flexRow, styles.gap8]}>
            <Icon name="wifi-line" size="20" color="#22C55E" />
            <AppText className="text-sm-bold text-green-700 dark:text-green-300">
              Connected Successfully
            </AppText>
          </View>
          <AppText className="text-xs-body text-green-600 dark:text-green-400">
            Your device is connected to the secure network
          </AppText>
        </View>

        <View style={styles.gap8}>
          <View style={styles.flexRowBetween}>
            <AppText className="text-sm-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
              Signal Strength
            </AppText>
            <AppText className="text-sm-bold text-light-type-gray dark:text-dark-type-gray">
              Excellent
            </AppText>
          </View>
          <View style={styles.flexRowBetween}>
            <AppText className="text-sm-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
              Connection Speed
            </AppText>
            <AppText className="text-sm-bold text-light-type-gray dark:text-dark-type-gray">
              150 Mbps
            </AppText>
          </View>
          <View style={styles.flexRowBetween}>
            <AppText className="text-sm-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
              Network Type
            </AppText>
            <AppText className="text-sm-bold text-light-type-gray dark:text-dark-type-gray">
              5G
            </AppText>
          </View>
        </View>
      </View>
    ),
    icon: <Icon name="signal-wifi-line" size="76" color="#22C55E" />,
    actionButton: {
      text: 'Run Speed Test',
      action: () => {},
      color: 'accent',
      variant: 'solid',
      iconStart: 'speed-line',
    },
    secondaryActionButton: {
      text: 'Disconnect',
      action: () => {},
      color: 'error',
      variant: 'soft',
    },
  },
}

// Stories to test new dynamic resize and dismissal improvements

export const MaxHeightConstraintTest: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: false,
    backdropClose: true,
    index: 4, // 90% snap point
    title: {
      text: 'Max Height Test',
      align: 'center',
      subtitle: 'This sheet should never overlap with the top bar',
    },
    isSwipeable: true,
    children: (
      <View style={styles.gap16}>
        <AppText className="text-center text-sm-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
          Try resizing to the largest snap point. The sheet should never overlap with the status
          bar or safe area.
        </AppText>
        {Array.from({ length: 30 }).map((_, index) => (
          <AppListItem
            key={index}
            title={`List Item ${index + 1}`}
            subtitle="This is test content to create a very tall list"
            variant="2-line"
            leading="icon"
            leadingIcon="file-list-3-line"
            trailing="icon"
            trailingIcon="arrow-right-s-line"
            separator={index !== 29}
          />
        ))}
      </View>
    ),
  },
}

export const DetachedExceedsMaxHeight: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: true,
    backdropClose: true,
    height: 2000, // Intentionally set to a very large value
    title: 'Detached Max Height Test',
    content:
      'This detached sheet has height set to 2000px, but it should be constrained to not overlap with the top bar. Try dismissing by swiping down.',
    icon: <Icon name="ruler-line" size="76" color="#3B82F6" />,
    actionButton: {
      text: 'Test Dismiss',
      action: () => {},
      color: 'accent',
      variant: 'solid',
    },
  },
}

export const AndroidDismissalTest: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: true,
    backdropClose: true,
    height: 400,
    title: 'Android Dismissal Test',
    content:
      'Test the improved dismissal behavior on Android. Swipe down to dismiss - it should feel smooth and responsive, similar to iOS.',
    icon: <Icon name="android-line" size="76" color="#3DDC84" />,
    actionButton: {
      text: 'Keep Open',
      action: () => {},
      color: 'accent',
      variant: 'soft',
    },
    secondaryActionButton: {
      text: 'Dismiss',
      action: () => {},
      color: 'neutral',
      variant: 'soft',
    },
  },
}

export const DynamicContentResize: Story = {
  render: () => {
    const [showModal, setShowModal] = useState(false)
    const [itemCount, setItemCount] = useState(3)

    return (
      <GestureHandlerRootView className={'flex-1'}>
        <BottomSheetModalProvider>
          <View className={'flex-1 items-center justify-center gap-y-md'}>
            <AppButton
              size={4}
              text={'Open Bottom Sheet'}
              color={'neutral'}
              variant={'solid'}
              highContrast
              onPress={() => setShowModal(true)}
            />
            <AppBottomSheet
              isDetached={false}
              showModal={showModal}
              setShowModal={setShowModal}
              backdropClose
              index={2}
              title={{
                text: 'Dynamic Content Test',
                align: 'center',
                subtitle: 'Add/remove items to see dynamic resizing',
              }}
              isSwipeable={true}
              fixedHeader={
                <View style={[styles.flexRow, styles.gap8, { marginBottom: 16 }]}>
                  <AppButton
                    size={3}
                    text="Add Item"
                    color="accent"
                    variant="soft"
                    iconStart="add-line"
                    onPress={() => setItemCount(prev => Math.min(prev + 3, 20))}
                  />
                  <AppButton
                    size={3}
                    text="Remove Item"
                    color="error"
                    variant="soft"
                    iconStart="subtract-line"
                    onPress={() => setItemCount(prev => Math.max(prev - 3, 1))}
                  />
                </View>
              }>
              <View style={styles.gap16}>
                {Array.from({ length: itemCount }).map((_, index) => (
                  <AppListItem
                    key={index}
                    title={`Dynamic Item ${index + 1}`}
                    subtitle="Content adjusts automatically"
                    variant="2-line"
                    leading="icon"
                    leadingIcon="file-line"
                    separator={index !== itemCount - 1}
                  />
                ))}
              </View>
            </AppBottomSheet>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    )
  },
}

export const CustomHeightWithConstraint: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: false,
    backdropClose: true,
    height: 1500, // Very large custom height
    title: {
      text: 'Custom Height with Max Constraint',
      align: 'center',
      subtitle: 'Height set to 1500px but constrained by maxHeight',
    },
    isSwipeable: true,
    children: (
      <View style={styles.gap16}>
        <AppText className="text-center text-sm-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
          This sheet has a custom height of 1500px, but it should be constrained to not exceed the
          safe max height.
        </AppText>
        {Array.from({ length: 20 }).map((_, index) => (
          <AppListItem
            key={index}
            title={`Item ${index + 1}`}
            subtitle="Testing custom height constraint"
            variant="2-line"
            leading="icon"
            leadingIcon="list-check"
            separator={index !== 19}
          />
        ))}
      </View>
    ),
    actionButton: {
      text: 'Close',
      action: () => {},
    },
  },
}

// Stories to test backward compatibility

export const BackwardCompatibleBehavior: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: false,
    backdropClose: true,
    index: 5, // 95% snap point (old behavior)
    enableMaxHeightConstraint: false, // Disable new constraints
    title: {
      text: 'Backward Compatible Mode',
      align: 'center',
      subtitle: 'Old behavior with enableMaxHeightConstraint={false}',
    },
    isSwipeable: true,
    children: (
      <View style={styles.gap16}>
        <AppText className="text-center text-sm-body text-light-type-gray-muted dark:text-dark-type-gray-muted">
          This sheet uses the old behavior with enableMaxHeightConstraint set to false. It may
          overlap with the top bar at 95% snap point.
        </AppText>
        {Array.from({ length: 30 }).map((_, index) => (
          <AppListItem
            key={index}
            title={`List Item ${index + 1}`}
            subtitle="Old behavior - may overlap top bar"
            variant="2-line"
            leading="icon"
            leadingIcon="file-list-line"
            separator={index !== 29}
          />
        ))}
      </View>
    ),
  },
}

export const DetachedBackwardCompatible: Story = {
  render: args => <BottomSheetWrapper {...args} />,
  args: {
    isDetached: true,
    backdropClose: true,
    height: 2000, // Very large height
    enableMaxHeightConstraint: false, // Disable new constraints
    title: 'Detached - Old Behavior',
    content:
      'This detached sheet has enableMaxHeightConstraint={false}, so it uses the old behavior without pan-down-to-close on detached mode.',
    icon: <Icon name="history-line" size="76" color="#94A3B8" />,
    actionButton: {
      text: 'Old Behavior',
      action: () => {},
      color: 'neutral',
      variant: 'soft',
    },
  },
}

export const ComparisonNewVsOld: Story = {
  render: () => {
    const [showModal1, setShowModal1] = useState(false)
    const [showModal2, setShowModal2] = useState(false)

    return (
      <GestureHandlerRootView className={'flex-1'}>
        <BottomSheetModalProvider>
          <View className={'flex-1 items-center justify-center gap-y-md'}>
            <AppButton
              size={4}
              text={'Open New Behavior (Constrained)'}
              color={'accent'}
              variant={'solid'}
              highContrast
              onPress={() => setShowModal1(true)}
            />
            <AppButton
              size={4}
              text={'Open Old Behavior (Unconstrained)'}
              color={'neutral'}
              variant={'outline'}
              onPress={() => setShowModal2(true)}
            />

            {/* New behavior with constraints */}
            <AppBottomSheet
              isDetached={false}
              showModal={showModal1}
              setShowModal={setShowModal1}
              backdropClose
              index={4}
              enableMaxHeightConstraint={true}
              title={{
                text: 'New Behavior ✨',
                align: 'center',
                subtitle: 'Max height constraint enabled',
              }}
              isSwipeable={true}>
              <View style={styles.gap16}>
                <AppText className="text-center text-sm-body text-green-600 dark:text-green-400">
                  This sheet respects max height and won't overlap the top bar
                </AppText>
                {Array.from({ length: 20 }).map((_, index) => (
                  <AppListItem
                    key={index}
                    title={`Item ${index + 1}`}
                    subtitle="Constrained behavior"
                    variant="2-line"
                    leading="icon"
                    leadingIcon="shield-check-line"
                    separator={index !== 19}
                  />
                ))}
              </View>
            </AppBottomSheet>

            {/* Old behavior without constraints */}
            <AppBottomSheet
              isDetached={false}
              showModal={showModal2}
              setShowModal={setShowModal2}
              backdropClose
              index={5}
              enableMaxHeightConstraint={false}
              title={{
                text: 'Old Behavior 📜',
                align: 'center',
                subtitle: 'Legacy mode (no constraints)',
              }}
              isSwipeable={true}>
              <View style={styles.gap16}>
                <AppText className="text-center text-sm-body text-orange-600 dark:text-orange-400">
                  This sheet uses old behavior and may overlap the top bar at 95%
                </AppText>
                {Array.from({ length: 20 }).map((_, index) => (
                  <AppListItem
                    key={index}
                    title={`Item ${index + 1}`}
                    subtitle="Legacy behavior"
                    variant="2-line"
                    leading="icon"
                    leadingIcon="history-line"
                    separator={index !== 19}
                  />
                ))}
              </View>
            </AppBottomSheet>
          </View>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    )
  },
}
