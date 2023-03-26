import { observer } from "mobx-react-lite"
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { EditSquare, AssetsImage, IconSVG, IconButton } from "../../../../components"
import { useStores } from "../../../../models"
import * as ImagePicker from 'react-native-image-picker';
import { Avatar, YStack, ZStack } from "tamagui"
import { UserAvatar } from "../../components";

/* toggle includeExtra */
const includeExtra = true;

const testUri = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"

interface FillProfileAvatarFormProps { }

export const FillProfileAvatarForm = observer(function FillProfileAvatarForm(
  props: FillProfileAvatarFormProps) {
  const [uri, setUri] = useState(null)
  const [response, setResponse] = useState<any>(null);
  // const [uri, setUri] = useState(testUri)

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
    <ZStack h="$30" w="$30" alignSelf="center" jc="flex-end" ai="flex-end">
      {uri ? <Avatar size="$30" ><Avatar.Image src={uri} /></Avatar> : <UserAvatar size="$30" />}
      <IconButton
        right={2}
        bottom={2}
        position="absolute"
        onPress={() => onButtonPress("library", actions[0].options)}
        icon={<IconSVG color='$primary500' size="$7" as={<EditSquare set="bold" />} />}
      />
    </ZStack>
  )
})

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
