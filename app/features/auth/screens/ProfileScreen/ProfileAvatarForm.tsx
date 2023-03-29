import { observer } from "mobx-react-lite"
import React, { useCallback, useEffect, useState } from "react"
import { EditSquare, IconSVG, IconButton } from "../../../../components"
import * as ImagePicker from 'react-native-image-picker';
import { UserAvatar } from "../../components/UserAvatar"
import { Avatar, AvatarProps, YStack, ZStack } from "tamagui"

/* toggle includeExtra */
const includeExtra = true;

interface ProfileAvatarFormProps { }

export const ProfileAvatarForm = observer(function ProfileAvatarForm(_props: ProfileAvatarFormProps) {
  const [uri, setUri] = useState(null)
  const [response, setResponse] = useState<any>(null);

  useEffect(() => {
    if (response?.assets?.length) {
      setUri(response?.assets[0].uri)
    }
  }, [response])

  const onButtonPress = useCallback((type, options) => {
    if (type === 'capture') {
      ImagePicker.launchCamera(options, setResponse);
    } else {
      ImagePicker.launchImageLibrary(options, setResponse);
    }
  }, []);

  return (
    <ZStack h="$30" w="$30" jc="flex-end" ai="flex-end">
      {uri ? <Avatar size="$30" ><Avatar.Image src={uri} /></Avatar> : <UserAvatar size="$30" />}
      <IconButton
        right={2}
        bottom={2}
        size="$8"
        position="absolute"
        onPress={() => onButtonPress("library", actions[0].options)}
        icon={<IconSVG color='$primary500' size="$7" as={<EditSquare set="bold" />} />}
      />
    </ZStack>
  )
})

{/* {response?.assets &&
response?.assets.map(({ uri }: { uri: string }) => (
  <Avatar {...avatarProps} source={{ uri: testUri }} />
))} */}

interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const actions: Action[] = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: `Select Image or Video\n(mixed)`,
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];
